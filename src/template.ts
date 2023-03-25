import * as nunjucks from "nunjucks";

nunjucks.configure({ autoescape: false });

export class PromptTemplate {
  private preCompiledString: string;

  constructor(private templateString: string) {
    this.preCompiledString = nunjucks.precompileString(templateString);
  }

  render(content: unknown) {
    return nunjucks.renderString(this.preCompiledString, content as object);
  }
}
