import { useState } from "react";
import {
  BookOpen, Download, Calendar, ClipboardCheck, ShoppingCart,
  Dumbbell, Ruler, Apple, FileText, ChevronDown, ChevronUp,
  Droplets, Beef, Wheat, Flame
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import BottomNav from "@/components/BottomNav";

/* ───── Guia articles (unchanged) ───── */
const guias = [
  {
    title: "Psicologia do Treino",
    content:
      "A mentalidade é a base de qualquer transformação. Defina metas claras e realistas. Celebre pequenas vitórias. A consistência vence a intensidade — treinar 4x por semana de forma moderada é melhor que 1x com tudo. Use técnicas de visualização: imagine-se no resultado final. Nos dias difíceis, lembre-se do motivo pelo qual começou.",
  },
  {
    title: "Alimentação Inteligente",
    content:
      "Não faça dietas restritivas — elas não se sustentam. Foque em comer alimentos reais: proteínas magras (frango, peixe, ovos), carboidratos complexos (batata-doce, arroz integral, aveia) e gorduras boas (abacate, azeite, castanhas). Beba no mínimo 2 litros de água por dia. Planeje suas refeições para evitar decisões ruins.",
  },
  {
    title: "Como Medir Seu Progresso",
    content:
      "A balança mente! Use múltiplas métricas: fotos a cada 15 dias (mesma roupa, mesma luz), medidas corporais (cintura, quadril, braço), e como suas roupas estão vestindo. Anote seus pesos nos exercícios — ganho de força é sinal de progresso. A composição corporal muda antes do peso na balança.",
  },
  {
    title: "Sono e Recuperação",
    content:
      "O músculo cresce no descanso, não no treino. Durma de 7 a 9 horas por noite. Evite telas 1h antes de dormir. Mantenha o quarto escuro e fresco. Nos dias de descanso, faça alongamento leve ou caminhada. A recuperação é tão importante quanto o treino.",
  },
  {
    title: "Suplementação Básica",
    content:
      "Suplementos complementam, nunca substituem a alimentação. Os mais úteis para iniciantes: Whey Protein (pós-treino), Creatina (3-5g/dia, todos os dias), e um bom multivitamínico. Consulte um nutricionista antes de usar qualquer suplemento.",
  },
];

/* ───── CSV generators ───── */
const csvTreino = `data,treino,exercicio,serie,reps,carga,rir,descanso_s,tecnica_notas
2026-03-22,Lower,Agachamento livre,1,8,30kg,2,120,"Tempo 2-0-2; joelhos alinhados"
2026-03-22,Lower,Terra romeno,1,10,24kg,3,90,"Coluna neutra; alongar posterior"
2026-03-24,Upper,Supino halteres,1,8,16kg,2,120,"Escápulas retraídas"
2026-03-24,Upper,Remada curvada,1,10,18kg,2,90,"Barra perto do corpo"`;

const csvAlimentacao = `data,refeicao,kcal,prot_g,carb_g,gord_g,agua_ml,observacoes
2026-03-22,Café da manhã,380,28,32,14,500,"Ovos mexidos + aveia"
2026-03-22,Almoço,620,42,55,20,400,"Arroz, feijão, frango, salada"
2026-03-22,Lanche,240,20,18,8,300,"Iogurte + fruta"
2026-03-22,Jantar,520,38,40,16,400,"Carne magra + legumes"`;

const csvMedidas = `data,peso_kg,cintura_cm,quadril_cm,torax_cm,biceps_dir_cm,biceps_esq_cm,observacoes
2026-03-22,82.4,94,101,98,33,32.8,"Início do protocolo"
2026-03-29,81.2,92.5,100,98.2,33.2,33,"Semana 1 concluída"`;

const csvChecklist = (() => {
  const header = "dia,data,treino_feito,refeicao_chave_feita,habito_feito,observacoes";
  const start = new Date("2026-03-22");
  const rows = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const ds = d.toISOString().slice(0, 10);
    return `${i + 1},${ds},FALSO,FALSO,FALSO,""`;
  });
  return [header, ...rows].join("\n");
})();

