import { getConfig } from "../config";
import api from "../api";
import { renderExplainPrompt } from "../prompts/explainCode";
import { ProgressLocation, commands, l10n, window } from "vscode";
import { outputTransient } from "../outputChannel";
import { getSelectedLines } from "../utils/document";
import { useLoading } from "../utils/loading";

export default commands.registerTextEditorCommand("chatgpt-codehelper.explainCode", ({ document, selections }) => {
  const prompt = renderExplainPrompt({
    code: {
      lines: getSelectedLines(selections, document),
      withLineNumber: getConfig().get("withLineNumber") ?? false,
    },
    codeLanguage: document.languageId,
  });
  return useLoading(async () => {
    const result = await api.sendMessage(prompt);
    outputTransient(result.text);
  });
});
