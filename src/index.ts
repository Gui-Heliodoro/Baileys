import makeWASocket from './Socket'
import makeWASocket from '@whiskeysockets/baileys'

export * from '../WAProto'
export * from './Utils'
export * from './Types'
export * from './Store'
export * from './Defaults'
export * from './WABinary'
export * from './WAM'
export * from './WAUSync'

export type WASocket = ReturnType<typeof makeWASocket>
export { makeWASocket }
export default makeWASocket


const sock = makeWASocket({
    // can provide additional config here
    browser: Browsers.ubuntu('My App'),
    printQRInTerminal: true
})