const csvIngredientes = `receita,ingrediente,categoria,unidade,quantidade_por_porcao
Omelete Proteica,Ovo,Proteína,un,2
Omelete Proteica,Queijo minas,Laticínios,g,30
Omelete Proteica,Espinafre,Vegetais,g,50
Frango com Arroz,Frango (peito),Proteína,g,150
Frango com Arroz,Arroz,Carboidrato,g,120
Frango com Arroz,Feijão,Carboidrato,g,80
Iogurte com Frutas,Iogurte natural,Laticínios,g,170
Iogurte com Frutas,Banana,Fruta,un,1
Iogurte com Frutas,Aveia,Carboidrato,g,30
Salada Proteica,Atum (lata),Proteína,g,120
Salada Proteica,Alface,Vegetais,g,60
Salada Proteica,Tomate,Vegetais,g,60
Salada Proteica,Azeite,Gorduras,ml,10`;

const csvPlanoSemanal = `dia,refeicao,receita,porcoes
Segunda,Café da manhã,Omelete Proteica,1
Segunda,Almoço,Frango com Arroz,1
Segunda,Lanche,Iogurte com Frutas,1
Segunda,Jantar,Salada Proteica,1
Terça,Café da manhã,Omelete Proteica,1
Terça,Almoço,Frango com Arroz,1
Terça,Lanche,Iogurte com Frutas,1
Terça,Jantar,Salada Proteica,1
Quarta,Café da manhã,Omelete Proteica,1
Quarta,Almoço,Frango com Arroz,1
Quarta,Lanche,Iogurte com Frutas,1
Quarta,Jantar,Salada Proteica,1
Quinta,Café da manhã,Omelete Proteica,1
Quinta,Almoço,Frango com Arroz,1
Quinta,Lanche,Iogurte com Frutas,1
Quinta,Jantar,Salada Proteica,1
Sexta,Café da manhã,Omelete Proteica,1
Sexta,Almoço,Frango com Arroz,1
Sexta,Lanche,Iogurte com Frutas,1
Sexta,Jantar,Salada Proteica,1
Sábado,Café da manhã,Omelete Proteica,1
Sábado,Almoço,Frango com Arroz,1
Sábado,Lanche,Iogurte com Frutas,1
Sábado,Jantar,Salada Proteica,1
Domingo,Café da manhã,Omelete Proteica,1
Domingo,Almoço,Frango com Arroz,1
Domingo,Lanche,Iogurte com Frutas,1
Domingo,Jantar,Salada Proteica,1`;

