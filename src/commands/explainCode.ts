import api from "../api";
import { renderExplainPrompt } from "../prompts/explainCode";
import { commands, workspace } from "vscode";

const config = workspace.getConfiguration("chatgptCodeHelper");

export default commands.registerTextEditorCommand(
  "chatgpt-codehelper.explainCode",
  async ({ document, selections }) => {
    const lines = selections.flatMap(selection => {
      const result: { number: number; text: string }[] = [];
      for (let i = selection.start.line; i <= selection.end.line; i++) {
        const text = document.lineAt(i).text;
        if (text.trim().length) result.push({ number: i, text });
      }
      return result;
    });
    const prompt = renderExplainPrompt({
      code: { lines, withLineNumber: config.get("withLineNumber") ?? false },
      codeLanguage: document.languageId,
    });
    console.log(prompt);
    api.sendMessage(prompt);
  },
);
