import { Tiktoken } from "js-tiktoken/lite";
import { app, togetherai } from "@/util/config";
import { Container, Typography } from "@mui/material";
import { generateText } from "ai";
import o200k_base from "js-tiktoken/ranks/o200k_base";
import { shouldIgnoreFileOrFolder } from "../util";
import Comparison from "./Comparison";

export default async function Feedback({
  params,
  searchParams,
}: {
  params: Promise<{ full_name: string[] }>;
  searchParams: Promise<{ installation_id: string }>;
}) {
  const { full_name } = await params;
  const { installation_id } = await searchParams;
  const tokenLimitPerFile = 1000;
  const owner = full_name[0];
  const repo = full_name[1];
  const octokit = await app.getInstallationOctokit(Number(installation_id));

  const summarizedFiles: string[] = [];
  let errorMessage = null;

  async function summarizeFile(code: string) {
    // we wait 1 second as the free model only talkes 1 request per second. once we move from the free plan to a paid
    // plain with a higher request per second, we'll remove this line
    // await timeout(1000);

    const { text } = await generateText({
      model: togetherai("meta-llama/Llama-3.3-70B-Instruct-Turbo"),
      // togetherai(" meta-llama/Llama-3-8b-chat-hf"),
      system:
        "You are very good at reading files and summarizing what it's doing",
      prompt: `summarize the file below in english language no more than 5 sentences. If you can describe what this file is doing
      in less than 5 sentences then that would be better.\n\n: ${code}`,
    });

    return text;
    // return "testing";
  }

  try {
    const repoInfo = await octokit.request(`GET /repos/{owner}/{repo}`, {
      owner,
      repo,
    });
    const branch = await octokit.request(
      `GET /repos/{owner}/{repo}/branches/{branch}`,
      {
        owner,
        repo,
        branch: repoInfo.data.default_branch,
      }
    );
    const treeStructure = await octokit.request(
      `GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1`,
      {
        owner,
        repo,
        tree_sha: branch.data.commit.sha,
      }
    );
    const filteredFilesAndFolders = treeStructure.data.tree.filter(
      (file: { path: string }) => !shouldIgnoreFileOrFolder(file.path)
    );

    for (const file of filteredFilesAndFolders) {
      const content = await octokit.request(
        `GET /repos/{owner}/{repo}/contents/{path}`,
        {
          owner,
          repo,
          path: file.path,
          headers: {
            Accept: "application/vnd.github.v3.raw",
          },
        }
      );
      // console.log(file.path);

      const enc = new Tiktoken(o200k_base);
      const tokens = enc.encode(content.data.toString());

      if (tokens.length > tokenLimitPerFile) {
        throw new Error(
          `❌ File "${file.path}" exceeds the limit of 4000 Characters. You have the reduce your file.`
        );
      }
      const summarizedFile = await summarizeFile(content.data.toString());
      summarizedFiles.push(summarizedFile);
    }
  } catch (error) {
    if (error instanceof Error) errorMessage = error.message;
  }

  // get the content of each file, make sure the size is <= 100MB
  return (
    <Container className="p-12">
      {errorMessage ? (
        <Typography>{errorMessage}</Typography>
      ) : (
        <Comparison
          summarizedFiles={summarizedFiles}
          installation_id={installation_id}
          owner={owner}
          repo={repo}
        />
      )}
    </Container>
  );
}