const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Samedd Digital//Esmeralda Fit//PT-BR
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Esmeralda Fit — Lembretes 30 Dias
X-WR-TIMEZONE:America/Sao_Paulo
BEGIN:VEVENT
UID:treino-20260322@samedd.digital
DTSTAMP:20260322T090000Z
DTSTART;TZID=America/Sao_Paulo:20260322T070000
SUMMARY:Treino do dia — Esmeralda Fit (20-30 min)
DESCRIPTION:Abra o guia Esmeralda Fit. Foque no treino do seu nivel. Hidrate-se.
RRULE:FREQ=DAILY;COUNT=30
DURATION:PT30M
BEGIN:VALARM
TRIGGER:-PT10M
ACTION:DISPLAY
DESCRIPTION:Lembrete: Treino do dia em 10 minutos.
END:VALARM
END:VEVENT
BEGIN:VEVENT
UID:refeicao-20260322@samedd.digital
DTSTAMP:20260322T090000Z
DTSTART;TZID=America/Sao_Paulo:20260322T120000
SUMMARY:Refeicao-chave — proteina + fibras
DESCRIPTION:Refeicao pratica: 25-35g proteina + fibras. Marque no checklist.
RRULE:FREQ=DAILY;COUNT=30
DURATION:PT15M
BEGIN:VALARM
TRIGGER:-PT10M
ACTION:DISPLAY
DESCRIPTION:Lembrete: Refeicao-chave em 10 minutos.
END:VALARM
END:VEVENT
END:VCALENDAR`;

/* ───── Download helper ───── */
function downloadFile(content: string, filename: string, mime = "text/csv;charset=utf-8") {
  const blob = new Blob(["\uFEFF" + content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* ───── Workout sheet data (Casa & Academia) ───── */
interface FichaExercicio {
  exercicio: string;
  series: string;
  reps: string;
  rir: string;
  descanso: string;
  notas: string;
}

interface FichaBloco {
  titulo: string;
  subtitulo?: string;
  exercicios: FichaExercicio[];
}

const fichaCasa: FichaBloco[] = [
  {
    titulo: "Emagrecimento — Semana 1–2",
    subtitulo: "Circuito corpo livre + core • 4x/sem",
    exercicios: [
      { exercicio: "Agachamento corpo livre", series: "3", reps: "12–15", rir: "2", descanso: "60s", notas: "Calcanhares no chão" },
      { exercicio: "Flexão (joelhos se preciso)", series: "3", reps: "8–12", rir: "2", descanso: "60–90s", notas: "Escápulas ativas" },
      { exercicio: "Remada unilateral (garrafa)", series: "3", reps: "10–12/lado", rir: "2", descanso: "60s", notas: "Garrafa perto do tronco" },
      { exercicio: "Prancha", series: "2", reps: "30–40s", rir: "—", descanso: "45s", notas: "Quadril alinhado" },
    ],
  },
  {
    titulo: "Emagrecimento — Semana 3–4",
    subtitulo: "Progressão com carga e Tabata",
    exercicios: [
      { exercicio: "Agachamento goblet (peso)", series: "3", reps: "10–12", rir: "1–2", descanso: "60–90s", notas: "Carga estável" },
      { exercicio: "Flexão completa", series: "3", reps: "8–12", rir: "1–2", descanso: "60–90s", notas: "Tempo 2-0-2" },
      { exercicio: "Remada unilateral (↑carga)", series: "3", reps: "10–12/lado", rir: "1–2", descanso: "60s", notas: "+5–10% carga" },
      { exercicio: "Prancha com toques ombro", series: "2", reps: "30–45s", rir: "—", descanso: "45s", notas: "Sem balançar" },
      { exercicio: "Tabata 20:10 (burpee+climber)", series: "2 blocos", reps: "8x 20/10", rir: "—", descanso: "1min", notas: "Entre blocos" },
    ],
  },
  {
    titulo: "Hipertrofia Casa — Semana 1–2",
    subtitulo: "Full Body Funcional • 3–4x/sem",
    exercicios: [
      { exercicio: "Agachamento goblet", series: "3", reps: "12–15", rir: "2", descanso: "60–90s", notas: "Tempo 2-0-2" },
      { exercicio: "Flexão (joelhos se preciso)", series: "3", reps: "8–12", rir: "2", descanso: "60–90s", notas: "Peito alto" },
      { exercicio: "Remada unilateral", series: "3", reps: "10–12/lado", rir: "2", descanso: "60s", notas: "Escápulas retraídas" },
      { exercicio: "Elevação lateral", series: "2", reps: "12–15", rir: "2", descanso: "60s", notas: "Cotovelo leve flexão" },
      { exercicio: "Prancha", series: "2", reps: "30–45s", rir: "—", descanso: "45s", notas: "Alinhamento total" },
    ],
  },
  {
    titulo: "Hipertrofia Casa — Semana 3–4",
    subtitulo: "Progressão de carga e volume",
    exercicios: [
      { exercicio: "Agachamento goblet (↑carga)", series: "4", reps: "10–12", rir: "1–2", descanso: "60–90s", notas: "Última série RIR 1" },
      { exercicio: "Flexão completa", series: "4", reps: "8–10", rir: "1–2", descanso: "60–90s", notas: "Excêntrica 3s" },
      { exercicio: "Remada unilateral (↑carga)", series: "4", reps: "8–10/lado", rir: "1–2", descanso: "60–90s", notas: "Tronco estável" },
      { exercicio: "Elevação lateral", series: "3", reps: "12–15", rir: "1–2", descanso: "60s", notas: "Sem trapézio" },
      { exercicio: "Hollow hold", series: "3", reps: "25–40s", rir: "—", descanso: "45s", notas: "Lombar apoiada" },
    ],
  },
];

const fichaAcademia: FichaBloco[] = [
  {
    titulo: "Lower A — Força Base",
    subtitulo: "Split Lower/Upper • 4x/sem",
    exercicios: [
      { exercicio: "Agachamento livre", series: "5", reps: "5", rir: "2", descanso: "120s", notas: "Aqueça com séries leves" },
      { exercicio: "Terra romeno (barra)", series: "4", reps: "8", rir: "2", descanso: "90s", notas: "Coluna neutra" },
      { exercicio: "Leg press", series: "3", reps: "10–12", rir: "1–2", descanso: "90s", notas: "Controle descida" },
      { exercicio: "Panturrilha em pé", series: "3", reps: "12–15", rir: "2", descanso: "60s", notas: "Pausa 1s embaixo" },
    ],
  },
  {
    titulo: "Upper A — Força Base",
    exercicios: [
      { exercicio: "Supino reto (barra)", series: "5", reps: "5", rir: "2", descanso: "120s", notas: "Escápulas retraídas" },
      { exercicio: "Remada curvada (barra)", series: "4", reps: "6–8", rir: "2", descanso: "90s", notas: "Tronco estável" },
      { exercicio: "Desenvolvimento (halteres)", series: "3", reps: "8–10", rir: "1–2", descanso: "90s", notas: "Sem arco excessivo" },
      { exercicio: "Rosca direta", series: "3", reps: "10–12", rir: "2", descanso: "60–90s", notas: "Sem balanço" },
    ],
  },
  {
    titulo: "Push — Peito/Ombro/Tríceps",
    subtitulo: "Split PPL • 6x/sem",
    exercicios: [
      { exercicio: "Supino inclinado (halteres)", series: "4", reps: "8–10", rir: "2", descanso: "90s", notas: "Ângulo ~30°" },
      { exercicio: "Desenvolvimento militar", series: "3", reps: "8–10", rir: "2", descanso: "90s", notas: "Tempo 2-0-2" },
      { exercicio: "Crucifixo (máquina)", series: "3", reps: "12–15", rir: "1–2", descanso: "60–90s", notas: "Amplitude segura" },
      { exercicio: "Tríceps polia", series: "3", reps: "10–12", rir: "1–2", descanso: "60–90s", notas: "Cotovelo fixo" },
    ],
  },
  {
    titulo: "Pull — Costas/Bíceps",
    exercicios: [
      { exercicio: "Puxada frente (barra larga)", series: "4", reps: "8–10", rir: "2", descanso: "90s", notas: "Depressão escapular" },
      { exercicio: "Remada baixa (cabo)", series: "3", reps: "10–12", rir: "1–2", descanso: "90s", notas: "Pausa 1s contração" },
      { exercicio: "Pull-over (halter/cabo)", series: "3", reps: "12–15", rir: "1–2", descanso: "60–90s", notas: "Sem forçar" },
      { exercicio: "Rosca alternada", series: "3", reps: "10–12", rir: "1–2", descanso: "60–90s", notas: "Sem girar tronco" },
    ],
  },
  {
    titulo: "Legs — Inferior (PPL)",
    exercicios: [
      { exercicio: "Agachamento livre", series: "4", reps: "6–8", rir: "2", descanso: "120s", notas: "Aqueça progressivo" },
      { exercicio: "Terra romeno", series: "3", reps: "8–10", rir: "2", descanso: "90s", notas: "Quadril atrás" },
      { exercicio: "Leg press", series: "3", reps: "10–12", rir: "1–2", descanso: "90s", notas: "Pés estáveis" },
      { exercicio: "Cadeira extensora", series: "2", reps: "12–15", rir: "1–2", descanso: "60s", notas: "Pausa 1s topo" },
      { exercicio: "Panturrilha sentado", series: "3", reps: "12–15", rir: "2", descanso: "60s", notas: "Amplitude total" },
    ],
  },
];

/* ───── Ficha Table Component ───── */
const FichaTable = ({ bloco }: { bloco: FichaBloco }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-3 p-4 text-left">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
          <Dumbbell className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{bloco.titulo}</p>
          {bloco.subtitulo && <p className="text-[10px] text-muted-foreground">{bloco.subtitulo}</p>}
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && (
        <div className="border-t border-border overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground">
                <th className="px-3 py-2 text-left font-semibold">Exercício</th>
                <th className="px-2 py-2 text-center font-semibold">Séries</th>
                <th className="px-2 py-2 text-center font-semibold">Reps</th>
                <th className="px-2 py-2 text-center font-semibold">RIR</th>
                <th className="px-2 py-2 text-center font-semibold">Desc.</th>
                <th className="px-2 py-2 text-left font-semibold">Notas</th>
              </tr>
            </thead>
            <tbody>
              {bloco.exercicios.map((e, i) => (
                <tr key={i} className="border-t border-border/50">
                  <td className="px-3 py-2 font-medium text-foreground">{e.exercicio}</td>
                  <td className="px-2 py-2 text-center text-foreground">{e.series}</td>
                  <td className="px-2 py-2 text-center text-foreground">{e.reps}</td>
                  <td className="px-2 py-2 text-center text-foreground">{e.rir}</td>
                  <td className="px-2 py-2 text-center text-foreground">{e.descanso}</td>
                  <td className="px-2 py-2 text-muted-foreground">{e.notas}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-3 py-2 text-[10px] text-muted-foreground bg-muted/30">
            💡 RIR = Reps em Reserva (0 = no limite, 2 = sobram 2). Progrida quando bater a faixa com RIR ≥ 2.
          </div>
        </div>
      )}
    </div>
  );
};

/* ───── Download Card Component ───── */
const DownloadCard = ({ icon: Icon, title, desc, onClick, color = "text-primary" }: {
  icon: any; title: string; desc: string; onClick: () => void; color?: string;
}) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-left transition hover:border-primary/40 w-full"
  >
    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted ${color}`}>
      <Icon className="h-4 w-4" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-foreground">{title}</p>
      <p className="text-[10px] text-muted-foreground">{desc}</p>
    </div>
    <Download className="h-4 w-4 text-muted-foreground shrink-0" />
  </button>
);

