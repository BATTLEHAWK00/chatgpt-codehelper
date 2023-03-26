import { ProgressLocation, l10n, window } from "vscode";

export const useLoading = async (callback: () => Promise<void>) => {
  window.withProgress(
    {
      location: ProgressLocation.Notification,
      title: l10n.t("Waiting for ChatGPT to response..."),
      cancellable: false,
    },
    callback,
  );
};
