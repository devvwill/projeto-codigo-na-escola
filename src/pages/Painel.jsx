import { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import DesignIcon from '../components/DesignIcon'
import { useLearning } from '../hooks/useLearning'
import { aulas, modulos } from '../data/aulas'

const semana = [25, 40, 18, 32, 20, 0, 0]
const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
const conquistas = [
  ['Primeira aula', 'Concluída', 'first-lesson'],
  ['5 dias seguidos', 'Concluída', 'achievement-streak'],
  ['Primeira página', 'Conclua o módulo de HTML', 'locked'],
  ['Lógica completa', 'Conclua as aulas de Lógica', 'locked'],
  ['Primeiro script', 'Conclua a aula de JavaScript', 'locked'],
  ['Missão cumprida', 'Faça uma missão do dia', 'locked'],
]
export default function Painel() {
  const { perfil, salvarPerfil, concluidas } = useLearning()
  const [editando, setEditando] = useState(false)
  const [salvo, setSalvo] = useState(false)
  const numeros = [[`${concluidas.length} de ${aulas.length}`, 'aulas concluídas', 'complete'], ['5 dias', 'de sequência', 'streak'], ['120 XP', 'acumulados', 'xp'], ['2 h 15 min', 'de estudo na semana', 'clock']]
  return <div className="entrada-suave">
    <section aria-label="Resumo do aluno" className="flex flex-wrap items-center gap-5 rounded-2xl border border-line p-6 sm:gap-8 sm:p-8">
      <span className="grid size-[72px] shrink-0 place-items-center rounded-full bg-acc text-3xl font-bold text-bg">{perfil.nome.charAt(0).toUpperCase()}</span>
      <div className="min-w-0 flex-1">
        <h1 className="text-[28px] font-extrabold break-words">{perfil.nome}</h1>
        <p className="mt-1 text-sm text-muted">{perfil.turma} · {perfil.escola}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm"><b>Nível 4</b><div role="progressbar" aria-label="Experiência do nível" aria-valuenow={120} aria-valuemin={0} aria-valuemax={200} className="h-1.5 w-52 max-w-full rounded-full bg-line"><div className="h-full w-3/5 rounded-full bg-linear-to-r from-acc to-sec" /></div><span className="text-xs text-muted">120 de 200 XP</span></div>
      </div>
      <button type="button" className="outline-button" onClick={() => { setEditando(!editando); setSalvo(false) }} aria-expanded={editando} aria-controls="editar-perfil">{editando ? 'Cancelar' : 'Editar perfil'}</button>
    </section>
    {editando && <form id="editar-perfil" className="mt-4 grid gap-4 rounded-2xl border border-line bg-soft p-6 sm:grid-cols-3" onSubmit={event => { event.preventDefault(); const dados = new FormData(event.currentTarget); salvarPerfil(Object.fromEntries(['nome', 'turma', 'escola'].map(k => [k, dados.get(k).trim()]))); setEditando(false); setSalvo(true) }}>
      {['nome', 'turma', 'escola'].map(campo => <label key={campo} className="text-sm font-bold capitalize">{campo}<input name={campo} defaultValue={perfil[campo]} required maxLength={80} pattern=".*\S.*" className="mt-2 w-full rounded-xl border border-line bg-bg p-3 font-normal focus:outline-2 focus:outline-acc" /></label>)}<Button type="submit">Salvar perfil</Button>
    </form>}
    <p role="status" className="mt-2 text-sm text-hi">{salvo ? 'Perfil salvo neste navegador.' : ''}</p>
    <div className="my-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{numeros.map(([valor, legenda, icone]) => <div key={legenda} className="flex items-center gap-4 rounded-2xl border border-line p-4"><DesignIcon nome={icone} className="size-10 rounded-xl bg-tag" /><div><p className="metric-value">{valor}</p><p className="mt-1 text-sm text-muted">{legenda}</p></div></div>)}</div>
    <div className="grid gap-4 lg:grid-cols-2">
      <Card titulo="Progresso por trilha">{modulos.map(modulo => { const lista = aulas.filter(a => a.modulo === modulo); const total = lista.filter(a => concluidas.includes(a.id)).length; return <a href="#/aulas" key={modulo} className="rounded-md border-b border-line py-3 last:border-0 focus-visible:outline-2 focus-visible:outline-acc"><div className="mb-3 flex justify-between gap-3 text-sm"><b>{modulo}</b><span className="text-muted">{total} de {lista.length} aulas</span></div><div role="progressbar" aria-label={modulo} aria-valuenow={total} aria-valuemin={0} aria-valuemax={lista.length} className="h-1.5 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-linear-to-r from-acc to-sec" style={{ width: `${total / lista.length * 100}%` }} /></div></a> })}</Card>
      <Card titulo="Estudo na semana"><p className="text-xs text-muted">Minutos por dia (exemplo)</p><div className="mt-auto flex h-52 items-end justify-between gap-3 pt-8">{semana.map((min, i) => <div key={dias[i]} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"><span className="text-xs text-muted">{min}</span><div aria-label={`${dias[i]}: ${min} minutos`} className={`w-full max-w-9 rounded-t-lg ${min ? 'bg-linear-to-b from-acc to-sec' : 'bg-line'}`} style={{ height: min ? `${min / 40 * 130}px` : '3px' }} /><span className="text-xs text-muted">{dias[i][0]}</span></div>)}</div></Card>
    </div>
    <section aria-labelledby="conquistas-titulo" className="mt-6 rounded-2xl border border-line p-5 sm:p-6"><div className="mb-7 flex justify-between"><h2 id="conquistas-titulo" className="font-bold">Conquistas</h2><span className="text-xs text-muted">2 de 6</span></div><ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">{conquistas.map(([titulo, texto, icone], i) => <li key={titulo} className={`flex items-center gap-3 ${i > 1 ? 'text-muted' : ''}`}><DesignIcon nome={icone} className={`size-12 rounded-full border ${i === 0 ? 'border-acc bg-acc/10' : i === 1 ? 'border-sec bg-sec/10' : 'border-line'}`} /><div><h3 className="text-sm font-bold">{titulo}</h3><p className="mt-1 text-xs text-muted">{texto}</p></div></li>)}</ul></section>
    <p className="mt-4 text-xs text-muted">Sequência, experiência, tempo de estudo e conquistas são exemplos do protótipo.</p>
  </div>
}
