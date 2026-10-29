import { useEffect, useRef, useState } from 'react'
import { LogOut, Menu } from 'lucide-react'
import MobileMenu from '../MobileMenu'
import { ProfessorIcon } from './ProfessorUI'

const itens = [['turmas', 'Minhas turmas'], ['atividades', 'Atividades'], ['materiais', 'Materiais'], ['relatorios', 'Relatórios']]
function ProfessorNavigation({ pagina, onNavigate }) {
  return <nav aria-label="Menu do professor" className="flex flex-col gap-1">
    <p className="px-3 pb-2 text-xs font-bold text-muted">ÁREA DO PROFESSOR</p>
    {itens.map(([id, nome]) => <a key={id} href={`#/professor/${id}`} onClick={onNavigate} aria-current={pagina === id ? 'page' : undefined} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-base focus-visible:outline-2 focus-visible:outline-acc ${pagina === id ? 'bg-soft font-bold text-ink' : 'font-medium text-muted hover:bg-soft hover:text-ink'}`}><ProfessorIcon nome={id} className={pagina === id && id !== 'turmas' ? 'opacity-100' : ''} />{nome}</a>)}
  </nav>
}
export default function ProfessorLayout({ usuario, pagina, busca, setBusca, sair, children, buscaPlaceholder }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [perfilOpen, setPerfilOpen] = useState(false)
  const [notificacoesOpen, setNotificacoesOpen] = useState(false)
  const [saindo, setSaindo] = useState(false)
  const [erroSaida, setErroSaida] = useState('')
  const area = useRef(null)
  const botaoPerfil = useRef(null)
  useEffect(() => { setMenuOpen(false); setPerfilOpen(false); setNotificacoesOpen(false) }, [pagina])
  useEffect(() => {
    if (!perfilOpen && !notificacoesOpen) return
    function fechar(e) { if (!area.current?.contains(e.target)) { setPerfilOpen(false); setNotificacoesOpen(false) } }
    function tecla(e) { if (e.key === 'Escape') { setPerfilOpen(false); setNotificacoesOpen(false); botaoPerfil.current?.focus() } }
    document.addEventListener('pointerdown', fechar)
    document.addEventListener('keydown', tecla)
    return () => { document.removeEventListener('pointerdown', fechar); document.removeEventListener('keydown', tecla) }
  }, [perfilOpen, notificacoesOpen])
  async function desconectar() {
    setSaindo(true)
    setErroSaida('')
    try { await sair() } catch { setErroSaida('Não foi possível sair. Tente novamente.'); setSaindo(false) }
  }
  return <div className="grid min-h-screen md:grid-cols-[220px_minmax(0,1fr)]">
    <aside className="sticky top-0 hidden h-dvh flex-col border-r border-line bg-side p-3.5 md:flex">
      <a href="#/professor/turmas" className="mb-9 flex items-center gap-3 rounded-lg text-base font-extrabold focus-visible:outline-2 focus-visible:outline-acc"><span className="grid size-[30px] place-items-center rounded-xl bg-linear-to-br from-acc to-sec"><ProfessorIcon nome="logo" /></span>Código na Escola</a>
      <ProfessorNavigation pagina={pagina} />
      <div className="mt-auto rounded-xl border border-line px-4 py-4 text-xs"><b>Estudo gratuito</b><p className="mt-2 leading-5 text-muted">Feito para estudantes<br />da rede pública.</p></div>
    </aside>
    <div className="flex min-w-0 flex-col">
      <header className="relative z-20 flex flex-wrap items-center gap-3 border-b border-line px-4 py-3 md:flex-nowrap md:px-8">
        <button type="button" aria-label="Abrir menu do professor" aria-expanded={menuOpen} aria-haspopup="dialog" aria-controls="menu-celular" onClick={() => setMenuOpen(true)} className="grid size-11 place-items-center rounded-xl border border-line md:hidden"><Menu className="size-5" aria-hidden="true" /></button>
        <label className="relative order-last w-full md:order-none md:max-w-[520px] md:flex-1"><span className="sr-only">Buscar alunos e atividades</span><ProfessorIcon nome="busca" className="absolute top-1/2 left-4 -translate-y-1/2" /><input type="search" value={busca} onChange={e => setBusca(e.target.value)} placeholder={buscaPlaceholder || (pagina === 'turmas' ? 'Buscar alunos e atividades' : 'Buscar nesta página')} className="min-h-10 w-full rounded-full border border-line bg-soft pr-4 pl-11 text-base placeholder:text-muted md:text-sm focus:outline-2 focus:outline-acc" /></label>
        <div ref={area} className="ml-auto flex items-center gap-3">
          <button type="button" aria-label="Notificações do professor" aria-expanded={notificacoesOpen} onClick={() => { setNotificacoesOpen(!notificacoesOpen); setPerfilOpen(false) }} className="grid size-10 place-items-center rounded-full border border-line bg-soft hover:border-acc focus-visible:outline-2 focus-visible:outline-acc"><ProfessorIcon nome="sino" /></button>
          <button type="button" ref={botaoPerfil} aria-label="Menu do professor" aria-expanded={perfilOpen} aria-controls="perfil-professor" onClick={() => { setPerfilOpen(!perfilOpen); setNotificacoesOpen(false) }} className="flex min-h-12 items-center gap-4 rounded-full border border-line bg-soft px-4 text-sm font-bold focus-visible:outline-2 focus-visible:outline-acc"><span className="hidden max-w-40 truncate sm:block">Olá, {usuario.nome.split(' ')[0]}!</span><span className="grid size-8 place-items-center rounded-full bg-acc text-base font-extrabold text-bg">{usuario.nome[0].toUpperCase()}</span><ProfessorIcon nome="chevron" /></button>
          {perfilOpen && <div id="perfil-professor" className="absolute top-full right-4 mt-2 w-64 rounded-xl border border-line bg-soft p-3 text-sm shadow-xl"><p className="font-bold">{usuario.nome}</p><p className="mt-1 truncate text-xs text-muted">{usuario.email}</p><p className="mt-2 text-xs text-sec">Professor</p><button type="button" disabled={saindo} onClick={desconectar} className="profile-item mt-3 w-full text-red-400 disabled:opacity-50"><LogOut aria-hidden="true" className="size-4" />{saindo ? 'Saindo…' : 'Sair'}</button>{erroSaida && <p role="alert" className="mt-2 text-xs text-red-400">{erroSaida}</p>}</div>}
          {notificacoesOpen && <section aria-label="Notificações do professor" className="absolute top-full right-4 left-4 mt-2 rounded-xl border border-line bg-soft p-6 shadow-xl sm:left-auto sm:w-80"><h2 className="font-bold">Notificações</h2><p className="mt-3 text-sm text-muted">Nenhuma notificação no momento.</p></section>}
        </div>
      </header>
      <main id="conteudo-professor" tabIndex={-1} className="w-full max-w-[1440px] flex-1 px-4 pt-4 pb-8 outline-none md:px-10">{children}</main>
      <footer className="border-t border-line px-4 py-4 text-[13px] leading-5 text-muted md:px-8">© 2026 Código na Escola · Projeto educativo e gratuito para estudantes da rede pública. Os números desta tela são exemplos.</footer>
    </div>
    <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)}><ProfessorNavigation pagina={pagina} onNavigate={() => setMenuOpen(false)} /></MobileMenu>
  </div>
}
