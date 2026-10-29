import { useEffect, useState } from 'react'
import Login from '../Login'
import ProfessorLayout from '../../components/professor/ProfessorLayout'
import { Carregamento, normalizar } from '../../components/professor/ProfessorUI'
import { useProfessorData } from '../../hooks/useProfessor'
import { professorExemplo } from '../../data/professor'
import Turmas from './Turmas'
import Turma from './Turma'

function Resumo({ pagina, busca }) {
  const estado = useProfessorData()
  if (!estado.dados) return <Carregamento {...estado} />
  const turmas = estado.dados.turmas
  if (pagina === 'relatorios') return <>
    <h1 className="page-title">Relatórios</h1><p className="mt-4 mb-6 text-sm text-muted">Acompanhe suas turmas. Abra uma turma para exportar os alunos em CSV.</p>
    <div className="grid gap-4 lg:grid-cols-3">{turmas.filter(t => normalizar(`${t.nome} ${t.turno}`).includes(normalizar(busca.trim()))).map(t => <section key={t.id} className="rounded-2xl border border-line p-6"><h2 className="card-title">{t.nome} · {t.turno}</h2><p className="mt-4 metric-value text-acc">{t.progresso}%</p><p className="mt-2 text-sm text-muted">Progresso médio · {t.quantidade} alunos</p><a href={`#/professor/turma/${t.id}`} className="outline-button mt-5 inline-block">Ver alunos e exportar</a></section>)}</div>
  </>
  return <Turmas turmas={turmas} busca={busca} atividades={pagina === 'atividades'} />
}
export default function ProfessorArea({ caminho }) {
  const [busca, setBusca] = useState('')
  const usuario = professorExemplo
  useEffect(() => {
    setBusca('')
    window.scrollTo(0, 0)
    document.getElementById('conteudo-professor')?.focus({ preventScroll: true })
  }, [caminho])
  if (caminho === '#/professor/entrar') return <Login professor />
  const partes = caminho.split('/')
  const pagina = ['turma', 'correcao', 'entrar'].includes(partes[2]) ? 'turmas' : partes[2] || 'turmas'
  function sair() { window.location.hash = '#/professor/entrar' }
  return <ProfessorLayout buscaPlaceholder={['turma', 'correcao'].includes(partes[2]) ? 'Buscar alunos' : undefined} usuario={usuario} pagina={pagina} busca={busca} setBusca={setBusca} sair={sair}>
      {['turma', 'correcao'].includes(partes[2]) ? <Turma key={partes[3]} id={partes[3]} busca={busca} corrigindo={partes[2] === 'correcao'} /> : pagina === 'materiais' ? <><h1 className="page-title">Materiais</h1><div className="mt-6 rounded-2xl border border-line p-8"><h2 className="section-title">Nenhum material cadastrado</h2><p className="mt-3 text-sm text-muted">Os materiais das suas turmas aparecerão aqui quando forem adicionados.</p></div></> : ['turmas', 'atividades', 'relatorios'].includes(pagina) ? <Resumo pagina={pagina} busca={busca} /> : <div className="py-8"><h1 className="page-title">Página não encontrada</h1><a href="#/professor/turmas" className="outline-button mt-5 inline-block">Minhas turmas</a></div>}
  </ProfessorLayout>
}
