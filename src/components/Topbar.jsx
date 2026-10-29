import { useEffect, useRef, useState } from 'react'
import { Bell, ChevronDown, HelpCircle, LogOut, Menu, Search, User } from 'lucide-react'
import Notifications from './Notifications'
import { useLearning } from '../hooks/useLearning'

export default function Topbar({ menuOpen, onOpenMenu, pagina = 'inicio', busca, onBuscaChange, lidas, onRead, onReadAll, naoLidas }) {
  const [aberto, setAberto] = useState(null)
  const [dica, setDica] = useState('')
  const area = useRef(null)
  const perfilBotao = useRef(null)
  const notificacoesBotao = useRef(null)
  const { perfil } = useLearning()
  useEffect(() => {
    if (!aberto) return
    function fechar(event) { if (!area.current?.contains(event.target)) setAberto(null) }
    function teclado(event) { if (event.key === 'Escape') { setAberto(null); (aberto === 'perfil' ? perfilBotao : notificacoesBotao).current?.focus() } }
    document.addEventListener('pointerdown', fechar)
    document.addEventListener('keydown', teclado)
    return () => { document.removeEventListener('pointerdown', fechar); document.removeEventListener('keydown', teclado) }
  }, [aberto])
  useEffect(() => { setAberto(null) }, [pagina])
  return <header className="relative z-20 flex flex-wrap items-center gap-3 border-b border-line px-4 py-4 md:flex-nowrap md:gap-4 md:px-8">
    <button type="button" aria-label="Abrir menu" aria-haspopup="dialog" aria-expanded={menuOpen} aria-controls="menu-celular" onClick={onOpenMenu} className="grid size-11 shrink-0 place-items-center rounded-xl border border-line text-ink hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acc md:hidden"><Menu aria-hidden="true" className="size-5" /></button>
    <span className="text-sm font-bold md:hidden">{{ aulas: 'Aulas', inicio: 'Início', painel: 'Meu painel', player: 'Aula', notificacoes: 'Notificações' }[pagina]}</span>
    <form role="search" className="relative order-last min-w-0 basis-full md:order-none md:max-w-lg md:flex-1 md:basis-auto" onSubmit={event => { event.preventDefault(); if (pagina !== 'aulas') window.location.hash = `#/aulas?busca=${encodeURIComponent(busca)}` }}>
      <label><span className="sr-only">Buscar aulas</span><Search aria-hidden="true" className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" /><input type="search" value={busca} onChange={event => onBuscaChange?.(event.target.value)} placeholder="Buscar aulas e materiais" className="w-full rounded-full border border-line bg-soft py-2.5 pr-5 pl-11 text-base placeholder:text-muted hover:border-muted/50 focus:outline-2 focus:outline-acc md:text-sm" /></label>
    </form>
    <div ref={area} className="ml-auto flex shrink-0 items-center gap-3 font-bold">
      <button ref={notificacoesBotao} type="button" aria-label={`Notificações${naoLidas ? `, ${naoLidas} não lidas` : ''}`} aria-expanded={aberto === 'notificacoes'} aria-controls="painel-notificacoes" onClick={() => setAberto(aberto === 'notificacoes' ? null : 'notificacoes')} className="relative grid size-11 place-items-center rounded-full border border-line text-acc hover:border-acc/70 hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acc"><Bell aria-hidden="true" className="size-5" strokeWidth={1.75} />{naoLidas > 0 && <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-red-400 text-[10px] font-bold text-bg">{naoLidas}</span>}</button>
      <button ref={perfilBotao} type="button" aria-label="Abrir menu do perfil" aria-expanded={aberto === 'perfil'} aria-controls="menu-perfil" onClick={() => { setAberto(aberto === 'perfil' ? null : 'perfil'); setDica('') }} className="flex min-h-11 items-center gap-3 rounded-full border border-line px-2 py-1 hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acc"><span className="hidden max-w-36 truncate pl-2 text-sm sm:inline">Olá, {perfil.nome}!</span><span className="grid size-10 place-items-center rounded-full bg-acc font-extrabold text-bg">{perfil.nome.charAt(0).toUpperCase()}</span><ChevronDown aria-hidden="true" className={`hidden size-4 text-muted sm:block ${aberto === 'perfil' ? 'rotate-180' : ''}`} /></button>
      {aberto === 'notificacoes' && <div id="painel-notificacoes" className="absolute top-full right-4 left-4 mt-2 md:left-auto md:w-[380px]"><Notifications lidas={lidas} onRead={onRead} onReadAll={onReadAll} onNavigate={() => setAberto(null)} /></div>}
      {aberto === 'perfil' && <div id="menu-perfil" className="absolute top-full right-4 mt-2 w-64 rounded-2xl border border-line bg-soft p-2 text-sm font-normal shadow-xl"><div className="border-b border-line p-3"><p className="font-bold">{perfil.nome}</p><p className="mt-1 text-xs text-muted">{perfil.turma} · {perfil.escola}</p></div><a href="#/painel" onClick={() => setAberto(null)} className="profile-item"><User className="size-4" aria-hidden="true" />Meu perfil</a><button type="button" className="profile-item w-full" onClick={() => setDica('Para obter ajuda com seu acesso ou com as aulas, fale com o professor da sua turma.')}><HelpCircle className="size-4" aria-hidden="true" />Ajuda</button>{dica && <p role="status" className="p-3 text-xs leading-relaxed text-muted">{dica}</p>}<a href="#/login" onClick={() => setAberto(null)} className="profile-item mt-2 border-t border-line text-red-400"><LogOut className="size-4" aria-hidden="true" />Sair</a></div>}
    </div>
  </header>
}
