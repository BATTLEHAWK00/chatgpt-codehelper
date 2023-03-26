import * as nunjucks from "nunjucks";

nunjucks.configure({ autoescape: false });

export class PromptTemplate<T> {
  constructor(private templateString: string) {}

  render(content: T) {
    return nunjucks.renderString(this.templateString, content as object);
  }
}