/* ───── Shopping List Component ───── */
const listaCompras = [
  { cat: "🥩 Proteína", items: ["Ovo (14 un)", "Queijo minas (210g)", "Frango peito (1.050g)", "Atum lata (840g)"] },
  { cat: "🥬 Vegetais", items: ["Espinafre (350g)", "Alface (420g)", "Tomate (420g)"] },
  { cat: "🍚 Carboidrato", items: ["Arroz (840g)", "Feijão (560g)", "Aveia (210g)"] },
  { cat: "🧀 Laticínios", items: ["Iogurte natural (1.190g)"] },
  { cat: "🍌 Fruta", items: ["Banana (7 un)"] },
  { cat: "🫒 Gorduras", items: ["Azeite (70ml)"] },
];

/* ───── Main Component ───── */
const Guia = () => {
  const [activeSection, setActiveSection] = useState<"artigos" | "downloads" | "fichas" | "lista">("artigos");

  const tabs = [
    { key: "artigos" as const, label: "Artigos", icon: BookOpen },
    { key: "downloads" as const, label: "Downloads", icon: Download },
    { key: "fichas" as const, label: "Fichas", icon: FileText },
    { key: "lista" as const, label: "Compras", icon: ShoppingCart },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      <div className="px-6 pt-10 pb-2">
        <h1 className="text-2xl font-bold uppercase text-primary">Guia</h1>
        <p className="text-sm text-muted-foreground">Artigos, ferramentas e fichas para sua jornada</p>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 overflow-x-auto px-6 py-3 no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveSection(t.key)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${
              activeSection === t.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="px-6 space-y-4">
        {/* ── ARTIGOS ── */}
        {activeSection === "artigos" && (
          <Accordion type="single" collapsible className="flex flex-col gap-2">
            {guias.map((g, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-xl border border-border bg-card px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-secondary">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{g.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{g.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {/* ── DOWNLOADS ── */}
        {activeSection === "downloads" && (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Baixe planilhas, checklist e lembretes para acompanhar sua evolução.
            </p>

            <h3 className="text-xs font-bold uppercase text-primary tracking-wider pt-2">📊 Planilhas CSV</h3>
            <DownloadCard
              icon={Dumbbell}
              title="Planilha de Treino"
              desc="Registre carga, reps, RIR e notas técnicas"
              onClick={() => downloadFile(csvTreino, "EsmeraldaFit_Planilha_Treino.csv")}
            />
            <DownloadCard
              icon={Apple}
              title="Planilha de Alimentação"
              desc="Registre refeições, macros e água diária"
              onClick={() => downloadFile(csvAlimentacao, "EsmeraldaFit_Planilha_Alimentacao.csv")}
              color="text-secondary"
            />
            <DownloadCard
              icon={Ruler}
              title="Planilha de Medidas"
              desc="Peso, cintura, quadril, tórax, bíceps"
              onClick={() => downloadFile(csvMedidas, "EsmeraldaFit_Planilha_Medidas.csv")}
            />

            <h3 className="text-xs font-bold uppercase text-primary tracking-wider pt-4">✅ Checklist & Calendário</h3>
            <DownloadCard
              icon={ClipboardCheck}
              title="Checklist 30 Dias"
              desc="Marque treino, refeição-chave e hábito por dia"
              onClick={() => downloadFile(csvChecklist, "EsmeraldaFit_Checklist_30_Dias.csv")}
              color="text-secondary"
            />
            <DownloadCard
              icon={Calendar}
              title="Lembretes 30 Dias (.ics)"
              desc="Treino 7h + Refeição-chave 12h — importar no calendário"
              onClick={() => downloadFile(icsContent, "EsmeraldaFit_Lembretes_30_Dias.ics", "text/calendar;charset=utf-8")}
            />

            <h3 className="text-xs font-bold uppercase text-primary tracking-wider pt-4">🛒 Nutrição — Planejamento</h3>
            <DownloadCard
              icon={ShoppingCart}
              title="Ingredientes Base"
              desc="Receita × ingrediente × categoria × quantidade"
              onClick={() => downloadFile(csvIngredientes, "EsmeraldaFit_Ingredientes_Base.csv")}
              color="text-secondary"
            />
            <DownloadCard
              icon={Apple}
              title="Plano Semanal de Refeições"
              desc="7 dias × 4 refeições — pronto para editar"
              onClick={() => downloadFile(csvPlanoSemanal, "EsmeraldaFit_Plano_Semanal_Refeicoes.csv")}
            />

            <div className="rounded-xl border border-border bg-muted/50 p-4 mt-4">
              <p className="text-[10px] leading-relaxed text-muted-foreground">
                💡 <strong>Dica:</strong> Importe os CSVs no Google Sheets para gráficos automáticos, caixas de seleção e fórmulas. No celular, o arquivo .ics abre direto no calendário nativo.
              </p>
            </div>
          </div>
        )}

        {/* ── FICHAS PROGRESSIVAS ── */}
        {activeSection === "fichas" && (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Fichas com exercícios, séries, reps, RIR e notas técnicas.
            </p>

            <h3 className="text-xs font-bold uppercase text-primary tracking-wider pt-2">🏠 Treinos em Casa</h3>
            <p className="text-[10px] text-muted-foreground">20–40 min • 3–5x/sem • Halteres/garrafas, elástico, cadeira</p>
            {fichaCasa.map((b, i) => (
              <FichaTable key={`casa-${i}`} bloco={b} />
            ))}

            <h3 className="text-xs font-bold uppercase text-primary tracking-wider pt-4">🏋️ Treinos na Academia</h3>
            <p className="text-[10px] text-muted-foreground">35–60 min • 3–6x/sem • Máquinas e pesos livres</p>
            {fichaAcademia.map((b, i) => (
              <FichaTable key={`acad-${i}`} bloco={b} />
            ))}

            <div className="rounded-xl border border-border bg-muted/50 p-4 mt-2">
              <p className="text-[10px] leading-relaxed text-muted-foreground">
                📝 <strong>Progressão:</strong> Ao bater a faixa de reps com RIR ≥ 2, aumente carga 2,5–5% na próxima sessão. Registre na Planilha de Treino (aba Downloads).
              </p>
            </div>
          </div>
        )}

        {/* ── LISTA DE COMPRAS ── */}
        {activeSection === "lista" && (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Lista semanal automática baseada no plano de 7 dias × 4 refeições.
            </p>

            {listaCompras.map((cat, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <h4 className="text-xs font-bold text-foreground mb-2">{cat.cat}</h4>
                <ul className="space-y-1">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="h-4 w-4 rounded border border-border flex items-center justify-center text-[8px]">☐</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <DownloadCard
              icon={ShoppingCart}
              title="Baixar Ingredientes Base (CSV)"
              desc="Importar no Google Sheets para lista automática"
              onClick={() => downloadFile(csvIngredientes, "EsmeraldaFit_Ingredientes_Base.csv")}
              color="text-secondary"
            />

            <div className="rounded-xl border border-border bg-muted/50 p-4">
              <h4 className="text-[11px] font-bold text-foreground mb-1">🔧 Como montar no Google Sheets</h4>
              <ol className="space-y-1 text-[10px] text-muted-foreground list-decimal ml-4">
                <li>Importe <strong>Ingredientes_Base.csv</strong> numa aba</li>
                <li>Importe <strong>Plano_Semanal.csv</strong> noutra aba</li>
                <li>Na aba "Lista_Compras", use PROCV + SOMARPRODUTO para consolidar por ingrediente</li>
                <li>Formate por categoria com cores suaves e adicione filtro</li>
              </ol>
            </div>

            <div className="rounded-xl border border-primary/30 bg-primary/10 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Flame className="h-4 w-4 text-primary" />
                <p className="text-xs font-bold text-foreground">Ícones de Medição</p>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex items-center gap-2 text-[11px] text-foreground">
                  <Beef className="h-4 w-4 text-red-400" /> Proteína (g)
                </div>
                <div className="flex items-center gap-2 text-[11px] text-foreground">
                  <Wheat className="h-4 w-4 text-amber-400" /> Carboidrato (g)
                </div>
                <div className="flex items-center gap-2 text-[11px] text-foreground">
                  <Droplets className="h-4 w-4 text-blue-400" /> Gordura (g)
                </div>
                <div className="flex items-center gap-2 text-[11px] text-foreground">
                  <Droplets className="h-4 w-4 text-cyan-400" /> Água (ml)
                </div>
                <div className="flex items-center gap-2 text-[11px] text-foreground">
                  <Flame className="h-4 w-4 text-orange-400" /> Calorias (kcal)
                </div>
                <div className="flex items-center gap-2 text-[11px] text-foreground">
                  <Ruler className="h-4 w-4 text-primary" /> Medidas (cm/kg)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="mx-6 mt-6 rounded-xl border border-border bg-muted/50 p-4">
        <p className="text-[10px] leading-relaxed text-muted-foreground">
          ⚠️ <strong>Aviso importante:</strong> Conteúdo educacional. Procure profissionais de saúde antes de iniciar treinos/dietas.
        </p>
      </div>

      <BottomNav active="Guia" />
    </div>
  );
};

export default Guia;
