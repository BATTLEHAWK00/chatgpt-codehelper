import { renderOptimizePerformancePrompt } from "./../prompts/optimizeCodePerformance";
import { getConfig } from "../config";
import api from "../api";
import { ProgressLocation, commands, window } from "vscode";
import { outputTransient } from "../outputChannel";
import { getSelectedLines } from "../utils/document";

export default commands.registerTextEditorCommand(
  "chatgpt-codehelper.optimizeCodePerformance",
  async ({ document, selections }) => {
    window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: "Waiting for ChatGPT to response...",
        cancellable: false,
      },
      async () => {
        const prompt = renderOptimizePerformancePrompt({
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
