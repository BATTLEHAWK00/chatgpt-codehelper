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

export interface WriteCodePromptOptions {
  codeLanguage: string;
  requirements: string;
  codeContext: string;
}

export interface WriteTestPromptOptions {
  codeLanguage: string;
  testingFramework?: string;
  codeContext: string;
}
