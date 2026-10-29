import { useCallback, useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import MobileMenu from './components/MobileMenu'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import Aulas from './pages/Aulas'
import Painel from './pages/Painel'
import Player from './pages/Player'
import Notifications from './components/Notifications'
import { notificacoes } from './data/notificacoes'
import { LearningProvider } from './hooks/useLearning'
import ProfessorArea from './pages/professor/ProfessorArea'

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const [rota, setRota] = useState(() => window.location.hash)
  const [busca, setBusca] = useState(() => new URLSearchParams(window.location.hash.split('?')[1]).get('busca') || '')
  const [lidas, setLidas] = useState(() => { try { const valor = JSON.parse(localStorage.getItem('codigo-notificacoes')); return Array.isArray(valor) ? valor : [] } catch { return [] } })
  function lerNotificacao(id) { setLidas(anteriores => [...new Set([...anteriores, id])]) }
  function lerTodas() { setLidas(notificacoes.map(n => n.id)) }
  useEffect(() => { try { localStorage.setItem('codigo-notificacoes', JSON.stringify(lidas)) } catch { /* A sessão continua sem armazenamento. */ } }, [lidas])
  useEffect(() => {
    const atualizar = () => { setRota(window.location.hash); setBusca(new URLSearchParams(window.location.hash.split('?')[1]).get('busca') || ''); setMenuOpen(false) }
    window.addEventListener('hashchange', atualizar)
    return () => window.removeEventListener('hashchange', atualizar)
  }, [])
  const caminho = rota.split('?')[0]
  const pagina = caminho.startsWith('#/aula/') ? 'player' : ({ '#/aulas': 'aulas', '#/painel': 'painel', '#/notificacoes': 'notificacoes' }[caminho] || 'inicio')
  const mostrarLogin = !['#/inicio', '#/aulas', '#/painel', '#/notificacoes'].includes(caminho) && pagina !== 'player'

  useEffect(() => {
    window.scrollTo(0, 0)
    document.getElementById('conteudo-principal')?.focus({ preventScroll: true })
  }, [caminho])

  if (caminho === '#/professor' || caminho.startsWith('#/professor/')) {
    return <ProfessorArea caminho={caminho} />
  }

  if (mostrarLogin) {
    return <Login />
  }

  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr]">
      <Sidebar pagina={pagina === 'player' ? 'aulas' : pagina} />

      <div className="flex min-w-0 flex-col">
        <Topbar lidas={lidas} onRead={lerNotificacao} onReadAll={lerTodas} naoLidas={notificacoes.filter(n => n.nova && !lidas.includes(n.id)).length} pagina={pagina} busca={busca} onBuscaChange={setBusca} menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />

        <main id="conteudo-principal" tabIndex={-1} className="w-full max-w-6xl flex-1 p-4 md:p-8">
          {pagina === 'aulas' ? <Aulas busca={busca} /> : pagina === 'painel' ? <Painel /> : pagina === 'player' ? <Player key={caminho} id={caminho.split('/')[2]} /> : pagina === 'notificacoes' ? <div className="max-w-2xl"><h1 className="mb-6 text-3xl font-extrabold">Notificações</h1><Notifications lidas={lidas} onRead={lerNotificacao} onReadAll={lerTodas} completo /></div> : <Inicio />}
        </main>

        <footer className="border-t border-line px-4 py-4 text-[13px] text-muted md:px-8">
          © 2026 Código na Escola · Projeto educativo e gratuito para estudantes da rede pública.
        </footer>
      </div>
      <MobileMenu pagina={pagina === 'player' ? 'aulas' : pagina} open={menuOpen} onClose={closeMenu} />
    </div>
  )
}

export default function App() {
  return <LearningProvider><AppContent /></LearningProvider>
}
