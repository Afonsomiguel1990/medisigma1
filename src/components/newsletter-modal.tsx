"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação do email
    if (!email) {
      setErrors({ email: "O email é obrigatório" });
      return;
    }
    
    if (!validateEmail(email)) {
      setErrors({ email: "Por favor, insira um email válido" });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Criar mailto link para subscrição
      const subject = encodeURIComponent("Subscrição de Newsletter - Medisigma");
      const body = encodeURIComponent(`Gostaria de subscrever a newsletter da Medisigma.

Email: ${email}

Obrigado!`);
      
      const mailtoLink = `mailto:geral@medisigma.pt?subject=${subject}&body=${body}`;
      
      // Abrir cliente de email
      window.location.href = mailtoLink;
      
      // Simular sucesso após pequeno delay
      setTimeout(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);
      }, 1000);
      
    } catch {
      setIsSubmitting(false);
      setErrors({ email: "Erro ao processar pedido. Tente novamente." });
    }
  };

  const handleClose = () => {
    setEmail("");
    setIsSubmitted(false);
    setErrors({});
    onClose();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: undefined });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background border border-border rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Newsletter Medisigma</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-6">
          Mantenha-se atualizado com as últimas novidades, artigos e insights sobre medicina do trabalho, segurança e muito mais.
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={handleEmailChange}
                className={cn(
                  "w-full px-3 py-2 border border-border rounded-md bg-background text-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                  errors.email && "border-red-500 focus:ring-red-500"
                )}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="flex gap-3 justify-end">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || !email}
                className="bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? "A processar..." : "Subscrever"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-center py-4">
            <div className="flex justify-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Obrigado!</h3>
              <p className="text-muted-foreground">
                O seu cliente de email foi aberto com o pedido de subscrição. Envie o email para completar o processo.
              </p>
            </div>
            <Button onClick={handleClose} className="w-full">
              Fechar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 