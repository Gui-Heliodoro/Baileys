import makeWASocket, { Browsers } from '@whiskeysockets/baileys';

console.log('Iniciando a aplicação...');

const sock = makeWASocket({
    browser: Browsers.ubuntu('My App'),
    printQRInTerminal: true // Esta linha adiciona a funcionalidade para gerar o QR code no terminal
});

// Adicione eventos adicionais conforme necessário
sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'open') {
        console.log('Cliente está pronto!');
    } else if (connection === 'close' && lastDisconnect) {
        console.log('Cliente foi desconectado', lastDisconnect?.error);
    }
});

sock.ev.on('messages.upsert', async (message) => {
    console.log('Mensagem recebida:', message);
    const msg = message.messages[0];
    if (msg.message?.conversation === '!ping') {
        await sock.sendMessage(msg.key.remoteJid!, { text: 'pong' });
    } else {
        await sock.sendMessage(msg.key.remoteJid!, { text: 'Olá! Recebi sua mensagem.' });
    }
});

console.log('Cliente WhatsApp inicializado.');
