import { togetherai } from "@/util/config";
import { generateText } from "ai";

export async function getOptimizedReadme( constructive_feedback : object[],
    summarizedFiles:string[]){
        console.log(constructive_feedback);
        console.log(summarizedFiles);
          const { text } = await generateText({
            model: togetherai(
              `${
                process.env.TOGETHER_AI_MODEL ||
                process.env.NEXT_PUBLIC_TOGETHER_AI_MODEL
              }`
            ),
            prompt : `Given the constructive_feedback array ${constructive_feedback} and the summary of all the files in ${summarizedFiles} as an array, create a professional, recruiter-focused README.

                        Each object in the constructive_feedback array includes a readmePhrase and corresponding feedback. Implement the feedback directly on the readmePhrase. Review the summarizedFiles to identify any additional sections that should be included to improve the README’s professionalism. Keep in mind that not every section may apply to every repository, so only include relevant sections.

                        Here are the common sections that a professional README may include:

                        Project Title: A clear, concise title that describes the project.

                        Description: A brief explanation of what the project does, its purpose, and its scope.

                        Installation Instructions: Steps to install and set up the project locally.

                        Usage: How to use the project after it's been set up.

                        Contributing: Guidelines for contributing to the project (if applicable).

                        License: Information on the project's licensing.

                        Technologies Used: A list of key technologies, libraries, or frameworks used in the project.

                        Features: A summary of the main features or functionalities of the project.

                        Screenshots or Demos: Optional, but useful for showing what the project looks like or how it works.

                        API Documentation: If your project includes an API, document the key endpoints and usage.

                        Testing: Information on how to run tests or any test setup instructions.

                        Acknowledgements: Credit to any third-party tools, libraries, or individuals who contributed.

                        Your output should be a Markdown string representing the optimized version of the README. You may use formatting options such as bold, italics, horizontal rules, code blocks, tables, unordered lists, ordered lists, or checked lists to enhance the readability and structure`

          });
          return text;
}