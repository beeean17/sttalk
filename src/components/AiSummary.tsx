import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, Copy, Sparkles, X } from 'lucide-react'
import { fullPrompt, linkPrompt, llmDocPaths, llmIndexPath } from '../data/llm'
import '../styles/ai-summary.css'

type Copied = 'idle' | 'done' | 'failed'

// 사이트 내용을 AI에게 요약해 달라고 할 때 쓸 프롬프트를 보여 주고 복사하게 한다.
export default function AiSummary({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const [withDocuments, setWithDocuments] = useState(false)
  const [documents, setDocuments] = useState<string[] | 'failed' | null>(null)
  const [copied, setCopied] = useState<Copied>('idle')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const promptRef = useRef<HTMLTextAreaElement>(null)
  const titleId = useId()
  const prompt = withDocuments && Array.isArray(documents) ? fullPrompt(documents) : linkPrompt()

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    if (!dialog) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (!dialog.open) dialog.showModal()
    return () => {
      if (dialog.open) dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  // 복사는 누른 즉시 해야 하므로, 문서는 창을 열 때 미리 받아 둔다.
  useEffect(() => {
    if (!open || documents !== null) return
    let cancelled = false
    Promise.all(
      [llmIndexPath, ...llmDocPaths].map(async (path) => {
        const response = await fetch(new URL(path, document.baseURI))
        if (!response.ok) throw new Error(`${path}: ${response.status}`)
        return response.text()
      }),
    )
      .then((texts) => !cancelled && setDocuments(texts))
      .catch(() => !cancelled && setDocuments('failed'))
    return () => {
      cancelled = true
    }
  }, [open, documents])

  function close() {
    setOpen(false)
    setCopied('idle')
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied('done')
    } catch {
      // 앱 안 브라우저처럼 클립보드 권한이 없는 곳에서는 선택 후 복사 명령을 시도하고,
      // 그것도 안 되면 직접 복사할 수 있게 전체를 선택해 둔다.
      promptRef.current?.focus()
      promptRef.current?.select()
      let done = false
      try {
        done = document.execCommand('copy')
      } catch {
        done = false
      }
      setCopied(done ? 'done' : 'failed')
    }
  }

  return (
    <>
      <button
        type="button"
        className={`ai-summary-button ${className}`}
        onClick={() => setOpen(true)}
      >
        <Sparkles size={16} strokeWidth={1.8} aria-hidden="true" />
        AI로 요약해서 보기
      </button>
      {open &&
        createPortal(
          <dialog
            ref={dialogRef}
            className="ai-summary"
            aria-labelledby={titleId}
            onCancel={(event) => {
              event.preventDefault()
              close()
            }}
            onClick={(event) => {
              if (event.target === event.currentTarget) close()
            }}
          >
            <div className="ai-summary__panel">
              <div className="ai-summary__header">
                <h2 id={titleId}>AI에게 요약 요청하기</h2>
                <button
                  type="button"
                  className="ai-summary__close"
                  onClick={close}
                  aria-label="요약 요청 창 닫기"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
              <p className="ai-summary__lead">
                아래 문장을 복사해 평소 쓰는 AI 챗봇에 붙여 넣으면 이 사이트의 내용을 요약해 줍니다.
              </p>
              <textarea
                ref={promptRef}
                className="ai-summary__prompt"
                aria-label="AI에게 보낼 문장"
                readOnly
                rows={withDocuments ? 12 : 10}
                value={prompt}
              />
              <label className="ai-summary__option">
                <input
                  type="checkbox"
                  checked={withDocuments}
                  disabled={!Array.isArray(documents)}
                  onChange={(event) => {
                    setWithDocuments(event.target.checked)
                    setCopied('idle')
                  }}
                />
                <span>
                  문서 내용까지 넣기
                  <small>
                    {documents === 'failed'
                      ? '문서를 불러오지 못했습니다. 링크만 담은 문장을 써 주세요.'
                      : '주소를 열지 못하는 AI에 쓸 때 켜 주세요.'}
                  </small>
                </span>
              </label>
              <div className="ai-summary__actions">
                <button type="button" className="ai-summary__copy" onClick={copy}>
                  {copied === 'done' ? (
                    <Check size={18} aria-hidden="true" />
                  ) : (
                    <Copy size={18} aria-hidden="true" />
                  )}
                  {copied === 'done' ? '복사했습니다' : '문장 복사'}
                </button>
                <a
                  className="ai-summary__source"
                  href={`./${llmIndexPath}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  AI용 안내 문서 보기 <span aria-hidden="true">↗</span>
                </a>
              </div>
              <p className="ai-summary__status" role="status">
                {copied === 'failed' &&
                  '자동으로 복사하지 못했습니다. 문장을 선택해 두었으니 직접 복사해 주세요.'}
              </p>
            </div>
          </dialog>,
          document.body,
        )}
    </>
  )
}
