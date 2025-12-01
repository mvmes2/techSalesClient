"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/ui/Loading";
import NotFound from "@/components/ui/NotFound";
import ServiceDetail from "@/components/services/ServiceDetail";
import { getServiceById } from "@/mocks/services/servicesMock";


export default function ServiceDetailPage() {
  // Extraímos o ID do serviço dos parâmetros da URL
  const params = useParams();
  const serviceId = params.id as string;

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);

        // Em um ambiente de produção, faríamos uma chamada à API aqui
        // const response = await fetch(`/api/services/${serviceId}`);
        // const data = await response.json();

        // Para desenvolvimento, usamos dados mockados
        setTimeout(() => {
          const mockService = getServiceById(serviceId);

          if (mockService) {
            setService(mockService);
          } else {
            setError("Serviço não encontrado");
          }

          setLoading(false);
        }, 300); // Reduzindo o tempo para melhorar a experiência
      } catch (err) {
        setError("Erro ao carregar os dados do serviço. Por favor, tente novamente.");
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [serviceId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <NotFound
        title="Erro ao carregar serviço"
        message={error}
        backUrl="/"
        backText="Voltar para a página inicial"
      />
    );
  }

  if (!service) {
    return (
      <NotFound
        title="Serviço não encontrado"
        message="O serviço solicitado não foi encontrado ou não existe."
        backUrl="/"
        backText="Voltar para a página inicial"
      />
    );
  }

  return <ServiceDetail service={service} />;
}
