import { commands, ExtensionContext } from "vscode";
import statusBar from "./statusBar";
import explainCode from "./commands/explainCode";
import config from "./config";
import optimizeCode from "./commands/optimizeCode";
import tellProblems from "./commands/tellProblems";

export function activate(context: ExtensionContext) {
  console.log("Activating chatgpt-helper...");

  // Init config
  config.init(context);

  // Init status bar
  statusBar.init();

  // Init commands
  context.subscriptions.push(explainCode, optimizeCode, tellProblems);
  console.log("Activated chatgpt-helper...");
}

export function deactivate() {}
