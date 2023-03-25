import { PromptTemplate } from "./template";
import { commands, ExtensionContext, languages } from "vscode";
import statusBar from "./statusBar";
import api from "./api";
import explain from "./prompts/explainCode.njk";
import { renderExplainPrompt } from "./prompts/explainCode";
import explainCode from "./commands/explainCode";

export function activate({ subscriptions }: ExtensionContext) {
  console.log("Activating chatgpt-helper...");

  // Init status bar
  statusBar.init();

  // Init commands
  subscriptions.push(
    explainCode,
    commands.registerTextEditorCommand("chatgpt-codehelper.optimizeCode", () => {
      console.log("test");
    }),
  );
  console.log("Activated chatgpt-helper...");
}

export function deactivate() {}
