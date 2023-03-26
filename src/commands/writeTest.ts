import { WriteTestPromptOptions } from "../promptInterfaces";
import api from "../api";
import { SnippetString, commands, l10n, window } from "vscode";
import { useLoading } from "../utils/loading";
import { PromptTemplate } from "../template";
import templateString from "../prompts/writeTest.njk";
import { getSelectedLines } from "../utils/document";

const template = new PromptTemplate<WriteTestPromptOptions>(templateString);

const separateText = "\n\n// AI generated\n";

export default commands.registerTextEditorCommand(
  "chatgpt-codehelper.writeTest",
  async ({ document, selections, insertSnippet }) => {
    const insertLine = document.lineAt(document.lineCount - 1).range;
    const codeContext = getSelectedLines(selections, document)
      .map(({ text }) => text)
      .join("\n");
    const testingFramework = await window.showInputBox({
      prompt: l10n.t("Please input testing framework AI would use"),
    });
    if (testingFramework === undefined) return;
    const prompt = template.render({ testingFramework, codeContext, codeLanguage: document.languageId });
    return useLoading(async () => {
      const result = await api.sendMessage(prompt);
      await insertSnippet(new SnippetString(separateText + result.text), insertLine);
    });
  },
);
