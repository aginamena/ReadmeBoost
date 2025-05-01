import { App } from "@octokit/app";
import { createTogetherAI } from "@ai-sdk/togetherai";

export const app = new App({
    appId: process.env.GITHUB_APP_ID || process.env.NEXT_PUBLIC_GITHUB_APP_ID || "",
    privateKey: process.env.GITHUB_PRIVATE_KEY || process.env.NEXT_PUBLIC_GITHUB_PRIVATE_KEY || ""
});

export const togetherai = createTogetherAI({
    apiKey: process.env.TOGETHER_AI_API_KEY || process.env.NEXT_PUBLIC_TOGETHER_AI_API_KEY
  });