// 글자를 클립보드에 복사한다. 앱 안 브라우저처럼 클립보드 권한이 없는 곳에서는
// 임시 입력칸을 선택해 복사 명령을 시도한다. 성공 여부를 돌려준다.
export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const field = document.createElement('textarea')
    field.value = text
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.opacity = '0'
    // 열려 있는 dialog 안에서도 선택할 수 있도록, 포커스가 있던 곳 옆에 잠깐 넣는다.
    const host = document.activeElement?.parentElement ?? document.body
    host.appendChild(field)
    field.select()
    let done = false
    try {
      done = document.execCommand('copy')
    } catch {
      done = false
    }
    field.remove()
    return done
  }
}
