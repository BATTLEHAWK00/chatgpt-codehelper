export interface CodePromptOptions {
  code: {
    withLineNumber: boolean;
    lines: {
      number: number;
      text: string;
    }[];
  };
  codeLanguage: string;
}
