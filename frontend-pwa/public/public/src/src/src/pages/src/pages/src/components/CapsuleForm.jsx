import React, {useState} from 'react'
import { generateKey, encryptBytes, keyToHex } from '../utils/crypto'
import { generateQRCode } from '../utils/qrcode'

export default function CapsuleForm(){
  const [file, setFile] = useState(null)
  const [capsuleLink, setCapsuleLink] = useState('')
  const [separateKey, setSeparateKey] = useState(false)
  const [loading, setLoading] = useState(false)

  async function createCapsule(){
    if(!file) return alert('Pick a file')
    setLoading(true)
    const arrayBuffer = await file.arrayBuffer()
    const bytes = new Uint8Array(arrayBuffer)
    const key = await generateKey()
    const encrypted = await encryptBytes(bytes, key)

    // send encrypted blob to backend
    const fd = new FormData()
    const blob = new Blob([encrypted], {type:'application/octet-stream'})
    fd.append('file', blob, file.name + '.enc')
    fd.append('filename', file.name)
    fd.append('separate_key', separateKey ? '1' : '0')

    try{
      const res = await fetch('/v1/capsules', {method:'POST', body:fd})
      const json = await res.json()
      const keyHex = keyToHex(key)
      let link = `${location.origin}/open/${json.capsule_id}`
      if(!separateKey) link = link + '#' + keyHex
      setCapsuleLink(link)
      generateQRCode(link)
      if(separateKey) alert('Copy this decryption key and share it separately: ' + keyHex)
    }catch(e){
      alert('Failed to create capsule: '+e.message)
    }finally{ setLoading(false) }
  }

  return (
    <div>
      <input type='file' onChange={e=>setFile(e.target.files[0])} />
      <div style={{marginTop:8}}>
        <label><input type='checkbox' checked={separateKey} onChange={e=>setSeparateKey(e.target.checked)} /> Separate key (do not embed in link)</label>
      </div>
      <button onClick={createCapsule} disabled={loading} style={{marginTop:8}}>{loading? 'Creating...' : 'Create Capsule'}</button>

      {capsuleLink && (
        <div style={{marginTop:12}}>
          <p>Link: <a href={capsuleLink} target='_blank' rel='noreferrer'>{capsuleLink}</a></p>
          <div id='qrcode'></div>
        </div>
      )}
    </div>
  )
}
