import { PromptTemplate } from "../template";
import explainPromptTemplateString from "./template/explainCode.njk";

interface ExplainPrompt {
  code: {
    withLineNumber: boolean;
    lines: {
      number: number;
      text: string;
    }[];
  };
  codeLanguage: string;
}

const explainPromptTemplate = new PromptTemplate(explainPromptTemplateString);
export const renderExplainPrompt = (options: ExplainPrompt) => explainPromptTemplate.render(options);
