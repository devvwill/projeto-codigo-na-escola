import { CheckCircle2, Circle, CircleDot, Star } from 'lucide-react'
import { estados } from '../data/aulas'

export const lessonControl = 'min-h-11 rounded-full px-5 font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acc motion-safe:transition-colors motion-safe:duration-150'

export function LessonAction({ aula, onOpen }) {
  return <button type="button" onClick={() => onOpen(aula)} aria-label={`${estados[aula.estado].acao} aula: ${aula.titulo}`} className={`${lessonControl} w-full border sm:w-36 sm:shrink-0 ${aula.estado === 'emAndamento' ? 'border-acc bg-acc text-bg hover:bg-acc/90' : 'border-acc/70 text-acc hover:bg-acc/10'}`}>{estados[aula.estado].acao}</button>
}

export default function LessonRow({ aula, favorito, onFavorite, onOpen }) {
  const Icon = aula.estado === 'concluida' ? CheckCircle2 : aula.estado === 'emAndamento' ? CircleDot : Circle
  return (
    <li className="grid min-w-0 grid-cols-[28px_minmax(0,1fr)_44px] items-center gap-x-3 gap-y-3 border-t border-line py-4 sm:grid-cols-[28px_minmax(0,1fr)_44px_144px] sm:gap-x-5">
      <Icon aria-hidden="true" className={`size-6 ${aula.estado === 'concluida' ? 'text-hi' : aula.estado === 'emAndamento' ? 'text-acc' : 'text-muted'}`} />
      <div className="min-w-0">
        <h3 className="font-bold leading-snug sm:text-lg">{aula.titulo}</h3>
        <p className="mt-1 text-sm text-muted">{aula.modulo} · {aula.minutos} min</p>
        <p className="mt-1 text-sm text-muted">{estados[aula.estado].texto}</p>
      </div>
      <button type="button" aria-pressed={favorito} aria-label={`${favorito ? 'Remover dos favoritos' : 'Favoritar aula'}: ${aula.titulo}`} onClick={() => onFavorite(aula.id)} className={`grid size-11 place-items-center rounded-full hover:bg-soft focus-visible:outline-2 focus-visible:outline-acc motion-safe:transition-colors ${favorito ? 'text-hi' : 'text-muted'}`}>
        <Star aria-hidden="true" className="size-5" fill={favorito ? 'currentColor' : 'none'} />
      </button>
      <div className="col-start-2 col-end-4 sm:col-auto"><LessonAction aula={aula} onOpen={onOpen} /></div>
    </li>
  )
}
