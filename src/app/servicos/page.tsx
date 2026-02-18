import { Metadata } from "next";
import ServicosClient from "./ServicosClient";

export const metadata: Metadata = {
  title: "Serviços | Medisigma",
  description: "Soluções completas em segurança e saúde para o seu negócio. Medicina do Trabalho, Segurança no Trabalho, Segurança Alimentar e mais.",
  alternates: {
    canonical: "https://www.medisigma.pt/servicos/",
  },
};

export default function ServicosPage() {
  return <ServicosClient />;
}
