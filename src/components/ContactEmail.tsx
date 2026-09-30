import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { event } from '../data/event'
import { copyText } from '../lib/clipboard'
import '../styles/contact-email.css'

// 이메일은 연결하지 않고 주소만 보여 주며, 누르면 주소를 복사한다.
export default function ContactEmail() {
  const [copied, setCopied] = useState<'idle' | 'done' | 'failed'>('idle')

  async function copy() {
    setCopied((await copyText(event.email)) ? 'done' : 'failed')
  }

  return (
    <div className="contact-email">
      <span className="contact-email__label">이메일</span>
      <div className="contact-email__row">
        <span className="contact-email__address">{event.email}</span>
        <button type="button" className="contact-email__copy" onClick={copy}>
          {copied === 'done' ? (
            <Check size={14} aria-hidden="true" />
          ) : (
            <Copy size={14} aria-hidden="true" />
          )}
          {copied === 'done' ? '복사했습니다' : '주소 복사'}
        </button>
      </div>
      <p className="contact-email__status" role="status">
        {copied === 'failed' && '복사하지 못했습니다. 주소를 직접 선택해 복사해 주세요.'}
      </p>
    </div>
  )
}
