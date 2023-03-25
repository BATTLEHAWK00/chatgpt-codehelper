import * as nunjucks from "nunjucks";

nunjucks.configure({ autoescape: false });

export class PromptTemplate {
  constructor(private templateString: string) {}

  render(content: unknown) {
    return nunjucks.renderString(this.templateString, content as object);
  }
}
