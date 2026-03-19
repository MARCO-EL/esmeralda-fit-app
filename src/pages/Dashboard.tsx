import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Apple, Trophy, BookOpen, LogOut } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const sections = [
  { icon: Dumbbell, title: "Treinos", desc: "Planos personalizados", color: "text-primary", path: "/treinos" },
  { icon: Apple, title: "Nutrição", desc: "Dietas e receitas", color: "text-secondary", path: "/nutricao" },
  { icon: Trophy, title: "Desafio", desc: "Metas semanais", color: "text-primary", path: "/desafio" },
  { icon: BookOpen, title: "Guia", desc: "Artigos e dicas", color: "text-secondary", path: "/guia" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("esmeralda_user");
    if (!stored) {
      navigate("/");
      return;
    }
    setUser(stored);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("esmeralda_user");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <div className="relative flex flex-col items-center justify-center px-6 pb-8 pt-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]" />
        </div>
        <h1 className="relative text-3xl font-bold uppercase tracking-wider text-primary">Esmeralda</h1>
        <p className="relative text-xs uppercase tracking-[0.4em] text-foreground/60">F I T</p>
        <button onClick={handleLogout} className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:text-foreground">
          <LogOut className="h-5 w-5" />
        </button>
      </div>

      <div className="px-6 pb-6">
        <h2 className="text-2xl font-bold uppercase text-foreground">Sua Jornada<br />Começa Aqui</h2>
        <p className="mt-2 text-sm text-muted-foreground">Olá, {user.split("@")[0]}! Explore seu conteúdo.</p>
      </div>

      <div className="flex flex-col gap-3 px-6">
        {sections.map((s) => (
          <button
            key={s.title}
            onClick={() => navigate(s.path)}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/30"
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-muted ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{s.title}</p>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
            <span className="text-muted-foreground">›</span>
          </button>
        ))}
      </div>

      <BottomNav active="Início" />
    </div>
  );
};

export default Dashboard;
