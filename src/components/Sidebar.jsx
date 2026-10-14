function NavItem({ children, active = false }) {
  return (
    <a
      href="#"
      aria-current={active ? 'page' : undefined}
      className={
        active
          ? 'rounded-xl bg-tag px-3.5 py-2.5 font-bold text-acc focus-visible:outline-2 focus-visible:outline-acc'
          : 'rounded-xl px-3.5 py-2.5 font-medium text-muted hover:bg-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-acc motion-safe:transition-colors motion-safe:duration-150'
      }
    >
      {children}
    </a>
  )
}

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen flex-col gap-1 border-r border-line bg-side px-4 py-7 md:flex">
      <div className="flex items-center gap-2.5 pb-7 font-extrabold">
        <span className="grid size-7 place-items-center rounded-lg bg-linear-to-br from-acc to-sec text-[10px] font-extrabold text-bg">
          {'</>'}
        </span>
        Código na Escola
      </div>

      <NavItem active>Início</NavItem>
      <NavItem>Aulas</NavItem>
      <NavItem>Materiais</NavItem>

      <div className="flex-1" />

      <NavItem>Ajuda</NavItem>
      <NavItem>Ajustes</NavItem>
    </aside>
  )
}
