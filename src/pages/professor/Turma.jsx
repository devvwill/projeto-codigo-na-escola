import { useEffect, useState } from 'react'
import Button from '../../components/Button'
import { Carregamento, Progresso, Situacao, normalizar } from '../../components/professor/ProfessorUI'
import { salvarCorrecaoExemplo, useProfessorData } from '../../hooks/useProfessor'

function exportarCSV(turma, alunos) {
  const celula = valor => `"${String(valor).replace(/^[=+@\-\t\r]/, "'$&").replaceAll('"', '""')}"`
  const linhas = [['Aluno', 'Matrícula', 'Turma', 'Progresso (%)', 'Exercícios', 'Último acesso', 'Situação'], ...alunos.map(a => [a.nome, a.matricula, turma.nome, a.progresso, `${a.exercicios} de 8`, a.acesso, a.situacao])]
  const blob = new Blob(['\uFEFF', linhas.map(l => l.map(celula).join(';')).join('\r\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `turma-${turma.slug}.csv`
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
function Correcao({ turma, recarregar }) {
  const [alunoId, setAlunoId] = useState(turma.atividade.respostas[0]?.alunoId || '')
  const [nota, setNota] = useState('')
  const [comentario, setComentario] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [aviso, setAviso] = useState('')
  const resposta = turma.atividade.respostas.find(r => r.alunoId === alunoId)
  useEffect(() => { setNota(resposta?.nota ?? ''); setComentario(resposta?.comentario || ''); setAviso('') }, [resposta])
  async function salvar(event) {
    event.preventDefault()
    setSalvando(true)
    setAviso('')
    try {
      await salvarCorrecaoExemplo(turma.id, alunoId, Number(nota), comentario)
      setAviso('Correção de demonstração salva neste navegador.')
    } catch (erro) {
      setAviso(erro.message)
    } finally { setSalvando(false) }
  }
  return <section aria-labelledby="correcao-titulo" className="mt-5 rounded-2xl border border-line p-5 sm:p-6">
    <h2 id="correcao-titulo" className="section-title">{turma.atividade.titulo}</h2>
    <p className="mt-2 text-sm leading-6 text-muted">{turma.atividade.enunciado}</p>
    {!resposta ? <p className="mt-6 text-muted">Nenhuma entrega disponível.</p> : <form onSubmit={salvar} className="mt-5 grid gap-5 lg:grid-cols-2">
      <div><label className="block text-sm font-bold" htmlFor="entrega-aluno">Entrega do aluno</label><select id="entrega-aluno" value={alunoId} onChange={e => setAlunoId(e.target.value)} className="teacher-input mt-2">{turma.atividade.respostas.map(r => <option key={r.alunoId} value={r.alunoId}>{turma.alunos.find(a => a.id === r.alunoId)?.nome} {r.nota !== null ? '(corrigida)' : ''}</option>)}</select><pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl border border-line bg-side p-4 text-sm leading-6 text-ink">{resposta.resposta}</pre><p className="mt-3 text-xs text-muted">As respostas e os alunos são exemplos fictícios para testar a correção.</p></div>
      <div className="flex flex-col gap-4"><label className="text-sm font-bold">Nota (0 a 10)<input type="number" min="0" max="10" step="0.1" required value={nota} onChange={e => setNota(e.target.value)} className="teacher-input mt-2" /></label><label className="text-sm font-bold">Comentário para o aluno<textarea rows={4} maxLength={2000} value={comentario} onChange={e => setComentario(e.target.value)} className="teacher-input mt-2 resize-y" /></label><div className="flex flex-wrap gap-3"><Button type="submit" disabled={salvando}>{salvando ? 'Salvando…' : 'Salvar correção'}</Button><button type="button" className="outline-button" onClick={recarregar}>Atualizar entregas</button></div><p role="status" className="text-sm text-muted">{aviso}</p></div>
    </form>}
  </section>
}
export default function Turma({ id, busca = '', corrigindo = false }) {
  const estado = useProfessorData(id)
  if (!estado.dados) return <Carregamento {...estado} />
  const turma = estado.dados.turma
  const alunos = turma.alunos.filter(a => normalizar(`${a.nome} ${a.matricula}`).includes(normalizar(busca.trim())))
  return <div>
    <h1 className="page-title">{turma.nome} · {turma.turno}</h1>
    <a href="#/professor/turmas" className="mt-6 mb-5 inline-flex min-h-11 items-center rounded-md text-sm font-bold text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-acc">← Minhas turmas</a>
    <div className="mb-5 grid gap-5 sm:grid-cols-3">{[['Alunos', turma.quantidade, `Turma ${turma.nome} · ${turma.turno}`, 'text-ink'], ['Progresso médio', `${turma.progresso}%`, 'Meta da trilha: 70%', 'text-acc'], ['Entregas pendentes', turma.pendentes, turma.atividade.titulo.split(' · ')[0], 'text-amber-400']].map(([titulo, valor, legenda, cor]) => <section key={titulo} className="rounded-2xl border border-line p-5"><h2 className="text-sm text-muted">{titulo}</h2><p className={`mt-1 metric-value ${cor}`}>{valor}</p><p className="mt-1 text-sm text-muted">{legenda}</p></section>)}</div>
    {!corrigindo && <section aria-labelledby="alunos-titulo" className="rounded-2xl border border-line px-5 pb-5">
      <header className="flex flex-wrap items-center justify-between gap-3 py-3"><h2 id="alunos-titulo" className="section-title">Alunos da turma</h2><button type="button" disabled={!alunos.length} onClick={() => exportarCSV(turma, alunos)} className="outline-button min-w-36 disabled:opacity-50">Exportar</button></header>
      <div className="overflow-x-auto"><table className="teacher-table w-full min-w-[720px] text-left text-sm"><thead><tr>{['Aluno', 'Progresso', 'Exercícios', 'Último acesso', 'Situação'].map(titulo => <th scope="col" key={titulo} className="pb-4 text-sm font-bold text-muted">{titulo}</th>)}</tr></thead><tbody>{alunos.map(aluno => <tr key={aluno.id} className="border-t border-line"><td className="py-4 pr-4"><span className="flex items-center gap-3"><span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-linear-to-br from-acc to-sec text-xs font-bold text-bg">{aluno.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}</span><span className="text-base font-bold sm:text-lg">{aluno.nome}</span></span></td><td className="pr-6"><span className="flex items-center gap-3"><Progresso valor={aluno.progresso} label={`Progresso de ${aluno.nome}`} className="w-28" /><span className="text-sm text-muted">{aluno.progresso}%</span></span></td><td className="text-muted">{aluno.exercicios} de 8</td><td className="text-muted">{aluno.acesso}</td><td><Situacao tipo={aluno.situacao} /></td></tr>)}</tbody></table></div>
      {!alunos.length && <p role="status" className="py-8 text-center text-sm text-muted">Nenhum aluno encontrado.</p>}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-muted">{alunos.length} {alunos.length === 1 ? 'aluno de exemplo exibido' : 'alunos de exemplo exibidos'}. Os totais são demonstrativos.</p><a href={`#/professor/correcao/${turma.id}`} className="outline-button">Corrigir atividade</a></div>
    </section>}
    {corrigindo && <Correcao turma={turma} recarregar={estado.recarregar} />}
  </div>
}
