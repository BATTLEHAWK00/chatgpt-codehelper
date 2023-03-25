import { PromptTemplate } from "./template";
import { ChatGPTAPI } from "chatgpt";
import fetch from "node-fetch";
import { workspace } from "vscode";
import systemBasePrompt from "./prompts/template/systemBasePrompt.njk";
import "@dqbd/tiktoken/tiktoken_bg.wasm";

const apiKey =
  workspace.getConfiguration("chatgptCodeHelper").get<string>("apiKey") ||
  "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";

if (!apiKey) throw new Error("You haven't configure the apiKey in plugin settings yet. Please set your api key.");

const systemMessageTemplate = new PromptTemplate(systemBasePrompt);

const getSystemMessage = () =>
  systemMessageTemplate.render({
    currentDate: new Date().toString(),
    replyLanguage: "Chinese",
  });

const chatgptApi = new ChatGPTAPI({
  apiKey,
  debug: true,
  fetch,
});

function sendMessage(prompt: string) {
  return chatgptApi.sendMessage(prompt, { systemMessage: getSystemMessage() });
}

export default {
  sendMessage,
};
