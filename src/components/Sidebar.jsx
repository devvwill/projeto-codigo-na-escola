import Navigation from './Navigation'

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen h-dvh flex-col gap-1 overflow-y-auto border-r border-line bg-side px-4 py-7 md:flex">
      <div className="flex items-center gap-2.5 pb-7 font-extrabold">
        <span className="grid size-7 place-items-center rounded-lg bg-linear-to-br from-acc to-sec text-[10px] font-extrabold text-bg">
          {'</>'}
        </span>
        Código na Escola
      </div>

      <Navigation />
    </aside>
  )
}
