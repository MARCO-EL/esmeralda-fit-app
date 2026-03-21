import { Mail, ExternalLink, BookOpen } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const Contato = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      <div className="px-6 pt-10 pb-4">
        <h1 className="text-2xl font-bold uppercase text-primary">Contato & E-book</h1>
        <p className="text-sm text-muted-foreground">Adquira seu guia completo e entre em contato</p>
      </div>

      <div className="flex flex-col gap-4 px-6">
        {/* E-book CTA */}
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-6 text-center">
          <BookOpen className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-3 text-lg font-bold text-foreground">E-book Fitness Completo</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Transformação Fitness: Seu Guia Completo para Emagrecer e Ganhar Músculos. 22 capítulos com treinos, nutrição e desafios.
          </p>
          <a
            href="https://pay.kiwify.com.br/XZ6DhAB"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:bg-accent"
          >
            <ExternalLink className="h-4 w-4" /> ADQUIRIR E-BOOK
          </a>
        </div>

        {/* Site preview */}
        <a
          href="https://samedd-fitness-evolve.lovable.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition hover:border-primary/30"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-primary">
            <ExternalLink className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground text-sm">Visite o Site Completo</p>
            <p className="text-xs text-muted-foreground">samedd-fitness-evolve.lovable.app</p>
          </div>
          <span className="text-muted-foreground">›</span>
        </a>

        {/* Contact */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-secondary">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Contato</p>
              <p className="text-xs text-muted-foreground">Dúvidas ou sugestões? Entre em contato.</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="Contato" />
    </div>
  );
};

export default Contato;
