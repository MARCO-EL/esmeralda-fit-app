import { useState } from "react";
import { Dumbbell, Clock, Flame, ChevronDown, ChevronUp, Target, TrendingUp, TrendingDown, Wrench, AlertTriangle, Calendar } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { treinos, planosSemana, type Treino } from "@/data/treinos";

const objetivoLabels: Record<string, string> = {
  emagrecimento: "Emagrecimento",
  condicionamento: "Condicionamento",
  hipertrofia: "Hipertrofia",
  força: "Força",
  mobilidade: "Mobilidade",
  preparação: "Preparação",
};

const nivelColors: Record<string, string> = {
  iniciante: "bg-green-900/40 text-green-400",
  intermediário: "bg-yellow-900/40 text-yellow-400",
  avançado: "bg-red-900/40 text-red-400",
  todos: "bg-primary/20 text-primary",
};

const categorias = [
  { key: "todos", label: "Todos" },
  { key: "emagrecimento", label: "Emagrecer" },
  { key: "hiit", label: "HIIT" },
  { key: "hipertrofia", label: "Hipertrofia" },
  { key: "força", label: "Força" },
  { key: "mobilidade", label: "Mobilidade" },
  { key: "aquecimento", label: "Aquecimento" },
];

const TreinoCard = ({ treino }: { treino: Treino }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 text-left">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted text-primary">
            <Dumbbell className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-sm leading-tight">{treino.titulo}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="h-3 w-3" /> {treino.duracaoMin}min
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Flame className="h-3 w-3" /> 🔥 {treino.kcalEstimadas} kcal
              </span>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${nivelColors[treino.nivel] || nivelColors.todos}`}>
                {treino.nivel}
              </span>
            </div>
          </div>
          {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border px-4 pb-4 pt-3 space-y-4">
          {/* Objetivo e Equipamentos */}
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold text-primary">
              <Target className="h-3 w-3" /> {objetivoLabels[treino.objetivo] || treino.objetivo}
            </span>
            {treino.equipamentos.map((eq) => (
              <span key={eq} className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[10px] text-muted-foreground">
                <Wrench className="h-3 w-3" /> {eq}
              </span>
            ))}
          </div>

          {/* Aquecimento */}
          {treino.aquecimento.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase text-primary mb-1">🔥 Aquecimento</p>
              {treino.aquecimento.map((a, i) => (
                <p key={i} className="text-xs text-muted-foreground">• {a}</p>
              ))}
            </div>
          )}

          {/* Bloco de exercícios */}
          {treino.bloco.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase text-primary mb-2">💪 Exercícios</p>
              <div className="space-y-2">
                {treino.bloco.map((ex, i) => (
                  <div key={i} className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs font-semibold text-foreground">{ex.descricao}</p>
                    <div className="mt-1 flex flex-wrap gap-3 text-[10px] text-muted-foreground">
                      <span>⏱ {ex.tempoReps}</span>
                      <span>📊 {ex.series} séries</span>
                      <span>⏸ Descanso: {ex.descanso}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Descanso geral */}
          {treino.descanso !== "—" && (
            <p className="text-xs text-muted-foreground">⏸ <span className="font-semibold">Descanso entre blocos:</span> {treino.descanso}</p>
          )}

          {/* Técnica */}
          {treino.tecnica.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase text-primary mb-1">📝 Dicas de Técnica</p>
              {treino.tecnica.map((t, i) => (
                <p key={i} className="text-xs text-muted-foreground">✔ {t}</p>
              ))}
            </div>
          )}

          {/* Regressão e Progressão */}
          <div className="grid grid-cols-2 gap-3">
            {treino.regressao.length > 0 && (
              <div>
                <p className="flex items-center gap-1 text-[11px] font-bold uppercase text-yellow-400 mb-1">
                  <TrendingDown className="h-3 w-3" /> Mais fácil
                </p>
                {treino.regressao.map((r, i) => (
                  <p key={i} className="text-[10px] text-muted-foreground">• {r}</p>
                ))}
              </div>
            )}
            {treino.progressao.length > 0 && (
              <div>
                <p className="flex items-center gap-1 text-[11px] font-bold uppercase text-green-400 mb-1">
                  <TrendingUp className="h-3 w-3" /> Mais difícil
                </p>
                {treino.progressao.map((p, i) => (
                  <p key={i} className="text-[10px] text-muted-foreground">• {p}</p>
                ))}
              </div>
            )}
          </div>

          {/* Observações */}
          {treino.observacoes && (
            <div className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3">
              <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-[11px] text-destructive">{treino.observacoes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Treinos = () => {
  const [catAtiva, setCatAtiva] = useState("todos");
  const [planoAberto, setPlanoAberto] = useState<string | null>(null);

  const treinosFiltrados = catAtiva === "todos" ? treinos : treinos.filter((t) => t.categoria === catAtiva);

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      <div className="px-6 pt-10 pb-4">
        <h1 className="text-2xl font-bold uppercase text-primary">Treinos</h1>
        <p className="text-sm text-muted-foreground">Rotinas completas sem vídeos — 100% descritivas</p>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto px-6 pb-4 no-scrollbar">
        {categorias.map((c) => (
          <button
            key={c.key}
            onClick={() => setCatAtiva(c.key)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              catAtiva === c.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Planos semanais */}
      <div className="px-6 pb-4">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase text-primary mb-2">
          <Calendar className="h-4 w-4" /> Planos Semanais por Nível
        </p>
        <div className="flex gap-2">
          {planosSemana.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlanoAberto(planoAberto === p.id ? null : p.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                planoAberto === p.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {p.nivel}
            </button>
          ))}
        </div>

        {planoAberto && (() => {
          const plano = planosSemana.find((p) => p.id === planoAberto);
          if (!plano) return null;
          return (
            <div className="mt-3 rounded-xl border border-border bg-card p-4 space-y-2">
              <p className="text-sm font-bold text-foreground">Plano {plano.nivel}</p>
              {plano.dias.map((d) => (
                <div key={d.dia} className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2">
                  <span className="text-xs font-bold text-primary w-16 shrink-0">{d.dia.slice(0, 3)}</span>
                  <span className="text-xs text-foreground flex-1">{d.foco}</span>
                  <span className="text-[10px] text-muted-foreground">{d.observacoes}</span>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* Lista de treinos */}
      <div className="flex flex-col gap-3 px-6">
        {treinosFiltrados.map((t) => (
          <TreinoCard key={t.id} treino={t} />
        ))}
        {treinosFiltrados.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">Nenhum treino nesta categoria.</p>
        )}
      </div>

      <BottomNav active="Treinos" />
    </div>
  );
};

export default Treinos;
