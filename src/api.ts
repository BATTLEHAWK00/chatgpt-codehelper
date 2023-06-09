import { PromptTemplate } from "./template";
import { ChatGPTAPI } from "chatgpt";
import fetch from "node-fetch";
import systemBasePrompt from "./prompts/systemBasePrompt.njk";
import "@dqbd/tiktoken/tiktoken_bg.wasm";
import { getConfig } from "./config";

const systemMessageTemplate = new PromptTemplate(systemBasePrompt);

const getSystemMessage = () =>
  systemMessageTemplate.render({
    currentDate: new Date().toString(),
    replyLanguage: getConfig().get("language"),
  });

const chatgptApi = new ChatGPTAPI({
  apiKey: getConfig().get("apiKey") ?? "",
  apiBaseUrl: getConfig().get("apiBaseUrl") || undefined,
  debug: true,
  fetch,
});

function sendMessage(prompt: string) {
  return chatgptApi.sendMessage(prompt, {
    systemMessage: getSystemMessage(),
    timeoutMs: getConfig().get("timeout"),
    completionParams: {
      temperature: 0.6,
    },
  });
}
export default {
  sendMessage,
};
