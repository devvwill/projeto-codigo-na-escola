import { useCallback, useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import MobileMenu from './components/MobileMenu'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import Aulas from './pages/Aulas'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const [rota, setRota] = useState(() => window.location.hash)
  const [busca, setBusca] = useState('')
  useEffect(() => {
    const atualizar = () => { setRota(window.location.hash); setBusca('') }
    window.addEventListener('hashchange', atualizar)
    return () => window.removeEventListener('hashchange', atualizar)
  }, [])
  const pagina = rota === '#/aulas' ? 'aulas' : 'inicio'
  const mostrarLogin = !['#/inicio', '#/aulas'].includes(rota)

  if (mostrarLogin) {
    return <Login />
  }

  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr]">
      <Sidebar pagina={pagina} />

      <div className="flex min-w-0 flex-col">
        <Topbar pagina={pagina} busca={busca} onBuscaChange={setBusca} menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />

        <main id="conteudo-principal" tabIndex={-1} className="w-full max-w-6xl flex-1 p-4 md:p-8">
          {pagina === 'aulas' ? <Aulas busca={busca} /> : <Inicio />}
        </main>

        <footer className="border-t border-line px-4 py-4 text-[13px] text-muted md:px-8">
          © 2026 Código na Escola · Projeto educativo e gratuito para estudantes da rede pública.
        </footer>
      </div>
      <MobileMenu pagina={pagina} open={menuOpen} onClose={closeMenu} />
    </div>
  )
}
