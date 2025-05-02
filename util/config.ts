import { App } from "@octokit/app";
import { createTogetherAI } from "@ai-sdk/togetherai";

const server_github_app_id = process.env.GITHUB_APP_ID
const public_github_app_id = process.env.NEXT_PUBLIC_GITHUB_APP_ID
const server_github_private_id = process.env.GITHUB_PRIVATE_KEY
const public_github_private_id = process.env.NEXT_PUBLIC_GITHUB_PRIVATE_KEY 
const server_together_id = process.env.TOGETHER_AI_API_KEY 
const public_together_id = process.env.NEXT_PUBLIC_TOGETHER_AI_API_KEY

export const app = new App({
    appId: server_github_app_id || public_github_app_id || "",
    privateKey: server_github_private_id || public_github_private_id|| ""
});

export const togetherai = createTogetherAI({
    apiKey: server_together_id || public_together_id 
  });