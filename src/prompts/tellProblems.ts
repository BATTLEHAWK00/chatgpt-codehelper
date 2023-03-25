import { PromptTemplate } from "../template";
import { CodePromptOptions } from "./interfaces";
import templateString from "./template/tellProblems.njk";

const template = new PromptTemplate(templateString);
export const renderTellProblemPrompt = (options: CodePromptOptions) => template.render(options);
