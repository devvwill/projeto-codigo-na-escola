import { ArrowRight } from 'lucide-react'
import Button from './Button'

export default function CourseProgress({ curso, aula, duracao, progresso }) {
  return (
    <section aria-labelledby="curso-atual-titulo" className="entrada-suave rounded-2xl border border-acc/30 bg-soft/50 p-5 sm:p-6">
      <p className="text-xs font-bold tracking-wider text-acc uppercase">Curso em andamento</p>

      <div className="mt-2 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <h2 id="curso-atual-titulo" className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {curso}
          </h2>
          <p className="mt-4 text-xs font-bold text-muted">PRÓXIMA AULA</p>
          <p className="mt-1 font-bold">{aula}</p>
          <p className="mt-1 text-sm text-muted">{duracao} de aula</p>
        </div>

        <Button aria-label={`Continuar aula: ${aula}`} className="flex items-center justify-center gap-2 sm:shrink-0 sm:self-center">
          Continuar aula
          <ArrowRight aria-hidden="true" className="size-4" />
        </Button>
      </div>

      <div className="mt-5 border-t border-line pt-4">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="text-muted">Progresso no curso</span>
          <span className="font-bold text-ink">{progresso}%</span>
        </div>
        <div
          role="progressbar"
          aria-label={`Progresso no curso ${curso}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progresso}
          className="h-2 overflow-hidden rounded-full bg-line"
        >
          <div style={{ width: `${progresso}%` }} className="preencher-barra h-full rounded-full bg-linear-to-r from-acc to-sec" />
        </div>
      </div>
    </section>
  )
}
