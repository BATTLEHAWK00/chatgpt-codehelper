import { StatusBarAlignment, StatusBarItem, window } from "vscode";

let statusBar: StatusBarItem;

function init() {
  statusBar = window.createStatusBarItem(StatusBarAlignment.Right);
  statusBar.text = "CodeHelper";
  statusBar.show();
}

export async function showLoading(callback: () => void | Promise<void>) {
  statusBar.text = "CodeHelper: waiting...";
  await callback();
  statusBar.text = "CodeHelper";
}

export default {
  init,
};
