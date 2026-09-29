export default function CommitteeWordmark({ className = '' }: { className?: string }) {
  return (
    <a
      href="#top"
      className={`committee-wordmark inline-flex flex-col ${className}`}
      aria-label="서울과학기술대학교 총졸업준비위원회 · 처음으로"
    >
      <span className="text-[11px] leading-[1.25] font-normal text-[var(--grad42-wordmark-secondary)]">
        서울과학기술대학교
      </span>
      <span className="text-[15px] leading-[1.25] font-bold text-[var(--grad42-wordmark-primary)]">
        총졸업준비위원회
      </span>
    </a>
  )
}
