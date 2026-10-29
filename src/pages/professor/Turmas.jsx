import { ProfessorIcon, Progresso, Situacao, normalizar } from '../../components/professor/ProfessorUI'

export function AtividadesTable({ turmas }) {
  return <div className="overflow-x-auto rounded-2xl border border-line px-5 pb-6">
    <table className="teacher-table w-full min-w-[620px] text-left text-sm">
      <thead><tr>{['Atividade', 'Turma', 'Entregas', 'Prazo', ''].map((titulo, i) => <th key={i} scope="col" className="py-3 text-sm font-bold text-muted">{titulo || <span className="sr-only">Ações</span>}</th>)}</tr></thead>
      <tbody>{turmas.map(turma => <tr key={turma.id} className="border-t border-line text-muted"><td className="py-4 pr-4 font-bold text-ink">{turma.atividade.titulo}</td><td>{turma.nome}</td><td>{turma.atividade.entregas} de {turma.quantidade}</td><td>{turma.atividade.prazo}</td><td className="w-11"><a href={`#/professor/correcao/${turma.id}`} className="grid size-11 place-items-center rounded-lg hover:bg-soft focus-visible:outline-2 focus-visible:outline-acc" aria-label={`Corrigir ${turma.atividade.titulo}, turma ${turma.nome}`}><ProfessorIcon nome="editar" /></a></td></tr>)}</tbody>
    </table>
    {!turmas.length && <p role="status" className="py-8 text-center text-sm text-muted">Nenhuma atividade encontrada.</p>}
  </div>
}
export default function Turmas({ turmas, busca = '', atividades = false }) {
  const termo = normalizar(busca.trim())
  const visiveis = turmas.filter(t => normalizar(`${t.nome} ${t.turno} ${t.atividade.titulo} ${t.alunosBusca || ''}`).includes(termo))
  return <div>
    <h1 className="page-title">{atividades ? 'Atividades' : 'Minhas turmas'}</h1>
    <p className="mt-8 mb-5 text-sm text-sec">Você vê apenas as turmas pelas quais é responsável.</p>
    {busca && <p role="status" className="mb-4 text-sm text-muted">{visiveis.length} {visiveis.length === 1 ? 'turma encontrada' : 'turmas encontradas'}.</p>}
    {!atividades && <div className="mb-4 grid gap-5 lg:grid-cols-3">
      {visiveis.map(turma => <section key={turma.id} aria-labelledby={`titulo-${turma.id}`} className="flex min-w-0 flex-col rounded-2xl border border-line p-6">
        <h2 id={`titulo-${turma.id}`} className="card-title">{turma.nome} · {turma.turno}</h2><p className="mt-2 text-sm text-muted">{turma.quantidade} alunos</p>
        <div className="mt-7 mb-2 flex items-center justify-between text-sm"><span className="text-muted">Progresso médio</span><span>{turma.progresso}%</span></div>
        <Progresso valor={turma.progresso} />
        <div className="mt-5 mb-3"><Situacao tipo={turma.atencao ? 'Atenção' : 'Em dia'}>{turma.atencao ? `${turma.atencao} precisam de atenção` : 'Tudo em dia'}</Situacao></div>
        <a href={`#/professor/turma/${turma.id}`} className="outline-button mt-auto block text-center">Abrir turma</a>
      </section>)}
      {!visiveis.length && <p className="rounded-2xl border border-line p-6 text-sm text-muted lg:col-span-3">{turmas.length ? 'Nenhuma turma encontrada. Tente outra busca.' : 'Você ainda não tem turmas atribuídas.'}</p>}
    </div>}
    <h2 className="mb-5 section-title">Atividades para corrigir</h2>
    <AtividadesTable turmas={visiveis} />
  </div>
}
