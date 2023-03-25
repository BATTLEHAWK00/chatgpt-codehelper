import { getConfig } from "../config";
import api from "../api";
import { ProgressLocation, commands, window } from "vscode";
import { outputTransient } from "../outputChannel";
import { getSelectedLines } from "../utils/document";
import { renderTellProblemPrompt } from "../prompts/tellProblems";

export default commands.registerTextEditorCommand(
  "chatgpt-codehelper.tellProblems",
  async ({ document, selections }) => {
    window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: "Waiting for ChatGPT to response...",
        cancellable: false,
      },
      async () => {
        const prompt = renderTellProblemPrompt({
          code: {
            lines: getSelectedLines(selections, document),
            withLineNumber: getConfig().get("withLineNumber") ?? false,
          },
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