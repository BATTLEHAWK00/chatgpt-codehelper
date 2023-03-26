import { getConfig } from "../config";
import api from "../api";
import { ProgressLocation, commands, l10n, window } from "vscode";
import { outputTransient } from "../outputChannel";
import { getSelectedLines } from "../utils/document";
import { renderTellProblemPrompt } from "../prompts/tellProblems";
import { useLoading } from "../utils/loading";

export default commands.registerTextEditorCommand("chatgpt-codehelper.tellProblems", ({ document, selections }) => {
  const prompt = renderTellProblemPrompt({
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
});
