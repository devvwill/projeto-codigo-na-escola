export default function QuickCard({ icone: Icone, titulo, texto, cor = 'text-acc', atraso = 0 }) {
  return (
    <button type="button" style={{ '--entrada-atraso': `${atraso}ms` }} className="entrada-suave interactive-surface flex min-h-24 min-w-0 items-center gap-3.5 rounded-2xl border border-line p-4 text-left hover:border-acc/70 hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acc">
      <span className={`grid size-10 shrink-0 place-items-center rounded-xl bg-tag ${cor}`}>
        <Icone className="size-6" strokeWidth={1.75} />
      </span>
      <span className="flex flex-col">
        <b className="text-[17px]">{titulo}</b>
        <span className="text-sm text-muted">{texto}</span>
      </span>
    </button>
  )
}
