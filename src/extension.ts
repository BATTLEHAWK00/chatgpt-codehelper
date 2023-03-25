import { commands, ExtensionContext } from "vscode";
import statusBar from "./statusBar";
import explainCode from "./commands/explainCode";
import config from "./config";

export function activate(context: ExtensionContext) {
  console.log("Activating chatgpt-helper...");

  // Init config
  config.init(context);

  // Init status bar
  statusBar.init();

  // Init commands
  context.subscriptions.push(
    explainCode,
    commands.registerTextEditorCommand("chatgpt-codehelper.optimizeCode", () => {
      console.log("test");
    }),
  );
  console.log("Activated chatgpt-helper...");
}

export function deactivate() {}
