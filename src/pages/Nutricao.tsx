import { useState } from "react";
import { Apple, Play, X } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const receitas = [
  {
    title: "Frango Grelhado com Batata Doce",
    description: "Refeição clássica fitness rica em proteínas e carboidratos complexos.",
    videoId: "RbMESkXgffA",
  },
  {
    title: "Smoothie Proteico de Banana",
    description: "Shake pós-treino com whey, banana, aveia e leite.",
    videoId: "VdDc2aZH1Pg",
  },
  {
    title: "Salada Completa com Atum",
    description: "Salada nutritiva com atum, grão-de-bico, folhas verdes e azeite.",
    videoId: "wW-1mpiC7_w",
  },
  {
    title: "Panqueca Proteica de Aveia",
    description: "Café da manhã fitness com aveia, ovos, banana e canela.",
    videoId: "4gW68oPHHrQ",
  },
  {
    title: "Bowl de Açaí Fitness",
    description: "Açaí sem xarope com frutas, granola e pasta de amendoim.",
    videoId: "k_6VqfYCjNw",
  },
];

const Nutricao = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      <div className="px-6 pt-10 pb-4">
        <h1 className="text-2xl font-bold uppercase text-primary">Nutrição</h1>
        <p className="text-sm text-muted-foreground">Receitas saudáveis para seu dia a dia</p>
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
                title="Receita"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 px-6">
        {receitas.map((r) => (
          <div key={r.title} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-secondary">
                <Apple className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{r.title}</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{r.description}</p>
            <button
              onClick={() => setActiveVideo(r.videoId)}
              className="mt-3 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-accent"
            >
              <Play className="h-4 w-4" /> Ver Receita
            </button>
          </div>
        ))}
      </div>

      <BottomNav active="Nutrição" />
    </div>
  );
};

export default Nutricao;
