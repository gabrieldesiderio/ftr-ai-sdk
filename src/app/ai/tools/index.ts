import { ToolCall, ToolCallUnion, ToolResult, ToolResultUnion } from "ai";
import { githubProfile } from "./github-profile";
import { httpFetch } from "./http-fetch";

export type AiToolSet = ToolCallUnion<typeof tools>
export type AIToolResult = ToolResultUnion<typeof tools>

export const tools = {
  githubProfile,
  httpFetch,
}