import React, {useState, useEffect} from 'react'
import CapsuleViewer from '../components/CapsuleViewer'

export default function OpenCapsule(){
  const [capsuleId, setCapsuleId] = useState('')
  const [keyHex, setKeyHex] = useState('')

  useEffect(()=>{
    // If link has fragment as #key, and path like /open/<id>, auto-fill
    const parts = location.pathname.split('/')
    const id = parts[parts.length-1] || ''
    if(id) setCapsuleId(id)
    const frag = location.hash ? location.hash.replace('#','') : ''
    if(frag) setKeyHex(frag)
  },[])

  return (
    <div>
      <h2>Open Capsule</h2>
      <div style={{display:'flex',gap:8,marginBottom:12}}>
        <input placeholder='Capsule ID or /open/<id>' value={capsuleId} onChange={e=>setCapsuleId(e.target.value)} />
        <input placeholder='Decryption key (hex)' value={keyHex} onChange={e=>setKeyHex(e.target.value)} />
        <a href={`/open/${capsuleId}#${keyHex}`}><button>Open in page</button></a>
      </div>
      <CapsuleViewer capsuleId={capsuleId} keyHex={keyHex} />
    </div>
  )
}
