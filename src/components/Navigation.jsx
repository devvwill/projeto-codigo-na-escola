function NavItem({ children, active = false, onNavigate }) {
  return (
    <a
      href={active ? '#conteudo-principal' : '#'}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={`min-h-11 rounded-xl px-3.5 py-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acc motion-safe:transition-colors motion-safe:duration-150 ${
        active ? 'bg-tag font-bold text-acc' : 'font-medium text-muted hover:bg-soft hover:text-ink'
      }`}
    >
      {children}
    </a>
  )
}

export default function Navigation({ onNavigate }) {
  return (
    <nav aria-label="Menu principal" className="flex flex-1 flex-col gap-1">
      <NavItem active onNavigate={onNavigate}>Início</NavItem>
      <NavItem onNavigate={onNavigate}>Aulas</NavItem>
      <NavItem onNavigate={onNavigate}>Materiais</NavItem>

      <div className="mt-auto flex flex-col gap-1 pt-8">
        <NavItem onNavigate={onNavigate}>Ajuda</NavItem>
        <NavItem onNavigate={onNavigate}>Ajustes</NavItem>
      </div>
    </nav>
  )
}
