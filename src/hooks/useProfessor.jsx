import { useEffect, useState } from 'react'
import { criarTurmasExemplo } from '../data/professor'

const CHAVE_CORRECOES = 'codigo-professor-correcoes-demo'

function lerCorrecoes() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_CORRECOES))
    return dados && typeof dados === 'object' && !Array.isArray(dados) ? dados : {}
  } catch { return {} }
}
function turmasExemplo() {
  const correcoes = lerCorrecoes()
  return criarTurmasExemplo().map(turma => {
    const id = turma.slug
    for (const resposta of turma.atividade.respostas) {
      const correcao = correcoes[`${id}/${resposta.alunoId}`]
      if (typeof correcao?.nota === 'number' && correcao.nota >= 0 && correcao.nota <= 10 && typeof correcao.comentario === 'string') Object.assign(resposta, correcao)
    }
    return { ...turma, id, alunosBusca: turma.alunos.map(a => `${a.nome} ${a.matricula}`).join(' ') }
  })
}
export async function salvarCorrecaoExemplo(id, alunoId, nota, comentario) {
  const turma = turmasExemplo().find(t => t.id === id)
  if (!turma?.atividade.respostas.some(r => r.alunoId === alunoId)) throw new Error('Entrega de exemplo não encontrada.')
  if (!Number.isFinite(nota) || nota < 0 || nota > 10) throw new Error('Informe uma nota entre 0 e 10.')
  try { localStorage.setItem(CHAVE_CORRECOES, JSON.stringify({ ...lerCorrecoes(), [`${id}/${alunoId}`]: { nota, comentario: comentario.trim() } })) }
  catch { throw new Error('Não foi possível salvar a demonstração neste navegador.') }
}
export function useProfessorData(id) {
  const [versao, setVersao] = useState(0)
  const [estado, setEstado] = useState({ carregando: true, dados: null, erro: '' })
  useEffect(() => {
    const turmas = turmasExemplo()
    const turma = id ? turmas.find(t => t.id === id) : null
    setEstado(id && !turma
      ? { carregando: false, dados: null, erro: 'Turma de exemplo não encontrada.' }
      : { carregando: false, dados: id ? { turma } : { turmas }, erro: '' })
  }, [id, versao])
  return { ...estado, recarregar: () => setVersao(v => v + 1) }
}
