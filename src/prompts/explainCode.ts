import { CodePromptOptions } from "./interfaces";
import { PromptTemplate } from "../template";
import explainPromptTemplateString from "./template/explainCode.njk";

const explainPromptTemplate = new PromptTemplate(explainPromptTemplateString);
export const renderExplainPrompt = (options: CodePromptOptions) => explainPromptTemplate.render(options);
