import { event, mailto } from '../data/event'

// Compatibility entry point for the former reply section.
export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="page-shell section-space">
      <h2 id="contact-title" className="section-title">
        문의 및 연락
      </h2>
      <p className="mt-4 text-muted">행사에 관해 궁금하신 점은 총졸업준비위원회로 문의해 주세요.</p>
      <a href={mailto} className="mt-4 inline-flex min-h-11 items-center text-primary">
        {event.email}
      </a>
    </section>
  )
}
