import { useCallback, useEffect, useState } from "react";
import {
  HashRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
  useOutletContext,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import MobileMenu from "./components/MobileMenu";
import Notifications from "./components/Notifications";

import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Aulas from "./pages/Aulas";
import Painel from "./pages/Painel";
import Player from "./pages/Player";
import ProfessorArea from "./pages/professor/ProfessorArea";

import { notificacoes } from "./data/notificacoes";
import { LearningProvider } from "./hooks/useLearning";
import ProtectedRoute from "./components/ProtectedRoute";

function PlayerPage() {
  const { id } = useParams();

  return <Player key={id} id={id} />;
}

function AppLayout() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [busca, setBusca] = useState(
    () => new URLSearchParams(location.search).get("busca") || "",
  );

  const [lidas, setLidas] = useState(() => {
    try {
      const valor = JSON.parse(localStorage.getItem("codigo-notificacoes"));

      return Array.isArray(valor) ? valor : [];
    } catch {
      return [];
    }
  });

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const caminho = location.pathname;

  const pagina = caminho.startsWith("/aula/")
    ? "player"
    : {
        "/aulas": "aulas",
        "/painel": "painel",
        "/notificacoes": "notificacoes",
      }[caminho] || "inicio";

  function lerNotificacao(id) {
    setLidas((anteriores) => [...new Set([...anteriores, id])]);
  }

  function lerTodas() {
    setLidas(notificacoes.map((n) => n.id));
  }

  useEffect(() => {
    try {
      localStorage.setItem("codigo-notificacoes", JSON.stringify(lidas));
    } catch {
      // A sessão continua sem armazenamento.
    }
  }, [lidas]);

  useEffect(() => {
    setBusca(new URLSearchParams(location.search).get("busca") || "");

    setMenuOpen(false);
    window.scrollTo(0, 0);

    document
      .getElementById("conteudo-principal")
      ?.focus({ preventScroll: true });
  }, [location.pathname, location.search]);

  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr]">
      <Sidebar pagina={pagina === "player" ? "aulas" : pagina} />

      <div className="flex min-w-0 flex-col">
        <Topbar
          lidas={lidas}
          onRead={lerNotificacao}
          onReadAll={lerTodas}
          naoLidas={
            notificacoes.filter((n) => n.nova && !lidas.includes(n.id)).length
          }
          pagina={pagina}
          busca={busca}
          onBuscaChange={setBusca}
          menuOpen={menuOpen}
          onOpenMenu={() => setMenuOpen(true)}
        />

        <main
          id="conteudo-principal"
          tabIndex={-1}
          className="w-full max-w-6xl flex-1 p-4 md:p-8"
        >
          <Outlet context={{ lidas, lerNotificacao, lerTodas }} />
        </main>

        <footer className="border-t border-line px-4 py-4 text-[13px] text-muted md:px-8">
          © 2026 Código na Escola · Projeto educativo e gratuito para estudantes
          da rede pública.
        </footer>
      </div>

      <MobileMenu
        pagina={pagina === "player" ? "aulas" : pagina}
        open={menuOpen}
        onClose={closeMenu}
      />
    </div>
  );
}

function ProfessorRoute() {
  const location = useLocation();

  return <ProfessorArea caminho={`#${location.pathname}${location.search}`} />;
}

export default function App() {
  return (
    <HashRouter>
      <LearningProvider>
        <Routes>
          {}
          <Route path="/login" element={<Login />} />

          {}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/aulas" element={<Aulas />} />
              <Route path="/painel" element={<Painel />} />
              <Route path="/aula/:id" element={<PlayerPage />} />

              <Route path="/notificacoes" element={<NotificationsPage />} />
            </Route>
          </Route>

          {}
          <Route path="/professor/*" element={<ProfessorRoute />} />

          {}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </LearningProvider>
    </HashRouter>
  );
}

function NotificationsPage() {
  const { lidas, lerNotificacao, lerTodas } = useOutletContext();

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-3xl font-extrabold">Notificações</h1>

      <Notifications
        lidas={lidas}
        onRead={lerNotificacao}
        onReadAll={lerTodas}
        completo
      />
    </div>
  );
}
