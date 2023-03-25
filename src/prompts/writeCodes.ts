import { PromptTemplate } from "../template";
import templateString from "./template/writeCode.njk";

interface WriteCodePromptOptions {
  codeLanguage: string;
  requirements: string;
  codeContext: string;
}

const template = new PromptTemplate(templateString);
export const renderWriteCodePrompt = (options: WriteCodePromptOptions) => template.render(options);
