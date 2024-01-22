import './global.css'
import { useEffect, useState } from 'react'

function App(): JSX.Element {
  console.log('Olá', window.api.getQr())

  return <div>Olá</div>
}

export default App
