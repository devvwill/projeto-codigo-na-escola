export function ProfessorIcon({ nome, className = '' }) {
  return <span aria-hidden="true" className={`inline-flex shrink-0 items-center justify-center ${className}`}><img src={`/images/professor/${nome}.svg`} alt="" /></span>
}

export function Situacao({ children, tipo = 'Em dia' }) {
  const cor = tipo === 'Em dia' ? 'bg-hi/15 text-hi' : tipo === 'Atrasado' ? 'bg-red-400/15 text-red-400' : 'bg-amber-400/15 text-amber-400'
  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${cor}`}>{children || tipo}</span>
}

export function Progresso({ valor, className = '', label = 'Progresso médio' }) {
  return <div role="progressbar" aria-label={label} aria-valuenow={valor} aria-valuemin={0} aria-valuemax={100} className={`h-2 overflow-hidden rounded-full bg-line ${className}`}><div className={`h-full rounded-full ${valor >= 70 ? 'bg-hi' : valor < 40 ? 'bg-amber-400' : 'bg-linear-to-r from-acc to-sec'}`} style={{ width: `${valor}%` }} /></div>
}

export function Carregamento({ carregando, erro, recarregar }) {
  if (erro) return <div role="alert" className="rounded-2xl border border-line bg-soft p-6"><p>{erro}</p><button type="button" onClick={recarregar} className="outline-button mt-4">Tentar novamente</button></div>
  if (carregando) return <p role="status" className="py-8 text-sm text-muted">Carregando dados do professor…</p>
  return null
}

export const normalizar = texto => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR')
