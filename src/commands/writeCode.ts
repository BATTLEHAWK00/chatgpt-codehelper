import { WriteCodePromptOptions } from "../promptInterfaces";
import api from "../api";
import { SnippetString, commands, l10n, window } from "vscode";
import { useLoading } from "../utils/loading";
import { PromptTemplate } from "../template";
import templateString from "../prompts/writeCode.njk";

const template = new PromptTemplate<WriteCodePromptOptions>(templateString);

export default commands.registerTextEditorCommand(
  "chatgpt-codehelper.writeCode",
  async ({ document, selection, insertSnippet }) => {
    const requirements = await window.showInputBox({
      prompt: l10n.t("Please input your requirements"),
    });
    if (!requirements) {
      window.showInformationMessage(l10n.t("Your requirements is empty."));
      return;
    }
    const activeLine = selection.active;
    const contextStart = Math.max(selection.active.line - 50, 0);
    const contextEnd = Math.min(selection.active.line + 50, document.lineCount);
    const contextLines: string[] = [];
    for (let i = contextStart + 1; i < contextEnd; i++) contextLines.push(document.lineAt(i).text);
    const codeContext = contextLines.join("\n");
    const prompt = template.render({ requirements, codeContext, codeLanguage: document.languageId });

    return useLoading(async () => {
      const result = await api.sendMessage(prompt);
      await insertSnippet(new SnippetString(result.text), activeLine);
    });
  },
);
