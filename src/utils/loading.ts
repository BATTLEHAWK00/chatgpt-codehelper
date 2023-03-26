import { ProgressLocation, l10n, window } from "vscode";

export const useLoading = async (
  callback: () => Promise<void>,
  message: string = "Waiting for ChatGPT to response...",
) => {
  await window.withProgress(
    {
      location: ProgressLocation.Notification,
      title: l10n.t(message),
      cancellable: false,
    },
    () =>
      callback().catch(error =>
        window.showErrorMessage(error instanceof Error ? l10n.t(error.message) : l10n.t("unknown error")),
      ),
  );
};
