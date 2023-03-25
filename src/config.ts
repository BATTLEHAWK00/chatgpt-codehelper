import { workspace, ExtensionContext } from "vscode";

const _getConfig = () => workspace.getConfiguration("chatgptCodeHelper");

let config = _getConfig();

export const getConfig = () => config;

export default {
  init: ({ subscriptions }: ExtensionContext) => {
    subscriptions.push(
      workspace.onDidChangeConfiguration(({ affectsConfiguration }) => {
        if (affectsConfiguration("chatgptCodeHelper")) config = _getConfig();
      }),
    );
  },
};
