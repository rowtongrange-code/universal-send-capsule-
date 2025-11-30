import sodium from 'libsodium-wrappers'

export async function generateKey(){
  await sodium.ready
  const key = sodium.randombytes_buf(sodium.crypto_secretbox_KEYBYTES)
  return key
}

export async function encryptBytes(bytes, key){
  await sodium.ready
  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES)
  const cipher = sodium.crypto_secretbox_easy(bytes, nonce, key)
  const out = new Uint8Array(nonce.length + cipher.length)
  out.set(nonce, 0)
  out.set(cipher, nonce.length)
  return out
}

export async function decryptBytes(combined, key){
  await sodium.ready
  const nonce = combined.slice(0, sodium.crypto_secretbox_NONCEBYTES)
  const cipher = combined.slice(sodium.crypto_secretbox_NONCEBYTES)
  const plain = sodium.crypto_secretbox_open_easy(cipher, nonce, key)
  return plain
}

export function keyToHex(key){
  return Buffer.from(key).toString('hex')
}

export function keyFromHex(hex){
  return Uint8Array.from(Buffer.from(hex, 'hex'))
}
