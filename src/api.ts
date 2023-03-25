import { PromptTemplate } from "./template";
import { ChatGPTAPI } from "chatgpt";
import fetch from "node-fetch";
import systemBasePrompt from "./prompts/template/systemBasePrompt.njk";
import "@dqbd/tiktoken/tiktoken_bg.wasm";
import { getConfig } from "./config";

const apiKey: string = getConfig().get("apiKey") || "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";

if (!apiKey) throw new Error("You haven't configure the apiKey in plugin settings yet. Please set your api key.");

const systemMessageTemplate = new PromptTemplate(systemBasePrompt);

const getSystemMessage = () =>
  systemMessageTemplate.render({
    currentDate: new Date().toString(),
    replyLanguage: getConfig().get("language"),
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
