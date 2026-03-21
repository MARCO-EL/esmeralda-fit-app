import { useState } from "react";
import { Apple, Clock, Flame, Beef, Wheat, Droplets, Leaf, ChevronDown, ChevronUp, X } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { receitas, categorias, type Receita } from "@/data/receitas";
import catCafe from "@/assets/cat-cafe.jpg";
import catAlmoco from "@/assets/cat-almoco.jpg";
import catLanche from "@/assets/cat-lanche.jpg";
import catJantar from "@/assets/cat-jantar.jpg";

const catImages: Record<string, string> = {
  cafe: catCafe,
  almoco: catAlmoco,
  lanche: catLanche,
  jantar: catJantar,
};

const NutriBadge = ({ icon: Icon, value, label, color }: { icon: any; value: number | string; label: string; color: string }) => (
  <div className="flex flex-col items-center gap-0.5">
    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${color}`}>
      <Icon className="h-3.5 w-3.5" />
    </div>
    <span className="text-[10px] font-bold text-foreground">{value}</span>
    <span className="text-[9px] text-muted-foreground">{label}</span>
  </div>
);

const ReceitaCard = ({ r }: { r: Receita }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-3 p-4 text-left">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted text-secondary">
          <Apple className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm truncate">{r.titulo}</p>
          <div className="mt-1 flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {r.tempoMin} min</span>
            <span className="flex items-center gap-1"><Flame className="h-3 w-3" /> {r.calorias} kcal</span>
          </div>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
      </button>

      {open && (
        <div className="border-t border-border px-4 pb-4 pt-3 space-y-4">
          {/* Macros */}
          <div className="flex justify-around">
            <NutriBadge icon={Beef} value={`${r.protG}g`} label="Proteína" color="bg-red-500/20 text-red-400" />
            <NutriBadge icon={Wheat} value={`${r.carbG}g`} label="Carbo" color="bg-amber-500/20 text-amber-400" />
            <NutriBadge icon={Droplets} value={`${r.gordG}g`} label="Gordura" color="bg-blue-500/20 text-blue-400" />
            <NutriBadge icon={Leaf} value={`${r.fibraG}g`} label="Fibra" color="bg-green-500/20 text-green-400" />
          </div>

          <p className="text-[11px] text-muted-foreground">Porção: {r.porcao}</p>

          {/* Ingredientes */}
          <div>
            <h4 className="text-xs font-bold text-primary mb-1">Ingredientes</h4>
            <ul className="space-y-1">
              {r.ingredientes.map((ing, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Preparo */}
          <div>
            <h4 className="text-xs font-bold text-primary mb-1">Modo de Preparo</h4>
            <ol className="space-y-1">
              {r.preparo.map((step, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[9px] font-bold text-primary">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

const Nutricao = () => {
  const [activeTab, setActiveTab] = useState<"cafe" | "almoco" | "lanche" | "jantar">("cafe");
  const filtered = receitas.filter((r) => r.categoria === activeTab);

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      {/* Header */}
      <div className="relative h-40 overflow-hidden">
        <img src={catImages[activeTab]} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-4 left-6">
          <h1 className="text-2xl font-bold uppercase text-primary">Nutrição</h1>
          <p className="text-xs text-foreground/70">Receitas saudáveis low carb</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto px-6 py-3 no-scrollbar">
        {categorias.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveTab(c.key)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${
              activeTab === c.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="px-6 pb-2 text-xs text-muted-foreground">{filtered.length} receitas</p>

      {/* Recipes */}
      <div className="flex flex-col gap-3 px-6">
        {filtered.map((r) => (
          <ReceitaCard key={r.id} r={r} />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mx-6 mt-6 rounded-xl border border-border bg-muted/50 p-4">
        <p className="text-[10px] leading-relaxed text-muted-foreground">
          ⚠️ <strong>Aviso importante:</strong> As informações presentes neste aplicativo têm caráter informativo e educacional. Dietas e reeducação alimentar devem ser personalizadas. Sempre procure orientação de um médico e de um nutricionista antes de iniciar qualquer plano alimentar.
        </p>
      </div>

      <BottomNav active="Nutrição" />
    </div>
  );
};

export default Nutricao;
