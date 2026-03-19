import { useState } from "react";
import { Trophy, Check } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const desafiosSemana = [
  { id: 1, text: "Treinar pelo menos 4 vezes", points: 40 },
  { id: 2, text: "Beber 2L de água por dia", points: 20 },
  { id: 3, text: "Comer 3 refeições saudáveis/dia", points: 30 },
  { id: 4, text: "Dormir 8 horas por noite", points: 20 },
  { id: 5, text: "Fazer 10 min de alongamento", points: 10 },
  { id: 6, text: "Evitar açúcar refinado", points: 25 },
];

const Desafio = () => {
  const [completed, setCompleted] = useState<number[]>([]);

  const toggle = (id: number) => {
    setCompleted((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);
  };

  const totalPoints = desafiosSemana.filter((d) => completed.includes(d.id)).reduce((sum, d) => sum + d.points, 0);
  const maxPoints = desafiosSemana.reduce((sum, d) => sum + d.points, 0);

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      <div className="px-6 pt-10 pb-4">
        <h1 className="text-2xl font-bold uppercase text-primary">Desafio Semanal</h1>
        <p className="text-sm text-muted-foreground">Complete as metas e acompanhe seu progresso</p>
      </div>

      {/* Progress */}
      <div className="mx-6 mb-4 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Progresso</span>
          <span className="text-sm font-bold text-primary">{totalPoints}/{maxPoints} pts</span>
        </div>
        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 px-6">
        {desafiosSemana.map((d) => {
          const done = completed.includes(d.id);
          return (
            <button
              key={d.id}
              onClick={() => toggle(d.id)}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                done ? "border-primary/50 bg-primary/10" : "border-border bg-card"
              }`}
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {done ? <Check className="h-4 w-4" /> : <Trophy className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${done ? "text-foreground line-through" : "text-foreground"}`}>
                  {d.text}
                </p>
                <p className="text-xs text-muted-foreground">+{d.points} pontos</p>
              </div>
            </button>
          );
        })}
      </div>

      <BottomNav active="Desafio" />
    </div>
  );
};

export default Desafio;
