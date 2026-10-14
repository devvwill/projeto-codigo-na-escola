import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Inicio from './pages/Inicio'
import Login from './pages/Login'

export default function App() {
  const mostrarLogin = true

  if (mostrarLogin) {
    return <Login />
  }

  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr]">
      <Sidebar />

      <div className="flex min-w-0 flex-col">
        <Topbar />

        <main className="w-full max-w-6xl flex-1 p-4 md:p-8">
          <Inicio />
        </main>

        <footer className="border-t border-line px-4 py-4 text-[13px] text-muted md:px-8">
          © 2026 Código na Escola · Projeto educativo e gratuito para estudantes da rede pública.
        </footer>
      </div>
    </div>
  )
}
