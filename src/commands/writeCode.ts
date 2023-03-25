import api from "../api";
import { ProgressLocation, SnippetString, commands, window } from "vscode";
import { renderWriteCodePrompt } from "../prompts/writeCodes";

export default commands.registerTextEditorCommand(
  "chatgpt-codehelper.writeCode",
  async ({ document, selection, insertSnippet }) => {
    const requirements = await window.showInputBox({
      prompt: "Please input your requirements",
    });
    if (!requirements) {
      window.showInformationMessage("Your requirements is empty.");
      return;
    }
    const contextStart = Math.max(selection.active.line - 50, 0);
    const contextEnd = Math.min(selection.active.line + 50, document.lineCount);
    const contextLines: string[] = [];
    for (let i = contextStart + 1; i < contextEnd; i++) contextLines.push(document.lineAt(i).text);
    const codeContext = contextLines.join("\n");
    await window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: "Waiting for ChatGPT to response...",
        cancellable: false,
      },
      async () => {
        const prompt = renderWriteCodePrompt({ requirements, codeContext, codeLanguage: document.languageId });
        try {
          const result = await api.sendMessage(prompt);
          insertSnippet(new SnippetString(result.text));
        } catch (error) {
          window.showErrorMessage(error instanceof Error ? error.message : "unknown error");
        }
      },
    );
  },
);
