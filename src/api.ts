import { PromptTemplate } from "./template";
import { ChatGPTAPI } from "chatgpt";
import { window, workspace } from "vscode";

const apiKey = workspace.getConfiguration("chatgptCodeHelper").get<string>("apiKey");

if (!apiKey) {
  window.showErrorMessage("You haven't configure the apiKey in plugin settings yet. Please set your api key.");
  throw new Error();
}

const chatgptApi = new ChatGPTAPI({
  apiKey,
  debug: true,
});

async function sendMessage(template: PromptTemplate, content: unknown) {
  const text = template.render(content);
  chatgptApi.sendMessage(text);
}

export default {
  sendMessage,
};
