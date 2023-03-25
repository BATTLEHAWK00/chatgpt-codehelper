import { PromptTemplate } from "../template";
import { CodePromptOptions } from "./interfaces";
import templateString from "./template/optimizeCode.njk";

const template = new PromptTemplate(templateString);
export const renderOptimizePrompt = (options: CodePromptOptions) => template.render(options);
