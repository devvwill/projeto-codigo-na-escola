import { Bell, Menu, Search } from 'lucide-react'

export default function Topbar({ menuOpen, onOpenMenu, pagina = 'inicio', busca, onBuscaChange }) {
  return (
    <header className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-4 md:flex-nowrap md:gap-4 md:px-8">
      <button
        type="button"
        aria-label="Abrir menu"
        aria-haspopup="dialog"
        aria-expanded={menuOpen}
        aria-controls="menu-celular"
        onClick={onOpenMenu}
        className="grid size-11 shrink-0 place-items-center rounded-xl border border-line text-ink hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acc md:hidden"
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>
      <span className="text-sm font-bold md:hidden">{pagina === 'aulas' ? 'Aulas' : 'Início'}</span>

      <label className="relative order-last min-w-0 basis-full md:order-none md:max-w-lg md:flex-1 md:basis-auto">
        <span className="sr-only">Buscar aulas e materiais</span>
        <Search aria-hidden="true" className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={busca}
          onChange={(event) => onBuscaChange?.(event.target.value)}
          placeholder="Buscar aulas e materiais"
          className="w-full rounded-full border border-line bg-soft py-2.5 pr-5 pl-11 text-base placeholder:text-muted hover:border-muted/50 focus:outline-2 focus:outline-acc md:text-sm motion-safe:transition-colors motion-safe:duration-150"
        />
      </label>

      <div className="ml-auto flex shrink-0 items-center gap-3 font-bold">
        <button
          type="button"
          aria-label="Notificações"
          className="ui-button grid size-11 place-items-center rounded-full border border-line text-acc hover:border-acc/70 hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acc"
        >
          <Bell aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </button>
        <span className="hidden sm:inline">Olá, Will!</span>
        <div className="grid size-10 place-items-center rounded-full bg-acc font-extrabold text-bg">
          W
        </div>
      </div>
    </header>
  )
}
