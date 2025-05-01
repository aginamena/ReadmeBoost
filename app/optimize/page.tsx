"use client";

// import { Button } from "@/components/ui/button";
import { Container, Button } from "@mui/material";
import MDEditor, { commands, ICommand } from "@uiw/react-md-editor";
// import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getOptimizedReadme } from "./util";
// import { getOpt } from "./util";

export default function Optimze() {
  // console.log(data);
  const [isLoading, setIsLoading] = useState(false);

  const pushChanges: ICommand = {
    name: "Push chanages",
    keyCommand: "Push to github",
    buttonProps: { "aria-label": "Push changes to github" },
    icon: (
      // should be green button not white
      <Button variant="contained" color="success">
        Push Changes
      </Button>
    ),
    execute: async (state: TextState, api: TextAreaTextApi) => {
      alert("This feature is not yet available. We're working on it!");
    },
  };
  const [value, setValue] = useState("");

  useEffect(() => {
    setIsLoading(true);
    async function optimizeReadme() {
      const constructive_feedback = JSON.parse(
        sessionStorage.getItem("constructive_feedback")
      );
      const summarizedFiles = JSON.parse(
        sessionStorage.getItem("summarizedFiles")
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
        onChange={setValue}
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
