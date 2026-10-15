import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import Navigation from './Navigation'

export default function MobileMenu({ open, onClose, pagina }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const desktop = window.matchMedia('(min-width: 48rem)')

    function closeOnDesktop() {
      if (desktop.matches) onClose()
    }

    document.body.style.overflow = 'hidden'
    desktop.addEventListener('change', closeOnDesktop)
    closeOnDesktop()

    return () => {
      document.body.style.overflow = previousOverflow
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [open, onClose])

  return (
    <dialog
      ref={dialogRef}
      id="menu-celular"
      aria-labelledby="menu-celular-titulo"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="mobile-menu fixed inset-0 m-0 h-screen h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-ink backdrop:bg-black/60 backdrop:backdrop-blur-sm md:hidden"
    >
      <div className="mobile-menu-panel flex h-full w-[85vw] max-w-xs flex-col overflow-y-auto overscroll-contain border-r border-line bg-side px-4 py-5">
        <header className="mb-6 flex items-center justify-between gap-2">
          <h2 id="menu-celular-titulo" className="text-base font-extrabold">Código na Escola</h2>
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={onClose}
            className="grid size-11 shrink-0 place-items-center rounded-xl text-muted hover:bg-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-acc"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </header>
        <Navigation pagina={pagina} onNavigate={onClose} />
      </div>
    </dialog>
  )
}
