import Button from './Button'
import AnimatedCode from './AnimatedCode'
import useTypewriter from '../hooks/useTypewriter'
import { codeParts, fullCode } from '../data/codeExample'

export default function Hero({ nome, aula }) {
  const { visibleCount, isAnimating } = useTypewriter(fullCode)

  return (
    <section className="entrada-suave mb-9 grid overflow-hidden rounded-3xl border border-line lg:grid-cols-2">
      <div className="min-w-0 p-6 sm:p-8 xl:p-10">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Bem-vindo de volta, {nome}!
        </h1>
        <p className="mt-3 mb-6 text-muted">Continue de onde parou: {aula}</p>
        <Button>Ir para minhas aulas</Button>
      </div>

      <div aria-hidden="true" className="grid min-w-0 place-items-center bg-linear-to-br from-acc to-sec p-4 sm:p-8">
        <div className="w-full max-w-xs overflow-hidden rounded-xl bg-bg shadow-2xl">
          <div className="flex gap-1.5 border-b border-line px-4 py-3">
            <span className="size-2.5 rounded-full bg-red-400" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-green-400" />
          </div>
          <pre className="overflow-hidden px-3 py-5 font-mono text-[11px] leading-6 sm:px-5 sm:text-xs">
            <AnimatedCode parts={codeParts} visibleCount={visibleCount} isAnimating={isAnimating} />
          </pre>
        </div>
      </div>
    </section>
  )
}
