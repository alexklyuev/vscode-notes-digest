'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { FileScanner } from './lib/services/file-scanner/file-scanner';
import { NotesTreeProvider } from './lib/services/notes-tree/notes-tree-provider';
import { SourceFile } from './lib/entities/source-file.entity';
import { TextScanner } from './lib/services/text-scanner/text-scanner';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    const notesTreeProvider = new NotesTreeProvider();
    vscode.window.registerTreeDataProvider('notes-digest.view', notesTreeProvider);

    
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "notes-digest" is now active!');
    
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('ndi.scan', () => {
        // The code you place here will be executed every time your command is executed
        
        if (vscode.workspace.rootPath) {
            const projectRoot = vscode.workspace.rootPath;
            const fileScanner = new FileScanner(projectRoot);
            // Display a message box to the user
            fileScanner.findAll().then(files => {
                vscode.window.showInformationMessage('Scan complete!');
                // notesTreeProvider.setItems(files.map(file => new SourceFile(file, projectRoot)));
                Promise.all(
                    files
                    .map(file => new SourceFile(file, projectRoot))
                    .map(sourceFile => new TextScanner(sourceFile))
                    .map(scanner => scanner.notes)
                )
                .then(colls => {
                    const notes =colls.reduce((acc, coll) => acc.concat(coll), []);
                    notesTreeProvider.setItems(notes);
                });
                // vscode.window.createWebviewPanel();
                // vscode.window.createTreeView();
            });
        }

    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}