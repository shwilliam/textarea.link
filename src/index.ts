import { compressToBase64, decompressFromBase64 } from './lib/lz-string.min.js'
import './styles.css'

const qrURL = (url: string) => `https://zxing.org/w/chart?cht=qr&chs=200x200&chld=L&choe=UTF-8&chl=${url}`

document.addEventListener('DOMContentLoaded', () => {
  const textareaEl = document.getElementById('textarea') as HTMLTextAreaElement
  const copyEl = document.getElementById('copy') as HTMLButtonElement
  const qrEl = document.getElementById('qr') as HTMLAnchorElement
  const searchParams = (new URL(String(document.location))).searchParams
  const existingText = searchParams.get('t')

  if (existingText) {
    const decodedText = decompressFromBase64(existingText)
    textareaEl.value = decodedText ?? ''
    qrEl.href = qrURL(location.href)
  }

  textareaEl?.addEventListener('keyup', () => {
    const { value } = textareaEl
    const encodedText = compressToBase64(value)
    const newURL = `${location.pathname}?${searchParams}`

    searchParams.set('t', encodedText)
    history.replaceState({}, '', newURL)
    qrEl.href = qrURL(`${location.origin}${newURL}`)
  })

  copyEl?.addEventListener('click', () => {
    if (!navigator.clipboard) alert('clipboard not available')
    navigator.clipboard.writeText(String(location))
  })
}, false)
