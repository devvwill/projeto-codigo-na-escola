export default function AnimatedCode({ parts, visibleCount, isAnimating }) {
  const fullCode = parts.map((part) => part.text).join('')
  let offset = 0

  const codeSpans = parts.map((part, index) => {
    const visibleText = part.text.slice(0, Math.max(0, visibleCount - offset))
    offset += part.text.length

    return <span key={index} className={part.className}>{visibleText}</span>
  })

  return (
    <code className="grid">
      {/* Reserva o espaço do código completo para evitar saltos no cartão. */}
      <span className="invisible col-start-1 row-start-1">{fullCode}{' '}</span>
      <span className="col-start-1 row-start-1">
        {codeSpans}
        <span className={`code-cursor ${isAnimating ? 'code-cursor-active' : 'invisible'}`} />
      </span>
    </code>
  )
}
