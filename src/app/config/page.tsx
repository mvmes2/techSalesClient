"use client";

import { useAuthContext } from "@/context/authContext";
import { Card } from "@/components/ui/Card";
import {
  ConfigContainer,
  ConfigHeader,
  ConfigTitle,
  ConfigContent
} from "@/styles/pages/config.styles";

export default function ConfigPage() {
  const { userLogged } = useAuthContext();

  return (
    <ConfigContainer>
      <ConfigHeader>
        <ConfigTitle>Configurações</ConfigTitle>
      </ConfigHeader>

      <Card>
        <ConfigContent>
          <h2>Configurações do Sistema</h2>
          <p>Esta página permite configurar as preferências do sistema.</p>

          <h3>Informações do Usuário</h3>
          <p>Nome: {userLogged?.name}</p>
          <p>Email: {userLogged?.email}</p>

          <h3>Informações da Empresa</h3>
          <p>Empresa: {userLogged?.company?.company_name || userLogged?.company_name}</p>
        </ConfigContent>
      </Card>
    </ConfigContainer>
  );
}
