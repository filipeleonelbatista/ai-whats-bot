import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import { Client, NoAuth } from 'whatsapp-web.js'

const client = new Client({
  authStrategy: new NoAuth()
})



const getQr = () => {
  let result = ''
  console.log('TO AQUI')
  client.on('qr', (qr) => {
    console.log('TO AQUI QR:', qr)
    result = qr
    console.log('TO AQUI result:', result)

  })  
  console.log('TO AQUI resultf:', result)
  return result
}

// Custom APIs for renderer
const api = {
  getQr
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

client.initialize()