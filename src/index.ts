import './styles.css'

const encode = (text: string) => btoa(unescape(encodeURIComponent(text)))
const decode = (text: string) => decodeURIComponent(escape(atob(text)))

document.addEventListener('DOMContentLoaded', () => {
  const searchParams = (new URL(String(document.location))).searchParams;
  const existingText = searchParams.get('t')
  const textareaEl = document.getElementById('textarea') as HTMLTextAreaElement
  const copyEl = document.getElementById('copy') as HTMLButtonElement

  if (existingText) {
    const decodedText = decode(existingText)
    textareaEl.value = decodedText
  }

  textareaEl?.addEventListener('keyup', () => {
    const { value } = textareaEl
    const encodedText = encode(value)

    searchParams.set('t', encodedText)
    history.replaceState({}, '', `${location.pathname}?${searchParams}`);
  })

  copyEl?.addEventListener('click', () => {
    if (!navigator.clipboard) alert('clipboard not available')
    navigator.clipboard.writeText(String(location))
  })
}, false)
