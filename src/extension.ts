import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('l2d.showPreview', () => {
        if (!vscode.window.activeTextEditor) {
            vscode.window.showErrorMessage('l2d 탭을 연 상태에서 실행해주세요.');
            return;
        }
        const disposables: vscode.Disposable[] = [];
        const sideColumn = getSideColumn();
        const resource = vscode.window.activeTextEditor.document.uri;
        const title = `미리보기 ${ path.basename(resource.fsPath) }`;
        const panel = vscode.window.createWebviewPanel('l2d', title, sideColumn, {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: getLocalResourceRoots(resource, context),
        });
        render(resource);
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (!editor) return;
            update(editor.document.uri);
        }, null, disposables);
        vscode.workspace.onDidChangeTextDocument(e => update(e.document.uri), null, disposables);
        panel.onDidDispose(() => {
            for (const disposable of disposables) disposable.dispose();
            disposables.length = 0;
        }, null, disposables);
        async function update(uri: vscode.Uri) {
            if (uri.fsPath !== resource.fsPath) return;
            const document = await vscode.workspace.openTextDocument(resource);
            panel.webview.postMessage({
                content: document.getText(),
            });
        }
        async function render(uri: vscode.Uri) {
            if (uri.fsPath !== resource.fsPath) return;
            const scriptPathOnDisk = vscode.Uri.file(path.join(context.extensionPath, 'media', 'index.js'));
            const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' });
            const document = await vscode.workspace.openTextDocument(resource);
            const nonce = `${ new Date().getTime() }${ new Date().getMilliseconds() }`;
            panel.webview.html = `<!doctype html><html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${ nonce }';">
                    <title>${ title }</title>
                </head>
                <body>
                    <script nonce="${ nonce }">const initialContent = ${ JSON.stringify(document.getText()) };</script>
                    <script nonce="${ nonce }" src="${ scriptUri }"></script>
                </body>
            </html>`;
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

function getLocalResourceRoots(resource: vscode.Uri, context: vscode.ExtensionContext): vscode.Uri[] {
    const folder = vscode.workspace.getWorkspaceFolder(resource);
    return [
        ...(folder ? [folder.uri] : []),
        ...((!resource.scheme || resource.scheme === 'file') ? [vscode.Uri.file(path.dirname(resource.fsPath))] : []),
        vscode.Uri.file(path.join(context.extensionPath, 'media')),
    ];
}
