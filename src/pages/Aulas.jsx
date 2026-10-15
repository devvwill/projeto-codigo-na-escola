import { useState } from 'react'
import { CirclePlay } from 'lucide-react'
import { aulas, modulos } from '../data/aulas'
import LessonRow, { LessonAction, lessonControl } from '../components/LessonRow'

const normalizar = (texto) => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR')

export default function Aulas({ busca = '' }) {
  const [categoria, setCategoria] = useState('Todas')
  const [status, setStatus] = useState('Todas')
  const [favoritos, setFavoritos] = useState(() => new Set(['pagina']))
  const [aviso, setAviso] = useState('')
  const atual = aulas.find((aula) => aula.estado === 'emAndamento')
  const concluidas = aulas.filter((aula) => aula.estado === 'concluida').length
  const visiveis = aulas.filter((aula) => (categoria === 'Todas' || aula.modulo === categoria) && (status === 'Todas' || aula.estado === status) && normalizar(`${aula.titulo} ${aula.modulo}`).includes(normalizar(busca.trim())))

  function favoritar(id) {
    setFavoritos((anteriores) => {
      const proximos = new Set(anteriores)
      if (proximos.has(id)) proximos.delete(id)
      else proximos.add(id)
      return proximos
    })
  }
  function abrir(aula) {
    setAviso(`“${aula.titulo}”: a reprodução da aula ainda não está disponível nesta demonstração.`)
  }

  return (
    <div className="aulas-page">
      <header className="aulas-entrada mb-5">
        <h1 className="text-3xl font-extrabold tracking-tight">Aulas</h1>
        <p className="mt-1 text-muted">{aulas.length} aulas · {concluidas} concluída</p>
      </header>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-2">
          {['Todas', ...modulos].map((nome) => <button key={nome} type="button" aria-pressed={categoria === nome} onClick={() => setCategoria(nome)} className={`${lessonControl} border text-sm ${categoria === nome ? 'border-acc bg-acc text-bg' : 'border-line text-muted hover:border-acc hover:text-ink'}`}>{nome}</button>)}
        </div>
        <label className="flex items-center gap-3 text-sm text-muted">
          Status
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="min-h-11 max-w-full rounded-full border border-line bg-bg px-4 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acc">
            <option value="Todas">Todas</option>
            <option value="naoIniciada">Não iniciadas</option>
            <option value="emAndamento">Em andamento</option>
            <option value="concluida">Concluídas</option>
          </select>
        </label>
      </div>

      <section aria-labelledby="aula-atual" className="aulas-entrada mb-7 grid min-w-0 items-center gap-5 rounded-2xl border border-line p-5 lg:grid-cols-[minmax(0,1fr)_minmax(180px,0.8fr)_144px] lg:p-6" style={{ '--aulas-atraso': '60ms' }}>
        <div className="flex min-w-0 items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-tag text-acc"><CirclePlay aria-hidden="true" className="size-6" /></span>
          <div className="min-w-0">
            <p className="text-sm text-muted">Aula em andamento</p>
            <h2 id="aula-atual" className="mt-1 text-xl font-bold">{atual.titulo}</h2>
            <p className="mt-1 text-sm text-muted">{atual.modulo} · {atual.minutos} min</p>
          </div>
        </div>
        <div>
          <div className="mb-2 flex justify-between gap-3 text-sm text-muted"><span id="progresso-aula">Progresso da aula</span><span>{atual.progresso}%</span></div>
          <div role="progressbar" aria-labelledby="progresso-aula" aria-valuemin={0} aria-valuemax={100} aria-valuenow={atual.progresso} className="h-1.5 overflow-hidden rounded-full bg-line">
            <div className="aula-progresso h-full rounded-full bg-linear-to-r from-acc to-sec" style={{ width: `${atual.progresso}%` }} />
          </div>
        </div>
        <LessonAction aula={atual} onOpen={abrir} />
      </section>

      <div role="status" aria-live="polite" aria-atomic="true" className="mb-4 text-sm text-muted">
        {aviso && <p className="mb-4 rounded-xl border border-line bg-soft p-4">{aviso}</p>}
        {(busca || categoria !== 'Todas' || status !== 'Todas') && <p>{visiveis.length} {visiveis.length === 1 ? 'aula encontrada' : 'aulas encontradas'}.</p>}
      </div>
      {visiveis.length === 0 && <p className="rounded-2xl border border-line p-6 text-muted">Nenhuma aula encontrada. Tente outra busca ou altere os filtros.</p>}
      {modulos.map((modulo) => {
        const lista = visiveis.filter((aula) => aula.modulo === modulo)
        const todas = aulas.filter((aula) => aula.modulo === modulo)
        return <section key={modulo} hidden={!lista.length} aria-labelledby={`modulo-${modulo}`} className="mb-6">
          <header className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 id={`modulo-${modulo}`} className="text-lg font-bold">{modulo}</h2>
            <p className="text-sm text-muted">{todas.filter((aula) => aula.estado === 'concluida').length} de {todas.length} aulas concluídas</p>
          </header>
          <ul>{lista.map((aula) => <LessonRow key={aula.id} aula={aula} favorito={favoritos.has(aula.id)} onFavorite={favoritar} onOpen={abrir} />)}</ul>
        </section>
      })}
    </div>
  )
}
