import { getConfig } from "../config";
import api from "../api";
import { commands } from "vscode";
import { outputTransient } from "../outputChannel";
import { getSelectedLines } from "../utils/document";
import { useLoading } from "../utils/loading";
import { PromptTemplate } from "../template";
import { CodePromptOptions } from "../promptInterfaces";
import templateString from "../prompts/tellProblems.njk";

const template = new PromptTemplate<CodePromptOptions>(templateString);

export default commands.registerTextEditorCommand("chatgpt-codehelper.tellProblems", ({ document, selections }) => {
  const prompt = template.render({
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
