import { app, togetherai } from "@/util/config";
import { generateObject } from "ai";
import { string, z } from "zod";
import TableCmp from "./TableCmp";

export default async function Comparison({
  summarizedFiles,
  installation_id,
  owner,
  repo,
}: {
  summarizedFiles: string[];
  installation_id: string;
  owner: string;
  repo: string;
}) {
  let errorMessage = null;
  let readme = "";

  const octokit = await app.getInstallationOctokit(Number(installation_id));
  let constructive_feedback: { readme_phrase: string; feedback: string }[] = [];

  try {
    const content = await octokit.request(`GET /repos/{owner}/{repo}/readme`, {
      owner,
      repo,
      headers: {
        Accept: "application/vnd.github.v3.raw",
      },
    });
    readme = content.data.toString();
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      console.error("An unknown error occurred");
    }
  }
  //   console.log(`${process.env.TOGETHER_AI_MODEL}`);
  try {
    const { object } = await generateObject({
      model: togetherai(`${process.env.TOGETHER_AI_MODEL}`),
      //   togetherai("meta-llama/Llama-3-8b-chat-hf"),
      system: `You are an expert in providing concise and actionable feedback for README files. Your task is to analyze each section of the user's README and provide clear, brief suggestions that make the README more professional, clear, and appealing to recruiters.
        Your output should be an array of objects, each containing:
        - readme_phrase: The specific section of the README that requires feedback (keep it short).
        - feedback: The concise suggestion for improving the section (make it brief).
        For sections that are already well-written, respond with "No improvements needed." Keep the text as short and actionable as possible.`,
      schema: z.object({
        constructive_feedback: z.array(
          z.object({
            readme_phrase: z
              .string()
              .describe("The readme phrase that can be improved"),
            feedback: z
              .string()
              .describe("The feedback to improve the readme phrase"),
          })
        ),
        optimizedReadme: string().describe(
          "An optimized version of the readme"
        ),
      }),
      prompt: `Given the user's README file ${readme} and a summary of their most important files ${summarizedFiles}, provide concise feedback for each section of the README. For each section, include:
        1. readme_phrase: The section of the README to be improved (keep it short).
        2. feedback: The brief suggestion for improvement (keep it as concise as possible).
        If a section is already well-optimized, simply state "No improvements needed." 
        Output the result as an array of objects with the structure {constructive_feedback:[{readme_phrase: string, feedback: string}]}.
        Also, the readme_phrase should only be gotten from the readme file only, not from the words written elsewhere. 
        Don't include any markdown symbol in your constructive feedback.`,
    });
    constructive_feedback = object.constructive_feedback;
  } catch (error: unknown) {
    if (error instanceof Error) errorMessage = error.message;
  }
  console.log(errorMessage);
  return (
    <TableCmp
      noReadmeFound={errorMessage ? true : readme.length <= 1}
      constructive_feedback={constructive_feedback}
      summarizedFiles={summarizedFiles}
    />
  );
}
