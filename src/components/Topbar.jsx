import { Bell, Search } from 'lucide-react'

export default function Topbar() {
  return (
    <header className="flex items-center gap-4 border-b border-line px-4 py-4 md:px-8">
      <label className="relative min-w-0 max-w-lg flex-1">
        <span className="sr-only">Buscar aulas e materiais</span>
        <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          placeholder="Buscar aulas e materiais"
          className="w-full rounded-full border border-line bg-soft py-2.5 pr-5 pl-11 text-sm placeholder:text-muted hover:border-muted/50 focus:outline-2 focus:outline-acc motion-safe:transition-colors motion-safe:duration-150"
        />
      </label>

      <div className="ml-auto flex shrink-0 items-center gap-3 font-bold">
        <button
          type="button"
          aria-label="Notificações"
          className="ui-button grid size-10 place-items-center rounded-full border border-line text-acc hover:border-acc/70 hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acc"
        >
          <Bell className="size-5" strokeWidth={1.75} />
        </button>
        <span className="hidden sm:inline">Olá, Will!</span>
        <div className="grid size-10 place-items-center rounded-full bg-acc font-extrabold text-bg">
          W
        </div>
      </div>
    </header>
  )
}
