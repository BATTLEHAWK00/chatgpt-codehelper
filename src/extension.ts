import { commands, ExtensionContext, l10n } from "vscode";
import statusBar from "./statusBar";
import explainCode from "./commands/explainCode";
import config from "./config";
import optimizeCode from "./commands/optimizeCode";
import tellProblems from "./commands/tellProblems";
import optimizeCodeInPerf from "./commands/optimizeCodeInPerf";
import writeCode from "./commands/writeCode";
import writeTest from "./commands/writeTest";

export function activate(context: ExtensionContext) {
  // Init config
  config.init(context);

  // Init status bar
  statusBar.init();

  // Init commands
  context.subscriptions.push(explainCode, optimizeCode, tellProblems, optimizeCodeInPerf, writeCode, writeTest);
}

export function deactivate() {
  statusBar.dispose();
}
