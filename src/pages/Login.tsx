import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const VALID_EMAIL = "teste@teste.com";
const VALID_PASSWORD = "123456";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      toast({ title: "E-mail inválido", description: "Por favor, insira um e-mail válido.", variant: "destructive" });
      return;
    }
    if (!password) {
      toast({ title: "Senha obrigatória", description: "Por favor, insira sua senha.", variant: "destructive" });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        localStorage.setItem("esmeralda_user", email);
        navigate("/dashboard");
      } else {
        toast({ title: "Email ou senha inválidos", description: "Verifique seus dados e tente novamente.", variant: "destructive" });
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold uppercase tracking-wider text-primary drop-shadow-lg">
            Esmeralda
          </h1>
          <p className="mt-1 text-lg font-light uppercase tracking-[0.4em] text-foreground/70">
            F I T
          </p>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Transformação Fitness: Seu Guia Completo para Emagrecer e Ganhar Músculos
        </p>

        <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Seu e-mail de compra"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-border bg-card pl-11 text-foreground placeholder:text-muted-foreground focus:ring-primary"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 border-border bg-card pl-11 text-foreground placeholder:text-muted-foreground focus:ring-primary"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-full bg-primary text-lg font-semibold uppercase tracking-wide text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-accent hover:shadow-primary/50"
          >
            {loading ? "Entrando..." : "Acessar"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground">
          Use o e-mail e senha cadastrados na compra para acessar.
        </p>
      </div>
    </div>
  );
};

export default Login;
