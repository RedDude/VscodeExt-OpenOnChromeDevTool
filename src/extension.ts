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
		const line = activeTextEditor.selection.start.line + 1;
		let filePath: string = '';
		const folders = vscode.workspace.workspaceFolders || [({name : 'src'}) as vscode.WorkspaceFolder];

		folders.forEach((folder: vscode.WorkspaceFolder) => {
			if (filePath){
				return;
			}
			const [, file] = activeTextEditor.document.uri.path.split(folder.name);
			if(file) {
				filePath = file;
			}
		});

		console.log(`${context.extensionPath}/gotodevtools.exe "${filePath}" ${String(line)} ${breakPoint}`);
		// filePath = filePath.replace(new RegExp('/', 'g'), '${separator}');
		// console.log(`${context.extensionPath}/gotodevtools.exe "${filePath}" ${String(line)} ${breakPoint}`);
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
