import QRCode from 'qrcode'
export async function generateQRCode(data){
  const el = document.getElementById('qrcode')
  if(!el) return
  el.innerHTML = ''
  const canvas = document.createElement('canvas')
  await QRCode.toCanvas(canvas, data)
  el.appendChild(canvas)
}
