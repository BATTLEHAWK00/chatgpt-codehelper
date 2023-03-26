import { renderOptimizePerformancePrompt } from "./../prompts/optimizeCodePerformance";
import { getConfig } from "../config";
import api from "../api";
import { ProgressLocation, commands, l10n, window } from "vscode";
import { outputTransient } from "../outputChannel";
import { getSelectedLines } from "../utils/document";
import { useLoading } from "../utils/loading";

export default commands.registerTextEditorCommand(
  "chatgpt-codehelper.optimizeCodePerformance",
  ({ document, selections }) => {
    const prompt = renderOptimizePerformancePrompt({
      code: {
        lines: getSelectedLines(selections, document),
        withLineNumber: getConfig().get("withLineNumber") ?? false,
      },
      codeLanguage: document.languageId,
    });
    return useLoading(async () => {
      try {
        const result = await api.sendMessage(prompt);
        outputTransient(result.text);
      } catch (error) {
        window.showErrorMessage(error instanceof Error ? l10n.t(error.message) : l10n.t("unknown error"));
      }
    });
  },
);
