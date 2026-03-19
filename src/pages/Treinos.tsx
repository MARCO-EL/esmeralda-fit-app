import { useState } from "react";
import { Dumbbell, Play, X } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const treinos = [
  {
    title: "HIIT Queima Total",
    duration: "20min",
    calories: "350 kcal",
    description: "Treino intervalado de alta intensidade para queima máxima de gordura.",
    videoId: "ml6cT4AZdqI",
  },
  {
    title: "Cardio Moderado",
    duration: "25min",
    calories: "280 kcal",
    description: "Cardio de intensidade moderada para resistência e saúde cardiovascular.",
    videoId: "VWj9h4v-XBE",
  },
  {
    title: "Treino de Força - Superior",
    duration: "30min",
    calories: "300 kcal",
    description: "Fortalecimento de peito, ombros, costas e braços.",
    videoId: "ixkQaZXVQjs",
  },
  {
    title: "Treino de Força - Inferior",
    duration: "30min",
    calories: "320 kcal",
    description: "Fortalecimento de glúteos, quadríceps e panturrilha.",
    videoId: "UItWltVZZmE",
  },
  {
    title: "Alongamento e Mobilidade",
    duration: "15min",
    calories: "80 kcal",
    description: "Sessão de alongamento para flexibilidade e recuperação muscular.",
    videoId: "g_tea8ZNk5A",
  },
];

const Treinos = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      <div className="px-6 pt-10 pb-4">
        <h1 className="text-2xl font-bold uppercase text-primary">Treinos</h1>
        <p className="text-sm text-muted-foreground">Escolha seu treino e comece agora!</p>
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4">
          <div className="w-full max-w-lg">
            <button onClick={() => setActiveVideo(null)} className="mb-3 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" /> Fechar
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-xl">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="Treino"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 px-6">
        {treinos.map((t) => (
          <div key={t.title} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-primary">
                <Dumbbell className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{t.title}</p>
                <p className="text-xs text-muted-foreground">{t.duration} | {t.calories}</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{t.description}</p>
            <button
              onClick={() => setActiveVideo(t.videoId)}
              className="mt-3 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-accent"
            >
              <Play className="h-4 w-4" /> Assistir
            </button>
          </div>
        ))}
      </div>

      <BottomNav active="Treinos" />
    </div>
  );
};

export default Treinos;
