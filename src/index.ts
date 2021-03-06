import { compressToBase64, decompressFromBase64 } from './lib/lz-string.min.js'
import './styles.css'

const qrURL = (url: string) => `https://zxing.org/w/chart?cht=qr&chs=200x200&chld=L&choe=UTF-8&chl=${url}`

document.addEventListener('DOMContentLoaded', () => {
  const textareaEl = document.getElementById('textarea') as HTMLTextAreaElement | undefined,
    copyEl = document.getElementById('copy') as HTMLButtonElement | undefined,
    qrEl = document.getElementById('qr') as HTMLAnchorElement | undefined,
    searchParams = (new URL(String(document.location))).searchParams,
    existingText = searchParams.get('t')

  if (existingText && textareaEl && qrEl) {
    const decodedText = decompressFromBase64(existingText)
    textareaEl.value = decodedText ?? ''
    qrEl.href = qrURL(location.href)
  }

  textareaEl?.addEventListener('keyup', () => {
    const { value } = textareaEl,
      encodedText = compressToBase64(value),
      newURL = `${location.pathname}?${searchParams}`

    searchParams.set('t', encodedText)
    history.replaceState({}, '', newURL)
    if (qrEl) qrEl.href = qrURL(`${location.origin}${newURL}`)
  })

  copyEl?.addEventListener('click', () => {
    if (!navigator.clipboard) alert('clipboard not available')
    navigator.clipboard.writeText(String(location))
  })
}, false)
