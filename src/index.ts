import makeWASocket, { Browsers } from './Socket';
import { LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

console.log('Iniciando a aplicação...');

const sock = makeWASocket({
    browser: Browsers.ubuntu('My App'),
    auth: new LocalAuth(),
    printQRInTerminal: true // Esta linha adiciona a funcionalidade para gerar o QR code no terminal
});

// Função para salvar o estado do cliente
const saveState = () => {
    console.log('Estado salvo.');
};

sock.ev.on('creds.update', saveState);

sock.ev.on('connection.update', (update: any) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'open') {
        console.log('Cliente está pronto!');
    } else if (connection === 'close' && lastDisconnect) {
        console.log('Cliente foi desconectado', lastDisconnect?.error);
    }
});

sock.ev.on('messages.upsert', async (message: any) => {
    console.log('Mensagem recebida:', message);
    const msg = message.messages[0];
    if (msg.message?.conversation === '!ping') {
        await sock.sendMessage(msg.key.remoteJid!, { text: 'pong' });
    } else {
        await sock.sendMessage(msg.key.remoteJid!, { text: 'Olá! Recebi sua mensagem.' });
    }
});

console.log('Cliente WhatsApp inicializado.');

export * from '../WAProto';
export * from './Utils';
export * from './Types';
export * from './Store';
export * from './Defaults';
export * from './WABinary';
export * from './WAM';
export * from './WAUSync';

export type WASocket = ReturnType<typeof makeWASocket>;
export { makeWASocket };
export default makeWASocket;
