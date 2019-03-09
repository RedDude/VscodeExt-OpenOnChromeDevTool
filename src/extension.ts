import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  let splitPath = vscode.workspace.rootPath || '';
  splitPath = splitPath.replace(/\\/g, '/');
  
	const openOnDevTools = (breakPoint = false) => {
		if (!vscode.window.activeTextEditor) {
			return;
		}

		const activeTextEditor = vscode.window.activeTextEditor;
		const line = activeTextEditor.selection.start.line;
		const [, filePath] = activeTextEditor.document.uri.path.split(splitPath);

		console.log(`${context.extensionPath}/gotodevtools.exe "${filePath}" ${String(line)} ${breakPoint}`);

		exec(`${context.extensionPath}/gotodevtools.exe "${filePath}" ${String(line)} ${breakPoint}`, (error: any, stdout: any, stderr: any) => {
			console.log(error);
			console.log(stdout);
			console.log(stderr);
		});
	};

	const disposableOpenOnDevTools = vscode.commands.registerCommand('extension.gotodevtools', openOnDevTools);
	const disposableOpenOnDevToolsBreakPoint = vscode.commands.registerCommand('extension.gotodevtoolsBreakpoint', () => openOnDevTools(true));

	context.subscriptions.push(disposableOpenOnDevTools);
	context.subscriptions.push(disposableOpenOnDevToolsBreakPoint);
}

export function deactivate() { }
