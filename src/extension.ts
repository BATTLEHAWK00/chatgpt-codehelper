import { commands, ExtensionContext, window } from "vscode";

export function activate({ subscriptions }: ExtensionContext) {
  console.log('Congratulations, your extension "chatgpt-codehelper" is now active!');

  subscriptions.push(
    commands.registerCommand("chatgpt-codehelper.helloWorld", () => {
      window.showInformationMessage("Hello World from chatgpt-codehelper!");
    }),
    commands.registerTextEditorCommand("chatgpt-codehelper.explainCode", () => {
      console.log("test");
    }),
    commands.registerTextEditorCommand("chatgpt-codehelper.optimizeCode", () => {
      console.log("test");
    }),
  );
}

export function deactivate() {}
