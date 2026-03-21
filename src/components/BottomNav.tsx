import { useNavigate } from "react-router-dom";
import { Home, Dumbbell, Apple, BookOpen, Trophy, Mail } from "lucide-react";

const navItems = [
  { icon: Home, label: "Início", path: "/dashboard" },
  { icon: Dumbbell, label: "Treinos", path: "/treinos" },
  { icon: Apple, label: "Nutrição", path: "/nutricao" },
  { icon: Trophy, label: "Desafio", path: "/desafio" },
  { icon: BookOpen, label: "Guia", path: "/guia" },
  { icon: Mail, label: "Contato", path: "/contato" },
];

interface BottomNavProps {
  active: string;
}

const BottomNav = ({ active }: BottomNavProps) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-card px-1 py-2 backdrop-blur-lg">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center gap-0.5 px-1 text-[10px] transition ${
            item.label === active ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
