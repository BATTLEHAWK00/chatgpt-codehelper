import { getConfig } from "../config";
import api from "../api";
import { renderExplainPrompt } from "../prompts/explainCode";
import { ProgressLocation, commands, window } from "vscode";
import outputChannel, { outputTransient } from "../outputChannel";

export default commands.registerTextEditorCommand(
  "chatgpt-codehelper.explainCode",
  async ({ document, selections }) => {
    window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: "Waiting for ChatGPT to response...",
        cancellable: false,
      },
      async () => {
        const lines = selections.flatMap(selection => {
          const result: { number: number; text: string }[] = [];
          for (let i = selection.start.line; i <= selection.end.line; i++) {
            const text = document.lineAt(i).text;
            if (text.trim().length) result.push({ number: i, text });
          }
          return result;
        });
        const prompt = renderExplainPrompt({
          code: { lines, withLineNumber: getConfig().get("withLineNumber") ?? false },
          codeLanguage: document.languageId,
        });
        try {
          const result = await api.sendMessage(prompt);
          outputTransient(result.text);
        } catch (error) {
          window.showErrorMessage(error instanceof Error ? error.message : "unknown error");
        }
      },
    );
  },
);
