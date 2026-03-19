import { BookOpen } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import BottomNav from "@/components/BottomNav";

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

const Guia = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      <div className="px-6 pt-10 pb-4">
        <h1 className="text-2xl font-bold uppercase text-primary">Guia</h1>
        <p className="text-sm text-muted-foreground">Artigos e dicas para sua jornada</p>
      </div>

      <div className="px-6">
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
      </div>

      <BottomNav active="Guia" />
    </div>
  );
};

export default Guia;
