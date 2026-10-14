import AnimatedCode from './AnimatedCode'
import useTypewriter from '../hooks/useTypewriter'
import { codeParts, fullCode } from '../data/codeExample'

export default function LoginIllustration() {
  const { visibleCount, isAnimating } = useTypewriter(fullCode, '(min-width: 64rem)')

  const visibleCode = fullCode.slice(0, visibleCount)
  const headingVisible = visibleCode.includes('</h1>')
  const paragraphVisible = visibleCode.includes('</p>')

  return (
    <div aria-hidden="true" className="login-illustration relative m-4 ml-0 hidden min-w-0 items-center justify-center overflow-hidden rounded-[32px] p-8 lg:flex xl:p-12">
      <div className="w-full max-w-md pb-10">
        <div className="overflow-hidden rounded-3xl border border-line bg-bg/95 shadow-2xl">
          <div className="flex items-center justify-between gap-4 border-b border-line bg-soft/70 px-5 py-4">
            <div className="flex gap-2">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-amber-400" />
              <span className="size-2.5 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-muted">primeira-pagina.html</span>
          </div>

          <pre className="overflow-hidden px-5 pt-5 pb-14 font-mono text-sm leading-8 xl:px-6">
            <AnimatedCode parts={codeParts} visibleCount={visibleCount} isAnimating={isAnimating} />
          </pre>
        </div>

        <div className="relative -mt-6 ml-10 rounded-2xl bg-white px-6 py-5 text-[#101828] shadow-2xl xl:ml-14">
          <p className="text-xs text-[#596780]">Resultado no navegador</p>
          <p data-visible={headingVisible} className="login-preview-text mt-2 text-2xl font-extrabold">
            Olá, mundo!
          </p>
          <p data-visible={paragraphVisible} className="login-preview-text mt-1 text-sm text-[#475467]">
            Minha primeira página
          </p>
        </div>
      </div>
    </div>
  )
}
