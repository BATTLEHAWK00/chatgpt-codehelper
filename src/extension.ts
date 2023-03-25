import { commands, ExtensionContext } from "vscode";
import statusBar from "./statusBar";

export function activate({ subscriptions }: ExtensionContext) {
  console.log("Activating chatgpt-helper...");

  // Init status bar
  statusBar.init();

  // Init commands
  subscriptions.push(
    commands.registerTextEditorCommand("chatgpt-codehelper.explainCode", () => {
      console.log("test");
    }),
    commands.registerTextEditorCommand("chatgpt-codehelper.optimizeCode", () => {
      console.log("test");
    }),
  );
  console.log("Activated chatgpt-helper...");
}

export function deactivate() {}
