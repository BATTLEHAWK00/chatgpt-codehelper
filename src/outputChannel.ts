import { window } from "vscode";

const normalChannel = window.createOutputChannel("ChatGPT CodeHelper");
const transientChannel = window.createOutputChannel("ChatGPT CodeHelper(Single message)");

export const outputTransient = (message: string) => {
  transientChannel.replace(message);
  transientChannel.show();
};
export const output = (message: string) => {
  normalChannel.replace(message);
  normalChannel.show();
};

export default {
  normalChannel,
  transientChannel,
};
