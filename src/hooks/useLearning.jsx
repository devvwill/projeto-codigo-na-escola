import { createContext, useContext, useState } from 'react'
import { aulas } from '../data/aulas'

const LearningContext = createContext(null)
function ler(chave, inicial) {
  try { return JSON.parse(localStorage.getItem(chave)) ?? inicial } catch { return inicial }
}
export function LearningProvider({ children }) {
  const [concluidas, setConcluidas] = useState(() => {
    const dados = ler('codigo-concluidas', ['algoritmo'])
    return (Array.isArray(dados) ? dados : ['algoritmo']).filter(id => aulas.some(a => a.id === id))
  })
  const [perfil, setPerfil] = useState(() => {
    const padrao = { nome: 'Will', turma: '3º ano B', escola: 'Escola Estadual' }
    const dados = ler('codigo-perfil', padrao)
    return Object.fromEntries(Object.entries(padrao).map(([chave, valor]) => [chave, typeof dados?.[chave] === 'string' && dados[chave].trim() ? dados[chave] : valor]))
  })
  function concluir(id) {
    setConcluidas(anteriores => {
      const proximas = [...new Set([...anteriores, id])]
      try { localStorage.setItem('codigo-concluidas', JSON.stringify(proximas)) } catch { /* A sessão continua sem armazenamento. */ }
      return proximas
    })
  }
  function salvarPerfil(novo) {
    setPerfil(novo)
    try { localStorage.setItem('codigo-perfil', JSON.stringify(novo)) } catch { /* A sessão continua sem armazenamento. */ }
  }
  return <LearningContext.Provider value={{ concluidas, concluir, perfil, salvarPerfil }}>{children}</LearningContext.Provider>
}
export const useLearning = () => useContext(LearningContext)
