"use client";

import NotFound from "@/components/ui/NotFound";

export default function NotFoundPage() {
  return (
    <NotFound 
      title="Página não encontrada"
      message="A página que você está procurando não existe ou foi movida."
      backUrl="/"
      backText="Voltar para a página inicial"
    />
  );
}
