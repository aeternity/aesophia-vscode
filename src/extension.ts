import path from 'path';
import { ExtensionContext } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	Executable
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	const run: Executable = {
		command: path.join(__dirname, '../../aesophia-rust/target/release/aesophia-lsp'),
	};

	const serverOptions: ServerOptions = {
		run,
		debug: run,
	};

	const clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'sophia' }],
	};

	client = new LanguageClient(
		'aesophiaServer',
		'aeSophia Server',
		serverOptions,
		clientOptions
	);

	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	// TODO: This is not stopping the server
	return client.stop();
}
