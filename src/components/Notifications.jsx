import { useState } from 'react'
import DesignIcon from './DesignIcon'
import { notificacoes } from '../data/notificacoes'

export default function Notifications({ lidas, onRead, onReadAll, completo = false, onNavigate }) {
  const [filtro, setFiltro] = useState('todas')
  const [aviso, setAviso] = useState('')
  const naoLidas = notificacoes.filter(n => n.nova && !lidas.includes(n.id))
  const lista = filtro === 'todas' ? notificacoes : naoLidas
  return <section aria-label="Notificações" className="overflow-hidden rounded-2xl border border-line bg-soft shadow-xl">
    <header className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-4"><h2 className="font-bold">Notificações</h2><button type="button" className="rounded-md py-2 text-xs font-bold text-acc focus-visible:outline-2 focus-visible:outline-acc disabled:opacity-50" disabled={!naoLidas.length} onClick={() => { onReadAll(); setAviso('Todas marcadas como lidas.') }}>Marcar todas como lidas</button></header>
    <div role="group" aria-label="Filtrar notificações" className="flex gap-2 px-5 py-3">{[['todas', 'Todas'], ['novas', `Não lidas · ${naoLidas.length}`]].map(([id, titulo]) => <button type="button" key={id} aria-pressed={filtro === id} onClick={() => setFiltro(id)} className={`min-h-9 rounded-full border px-4 text-xs focus-visible:outline-2 focus-visible:outline-acc ${filtro === id ? 'border-acc bg-acc font-bold text-bg' : 'border-line text-muted'}`}>{titulo}</button>)}</div>
    <p role="status" className="px-5 text-xs text-hi">{aviso}</p>
    <ul className="max-h-[55vh] overflow-y-auto p-2">{lista.map(n => { const nova = n.nova && !lidas.includes(n.id); return <li key={n.id}><button type="button" onClick={() => onRead(n.id)} aria-label={`${n.titulo}${nova ? ', não lida. Marcar como lida' : ', lida'}`} className={`flex w-full items-start gap-3 rounded-xl p-3 text-left hover:bg-tag focus-visible:outline-2 focus-visible:outline-acc ${nova ? 'bg-acc/10' : ''}`}><DesignIcon nome={n.icone} className={`size-10 rounded-full ${n.cor}`} /><span className="min-w-0 flex-1"><span className={`block text-sm font-bold ${nova ? 'text-ink' : 'text-muted'}`}>{n.titulo}</span><span className="mt-1 block text-xs text-muted">{n.descricao}</span><span className="mt-1 block text-xs text-muted">{n.tempo}</span></span>{nova && <span className="mt-1 size-2 shrink-0 rounded-full bg-acc" />}</button></li> })}</ul>
    {!lista.length && <div className="flex flex-col items-center px-6 py-10 text-center"><DesignIcon nome="empty" className="mb-4 size-14 rounded-full bg-tag" /><p className="font-bold">Nenhuma notificação</p><p className="mt-2 max-w-64 text-sm text-muted">Quando o professor postar um aviso, ele aparece aqui.</p></div>}
    {!completo && <a href="#/notificacoes" onClick={onNavigate} className="block border-t border-line p-4 text-center text-sm font-bold text-acc hover:bg-tag focus-visible:outline-2 focus-visible:outline-acc">Ver todas as notificações</a>}
  </section>
}
