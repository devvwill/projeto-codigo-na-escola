export const modulos = ['Lógica', 'HTML', 'CSS', 'JavaScript']
export const estados = {
  naoIniciada: { texto: 'Não iniciada', acao: 'Começar' },
  emAndamento: { texto: 'Em andamento', acao: 'Continuar' },
  concluida: { texto: 'Concluída', acao: 'Rever' },
}
export const aulas = [
  { id: 'algoritmo', modulo: 'Lógica', titulo: 'O que é um algoritmo?', minutos: 12, estado: 'concluida', progresso: 100 },
  { id: 'variaveis', modulo: 'Lógica', titulo: 'Variáveis e condições', minutos: 15, estado: 'emAndamento', progresso: 40 },
  { id: 'pagina', modulo: 'HTML', titulo: 'Sua primeira página', minutos: 18, estado: 'naoIniciada', progresso: 0 },
  { id: 'listas', modulo: 'HTML', titulo: 'Listas, links e imagens', minutos: 20, estado: 'naoIniciada', progresso: 0 },
  { id: 'cores', modulo: 'CSS', titulo: 'Cores e tipografia', minutos: 22, estado: 'naoIniciada', progresso: 0 },
  { id: 'flexbox', modulo: 'CSS', titulo: 'Layout com Flexbox', minutos: 25, estado: 'naoIniciada', progresso: 0 },
  { id: 'comandos', modulo: 'JavaScript', titulo: 'Primeiros comandos', minutos: 20, estado: 'naoIniciada', progresso: 0 },
  { id: 'eventos', modulo: 'JavaScript', titulo: 'Eventos e botões', minutos: 24, estado: 'naoIniciada', progresso: 0 },
]
