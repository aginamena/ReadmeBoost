import { togetherai } from "@/util/config";
import { generateText } from "ai";

export async function getOptimizedReadme( constructive_feedback : object[],
    summarizedFiles:string[]){
        console.log(constructive_feedback);
        console.log(summarizedFiles);
          const { text } = await generateText({
            model: togetherai("meta-llama/Llama-3.3-70B-Instruct-Turbo"),
            prompt :`You're creating a professional, recruiter-focused README for a project. You have two inputs:

            ${constructive_feedback}: an array of objects. Each one has a readmePhrase and corresponding feedback. Apply each piece of feedback directly to its related phrase.
            
            ${summarizedFiles}: an array summarizing the contents of the codebase. Use it to decide which sections to include and what content should go in them.
            
            Your job is to rewrite the README to be clearer, more polished, and relevant to the project. It should reflect your work like a personal portfolio — so avoid anything that sounds robotic or generic. Be straightforward, confident, and concise.
            
            Include only the sections that actually make sense for this repo. Here’s a common list to guide you: Project Title, Description ,Installation, Usage, Features ,Technologies Used, Screenshots or Demo ,API Documenta ,Testing, Contributing ,License ,Acknowledgements
            
            Your output should be a single Markdown-formatted string, cleanly structured with good use of lists, bolding, and headers to make it easy to skim.`
          });
          return text;
}