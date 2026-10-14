import { useState } from 'react'
import LoginIllustration from '../components/LoginIllustration'

const inputClassName =
  'w-full rounded-2xl border border-line bg-soft px-4 py-4 text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acc'

const linkClassName =
  'min-h-11 rounded-md font-bold text-acc hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acc'

const mensagens = {
  entrar: 'Esta tela está em demonstração. O acesso à conta ainda não está conectado; seus dados não foram enviados.',
  escola: 'A entrada com a conta da escola ainda não está disponível nesta demonstração.',
  recuperar: 'A recuperação de senha ainda não está disponível nesta demonstração. Para uma conta existente, peça orientação à sua escola.',
  criar: 'O cadastro ainda não está disponível nesta demonstração. Para obter acesso, peça orientação à sua escola.',
}

export default function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [aviso, setAviso] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const identificacao = event.currentTarget.elements.identificacao

    if (!identificacao.value.trim()) {
      identificacao.setCustomValidity('Informe sua matrícula ou seu e-mail.')
      identificacao.reportValidity()
      return
    }

    setAviso(mensagens.entrar)
  }

  return (
    <main className="grid min-h-screen min-h-dvh lg:grid-cols-[0.95fr_1.05fr]">
      <section aria-labelledby="login-titulo" className="flex min-w-0 flex-col px-5 py-7 sm:px-10 lg:px-12 lg:py-10 xl:px-16">
        <header className="flex items-center gap-3 font-extrabold">
          <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-xl bg-linear-to-br from-acc to-sec font-mono text-sm text-bg">
            {'</>'}
          </span>
          <span className="text-lg">Código na Escola</span>
        </header>

        <div className="entrada-suave mx-auto my-auto w-full max-w-md py-12 lg:py-16">
          <h1 id="login-titulo" className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Bora programar?
          </h1>
          <p className="mt-3 text-lg text-muted">Continue de onde você parou.</p>

          <form className="mt-10" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="login-identificacao" className="mb-2 block text-sm font-bold">
                Matrícula ou e-mail
              </label>
              <input
                id="login-identificacao"
                name="identificacao"
                type="text"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                required
                placeholder="Ex.: 2024123456 ou nome@escola.gov.br"
                className={inputClassName}
                onInput={(event) => {
                  event.currentTarget.setCustomValidity('')
                  setAviso('')
                }}
              />
            </div>

            <div className="mt-6">
              <label htmlFor="login-senha" className="mb-2 block text-sm font-bold">
                Senha
              </label>
              <div className="relative">
                <input
                  id="login-senha"
                  name="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  placeholder="Digite sua senha"
                  className={`${inputClassName} pr-24`}
                  onInput={() => setAviso('')}
                />
                <button
                  type="button"
                  aria-controls="login-senha"
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                  onClick={() => setMostrarSenha((visivel) => !visivel)}
                  className="absolute top-1/2 right-3 min-h-11 min-w-16 -translate-y-1/2 rounded-lg px-2 text-sm font-bold text-acc hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acc"
                >
                  {mostrarSenha ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
              <label className="flex min-h-11 cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  name="manterConectado"
                  className="size-4 shrink-0 accent-acc focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acc"
                />
                Manter conectado
              </label>
              <button type="button" className={linkClassName} onClick={() => setAviso(mensagens.recuperar)}>
                Esqueci minha senha
              </button>
            </div>

            <button
              type="submit"
              className="ui-button mt-5 w-full rounded-2xl bg-linear-to-br from-acc to-sec px-5 py-4 text-lg font-extrabold text-bg shadow-[0_8px_24px_-12px_var(--color-acc)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acc"
            >
              Entrar
            </button>
            <button
              type="button"
              className="ui-button mt-3 w-full rounded-2xl border border-line px-5 py-4 font-bold hover:border-acc hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acc"
              onClick={() => setAviso(mensagens.escola)}
            >
              Entrar com conta da escola
            </button>

            <p className="mt-6 flex flex-wrap items-center justify-center gap-x-1 text-sm text-muted">
              Primeiro acesso?
              <button type="button" className={linkClassName} onClick={() => setAviso(mensagens.criar)}>
                Criar minha conta
              </button>
            </p>

            <div role="status" aria-live="polite" aria-atomic="true">
              {aviso && <p className="mt-4 rounded-xl border border-line bg-soft p-4 text-sm leading-relaxed text-muted">{aviso}</p>}
            </div>
          </form>
        </div>
      </section>

      <LoginIllustration />
    </main>
  )
}
