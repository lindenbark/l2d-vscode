import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('l2d.showPreview', () => {
        if (!vscode.window.activeTextEditor) {
            vscode.window.showInformationMessage('l2d 탭을 연 상태에서 실행해주세요.');
            return;
        }
        const disposables: vscode.Disposable[] = [];
        const sideColumn = getSideColumn();
        const resource = vscode.window.activeTextEditor.document.uri;
        const panel = vscode.window.createWebviewPanel('l2d', `미리보기 ${ path.basename(resource.fsPath) }`, sideColumn, {
            enableScripts: true,
            localResourceRoots: getLocalResourceRoots(resource),
        });
        render(resource);
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (!editor) return;
            render(editor.document.uri);
        }, null, disposables);
        vscode.workspace.onDidChangeTextDocument(e => render(e.document.uri), null, disposables);
        panel.onDidDispose(() => {
            for (const disposable of disposables) disposable.dispose();
            disposables.length = 0;
        }, null, disposables);
        async function render(uri: vscode.Uri) {
            if (uri.fsPath !== resource.fsPath) return;
            const document = await vscode.workspace.openTextDocument(resource);
            panel.webview.html = `<body>${ document.getText() }</body>`;
        }
    }));
}

function getSideColumn() {
    const active = vscode.window.activeTextEditor;
    switch (active && active.viewColumn) {
        default: return vscode.ViewColumn.One;
        case vscode.ViewColumn.One: return vscode.ViewColumn.Two;
        case vscode.ViewColumn.Two: return vscode.ViewColumn.Three;
    }
}

function getLocalResourceRoots(resource: vscode.Uri): vscode.Uri[] {
    const folder = vscode.workspace.getWorkspaceFolder(resource);
    return [
        ...(folder ? [folder.uri] : []),
        ...((!resource.scheme || resource.scheme === 'file') ? [vscode.Uri.file(path.dirname(resource.fsPath))] : []),
    ];
}
