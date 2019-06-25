"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const child_process_1 = require("child_process");
function activate(context) {
    let splitPath = vscode.workspace.rootPath || '';
    splitPath = splitPath.replace(/\\/g, '/');
    const openOnDevTools = (breakPoint = false) => {
        if (!vscode.window.activeTextEditor) {
            return;
        }
        const activeTextEditor = vscode.window.activeTextEditor;
        const line = activeTextEditor.selection.start.line + 1;
        let filePath = '';
        const folders = vscode.workspace.workspaceFolders || [({ name: 'src' })];
        folders.forEach((folder) => {
            if (filePath) {
                return;
            }
            const [, file] = activeTextEditor.document.uri.path.split(folder.name);
            if (file) {
                filePath = file;
            }
        });
        console.log(`${context.extensionPath}/gotodevtools.exe "${filePath}" ${String(line)} ${breakPoint}`);
        child_process_1.exec(`${context.extensionPath}/gotodevtools.exe "${filePath}" ${String(line)} ${breakPoint}`, (error, stdout, stderr) => {
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
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map