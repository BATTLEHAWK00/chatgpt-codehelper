import { PromptTemplate } from "../template";
import { CodePromptOptions } from "./interfaces";
import templateString from "./template/optimizeCodeInPerf.njk";

const template = new PromptTemplate(templateString);
export const renderOptimizePerformancePrompt = (options: CodePromptOptions) => template.render(options);
