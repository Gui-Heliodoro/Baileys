import makeWASocket, { Browsers } from '@whiskeysockets/baileys';
import { LocalAuth } from 'whatsapp-web.js';

console.log('Iniciando a aplicação...');

const client = makeWASocket({
    browser: Browsers.ubuntu('My App'),
    auth: new LocalAuth(),
    printQRInTerminal: true // Esta linha adiciona a funcionalidade para gerar o QR code no terminal
});

const saveState = () => {
    console.log('Estado salvo.');
};

client.ev.on('creds.update', saveState);

client.ev.on('connection.update', (update: any) => {
    const { qr, connection, lastDisconnect } = update;
    if (qr) {
        console.log('QR code recebido, escaneie por favor!');
        // O QR code será automaticamente impresso no terminal
    } else if (connection === 'open') {
        console.log('Cliente está pronto!');
    } else if (connection === 'close' && lastDisconnect) {
        console.log('Cliente foi desconectado', lastDisconnect?.error);
    }
});

client.ev.on('messages.upsert', async (message: any) => {
    console.log('Mensagem recebida:', message);
    const msg = message.messages[0];
    if (msg.message?.conversation === '!ping') {
        await client.sendMessage(msg.key.remoteJid!, { text: 'pong' });
    } else {
        await client.sendMessage(msg.key.remoteJid!, { text: 'Olá! Recebi sua mensagem.' });
    }
});

console.log('Cliente WhatsApp inicializado.');
