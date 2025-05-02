"use client";

import { Container, Box } from "@mui/material";
import MDEditor, { commands, ICommand } from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { getOptimizedReadme } from "./util";

export default function Optimze() {
  // console.log(data);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pushChanges: ICommand = {
    name: "Push chanages",
    keyCommand: "Push to github",
    buttonProps: { "aria-label": "Push changes to github" },
    icon: (
      // should be green button not white
      <Box style={{ border: "2px solid green", padding: "5px" }}>
        Push Changes
      </Box>
    ),
    execute: () => {
      alert("This feature is not yet available. We're working on it!");
    },
  };
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    async function optimizeReadme() {
      const constructive_feedback: object[] = JSON.parse(
        sessionStorage.getItem("constructive_feedback") || "" // Default to empty string if null
      );
      const summarizedFiles: string[] = JSON.parse(
        sessionStorage.getItem("summarizedFiles") || "" // Default to empty string if null
      );

      const optimizedReadme = await getOptimizedReadme(
        constructive_feedback,
        summarizedFiles
      );
      setValue(optimizedReadme);
      setIsLoading(false);
      //   console.log(text);
    }
    optimizeReadme();
  }, []);

  return (
    <Container>
      <MDEditor
        value={isLoading ? "Loading..." : value}
        onChange={(value?: string) => setValue(value || "")}
        commands={[...commands.getCommands(), commands.divider, pushChanges]}
        fullscreen
        textareaProps={{
          placeholder: "Describe the repository here...",
        }}
      />
      <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
    </Container>
  );
}
