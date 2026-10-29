// Dados fictícios do Figma usados apenas para demonstrar as telas do professor.
export function criarTurmasExemplo() {
  const alunos = [
    { id: 'will', nome: 'Will Martins', matricula: '2026-0117', progresso: 20, exercicios: 1, acesso: 'Hoje', situacao: 'Em dia' },
    { id: 'bruno', nome: 'Bruno Lima', matricula: '2026-0121', progresso: 72, exercicios: 5, acesso: 'Ontem', situacao: 'Em dia' },
    { id: 'carla', nome: 'Carla Dias', matricula: '2026-0133', progresso: 35, exercicios: 2, acesso: 'Há 5 dias', situacao: 'Atenção' },
    { id: 'diego', nome: 'Diego Alves', matricula: '2026-0140', progresso: 18, exercicios: 1, acesso: 'Há 9 dias', situacao: 'Atrasado' },
    { id: 'elisa', nome: 'Elisa Rocha', matricula: '2026-0152', progresso: 66, exercicios: 4, acesso: 'Hoje', situacao: 'Em dia' },
  ]
  return [
    { slug: '3b', nome: '3º B', turno: 'Manhã', quantidade: 28, progresso: 62, atencao: 3, pendentes: 9, alunos,
      atividade: { titulo: 'Exercício 1 · Decida se pode entrar', prazo: 'Sexta', entregas: 9, enunciado: 'Use uma variável idade e uma condição para verificar se uma pessoa com 18 anos ou mais pode entrar no evento.', respostas: [
        { alunoId: 'will', resposta: 'idade = 18\nse idade >= 18 então\n  escreva("Pode entrar")\nsenão\n  escreva("Não pode entrar")', nota: null, comentario: '' },
        { alunoId: 'bruno', resposta: 'idade = 20\nse idade >= 18 então\n  escreva("Entrada permitida")', nota: null, comentario: '' },
      ] } },
    { slug: '2a', nome: '2º A', turno: 'Tarde', quantidade: 31, progresso: 48, atencao: 5, pendentes: 12,
      alunos: [{ id: 'felipe', nome: 'Felipe Nunes', matricula: '2026-0160', progresso: 54, exercicios: 4, acesso: 'Hoje', situacao: 'Em dia' }],
      atividade: { titulo: 'Exercício 2 · Operadores lógicos', prazo: 'Quinta', entregas: 12, enunciado: 'Escreva uma condição que verifique se a pessoa tem ingresso e está na idade permitida.', respostas: [{ alunoId: 'felipe', resposta: 'se temIngresso e idade >= 18 então\n  escreva("Pode entrar")', nota: null, comentario: '' }] } },
    { slug: '1c', nome: '1º C', turno: 'Manhã', quantidade: 24, progresso: 81, atencao: 0, pendentes: 4,
      alunos: [{ id: 'ana', nome: 'Ana Souza', matricula: '2026-0170', progresso: 81, exercicios: 6, acesso: 'Hoje', situacao: 'Em dia' }],
      atividade: { titulo: 'Exercício 1 · Minha primeira página', prazo: 'Dia 30', entregas: 4, enunciado: 'Crie uma página HTML com um título e um parágrafo de apresentação.', respostas: [{ alunoId: 'ana', resposta: '<h1>Minha primeira página</h1>\n<p>Olá! Estou aprendendo HTML.</p>', nota: null, comentario: '' }] } },
  ]
}

export const professorExemplo = { nome: 'Carlos', email: 'professor@exemplo.test' }
