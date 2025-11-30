import React, {useState} from 'react'
import { keyFromHex, decryptBytes } from '../utils/crypto'

export default function CapsuleViewer({ capsuleId, keyHex }){
  const [status, setStatus] = useState('idle')
  const [preview, setPreview] = useState('')

  async function open(){
    if(!capsuleId) return alert('Enter capsule id')
    if(!keyHex) return alert('Enter key')
    setStatus('fetching')
    try{
      const res = await fetch(`/v1/capsules/${capsuleId}/download`)
      if(!res.ok) throw new Error('Not found')
      const arrayBuffer = await res.arrayBuffer()
      const combined = new Uint8Array(arrayBuffer)
      const key = keyFromHex(keyHex)
      const plain = await decryptBytes(combined, key)
      // try to render text preview
      let text
      try{ text = new TextDecoder().decode(plain.slice(0, 2048)) }catch(e){ text = '[binary data]' }
      setPreview(text)
      setStatus('done')
    }catch(e){ setStatus('error'); setPreview(e.message) }
  }

  return (
    <div>
      <div style={{display:'flex',gap:8}}>
        <button onClick={open}>Fetch & Decrypt</button>
      </div>
      <div style={{marginTop:12}}>
        <pre style={{whiteSpace:'pre-wrap',background:'#f4f4f4',padding:8}}>{status === 'idle' ? 'Ready' : preview}</pre>
      </div>
    </div>
  )
}
