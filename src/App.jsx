import { useCallback, useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import MobileMenu from './components/MobileMenu'
import Inicio from './pages/Inicio'
import Login from './pages/Login'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const mostrarLogin = false

  if (mostrarLogin) {
    return <Login />
  }

  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr]">
      <Sidebar />

      <div className="flex min-w-0 flex-col">
        <Topbar menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />

        <main id="conteudo-principal" tabIndex={-1} className="w-full max-w-6xl flex-1 p-4 md:p-8">
          <Inicio />
        </main>

        <footer className="border-t border-line px-4 py-4 text-[13px] text-muted md:px-8">
          © 2026 Código na Escola · Projeto educativo e gratuito para estudantes da rede pública.
        </footer>
      </div>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </div>
  )
}
