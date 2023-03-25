import { Selection, TextDocument } from "vscode";

export const getSelectedLines = (selections: readonly Selection[], document: TextDocument) => {
  return selections.flatMap(selection => {
    const result: { number: number; text: string }[] = [];
    for (let i = selection.start.line; i <= selection.end.line; i++) {
      const text = document.lineAt(i).text;
      if (text.trim().length) result.push({ number: i + 1, text });
    }
    return result;
  });
};
