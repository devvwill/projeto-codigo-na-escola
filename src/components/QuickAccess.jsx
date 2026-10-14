import { Bookmark, CirclePlay, LayoutGrid, Star } from 'lucide-react'

const shortcutClassName =
  'interactive-surface inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line px-3 py-2 text-sm font-bold hover:border-acc/60 hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acc'

export default function QuickAccess() {
  return (
    <div role="group" aria-label="Acesso rápido" className="mt-4 flex flex-wrap items-center gap-2">
      <span className="mr-1 hidden text-sm text-muted lg:inline">Acesso rápido</span>
      <button type="button" className={shortcutClassName}>
        <LayoutGrid aria-hidden="true" className="size-4 text-acc" />
        Materiais
      </button>
      <button type="button" className={shortcutClassName}>
        <Bookmark aria-hidden="true" className="size-4 text-acc" />
        Trilhas
      </button>

      <button type="button" className={shortcutClassName}>
        <CirclePlay aria-hidden="true" className="size-4 text-acc" />
        Últimas aulas
      </button>
      <button type="button" className={shortcutClassName}>
        <Star aria-hidden="true" className="size-4 text-hi" />
        Favoritos
      </button>
    </div>
  )
}
