import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const dismissed = sessionStorage.getItem("pwa_dismissed");
      if (!dismissed) setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShow(false);
  };

  const handleDismiss = () => {
    sessionStorage.setItem("pwa_dismissed", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-[100] flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-2xl">
      <Download className="h-6 w-6 shrink-0 text-primary" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">Instalar Esmeralda Fit</p>
        <p className="text-xs text-muted-foreground">Adicione à tela inicial para acesso rápido</p>
      </div>
      <Button size="sm" onClick={handleInstall} className="bg-primary text-primary-foreground">Instalar</Button>
      <button onClick={handleDismiss} className="text-muted-foreground"><X className="h-4 w-4" /></button>
    </div>
  );
};

export default InstallPrompt;
