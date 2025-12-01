"use client";

import { useParams } from "next/navigation";
import { useCustomerContext } from "@/context/customerContext";
import { useAuthContext } from "@/context/authContext";
import { useClient } from "@/hooks/api/useClients";
import { isSectionExpanded, setSectionExpanded } from "@/utils/localStorageUtils";
import NotFound from "@/components/ui/NotFound";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from "react";
import { MaskedInput } from "@/components/ui";
import Link from "next/link";
import Loading from "@/components/ui/Loading";
import { apiPatch } from "@/lib/api/api-client";
import { capitalizeWords } from "@/helpers/captalizeWords";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/Button";
import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiMapPin,
  FiPhone,
  FiCalendar,
  FiEdit2,
  FiX,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiShoppingBag,
  FiDollarSign,
  FiTool
} from "react-icons/fi";

import {
  ClientDetailContainer,
  ClientDetailHeader,
  ClientDetailTitle,
  ClientDetailSubtitle,
  ClientDetailActions,
  ClientDetailContent,
  ClientDetailSection,
  ClientDetailSectionHeader,
  ClientDetailSectionTitle,
  ClientDetailSectionToggle,
  ClientInfoGrid,
  ClientInfoItem,
  ClientInfoLabel,
  ClientInfoValue,
  ClientInfoEdit,
  ClientInfoInput,
  SalesHistoryList,
  SaleItem,
  SaleHeader,
  SaleTitle,
  SaleDate,
  SaleInfo,
  SaleAmount,
  SaleStatus,
  EmptyState,
  BackButton,
  ActionButton,
  EditIcon,
  EditActions,
  SaveButton,
  CancelButton
} from "./styles";

export default function ClientDetailPage() {
  const { setCustomerInfo, customer, useMockData, setUseMockData, mockCustomer } = useCustomerContext();
  const { id } = useParams();
  const clientIdString = id as string;

  // Usar React Query para carregar os dados do cliente
  const { data: clientData, isLoading: isClientLoading, isError: isClientError } = useClient(clientIdString);

  // Se useMockData estiver ativado, use os dados mockados, caso contrário use os dados do React Query ou do contexto
  const currentClient = useMockData ? mockCustomer : (clientData || customer);

  const toggleMockData = () => {
    setUseMockData(!useMockData);
  };
  const { userLogged } = useAuthContext();
  const { notifySuccess, notifyError } = useToast();

  const [infoToEdit, setInfoToEdit] = useState('');
  const [tagToEdit, setTagToEdit] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Estados locais para controlar a exibição das seções
  const [showPersonalData, setShowPersonalData] = useState(true);
  const [showServiceHistory, setShowServiceHistory] = useState(() =>
    isSectionExpanded(clientIdString, 'serviceHistory')
  );
  const [showPurchaseHistory, setShowPurchaseHistory] = useState(() =>
    isSectionExpanded(clientIdString, 'purchaseHistory')
  );

  // Funções para alternar a exibição das seções
  const toggleServiceHistory = () => {
    const newState = !showServiceHistory;
    setShowServiceHistory(newState);
    setSectionExpanded(clientIdString, 'serviceHistory', newState);
  };

  const togglePurchaseHistory = () => {
    const newState = !showPurchaseHistory;
    setShowPurchaseHistory(newState);
    setSectionExpanded(clientIdString, 'purchaseHistory', newState);
  };

  const handleEditButtonClick = (tag: string) => {
    setTagToEdit(tag);
    setInfoToEdit(currentClient[tag] || '');
  };

  const handleUpdateInfo = async () => {
    try {
      if (!infoToEdit || infoToEdit === currentClient[tagToEdit]) {
        setTagToEdit('');
        return;
      }

      setIsLoading(true);

      const body = {
        company_id: userLogged?.company_id,
        id: currentClient?.id,
        field: tagToEdit,
        data: infoToEdit
      };

      await apiPatch("/customer", body);
      const capitalizedWordsIfNeeded = tagToEdit === 'customer_name' ? capitalizeWords(infoToEdit) : infoToEdit;

      setCustomerInfo((prev: any) => ({
        ...prev,
        [tagToEdit]: capitalizedWordsIfNeeded
      }));

      notifySuccess('Informação atualizada com sucesso!', 2000);
      setTagToEdit('');
    } catch (error: any) {
      notifyError(
        error?.response?.data?.message && Array.isArray(error.response.data.message)
          ? error.response.data.message[0]
          : error?.response?.data?.message, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEdit = () => {
    setTagToEdit('');
    setInfoToEdit('');
  };

  // Quando os dados do cliente são carregados, atualizamos o contexto
  useEffect(() => {
    if (clientData && !useMockData) {
      setCustomerInfo(clientData);
    }
  }, [clientData, setCustomerInfo, useMockData]);



  const renderEditableField = (fieldKey: string, label: string, icon: React.ReactNode, mask?: string) => {
    const isEditing = tagToEdit === fieldKey;
    const value = currentClient[fieldKey] || '-';

    // Função para renderizar o campo de entrada com ou sem máscara
    const renderInput = () => {
      if (mask) {
        // Para campos com máscara, usamos o MaskedInput
        return (
          <MaskedInput
            mask={mask}
            value={infoToEdit || ''}
            onChange={(e) => setInfoToEdit(e.target.value)}
            placeholder={`Digite o ${label.toLowerCase()}...`}
            autoFocus
          />
        );
      } else {
        return (
          <ClientInfoInput
            type="text"
            value={infoToEdit}
            onChange={(e) => setInfoToEdit(e.target.value)}
            autoFocus
            placeholder={`Digite o ${label.toLowerCase()}...`}
          />
        );
      }
    };

    return (
      <ClientInfoItem>
        <ClientInfoLabel>{label}</ClientInfoLabel>
        {isEditing ? (
          <ClientInfoEdit>
            {renderInput()}
            {isLoading ? (
              <Loading size="small" />
            ) : (
              <EditActions>
                <SaveButton onClick={handleUpdateInfo} title="Salvar">
                  <FiCheck size={16} />
                </SaveButton>
                <CancelButton onClick={cancelEdit} title="Cancelar">
                  <FiX size={16} />
                </CancelButton>
              </EditActions>
            )}
          </ClientInfoEdit>
        ) : (
          <ClientInfoValue>
            {icon}
            {value}
            <EditIcon
              onClick={() => handleEditButtonClick(fieldKey)}
              title={`Editar ${label.toLowerCase()}`}
            >
              <FiEdit2 size={16} />
            </EditIcon>
          </ClientInfoValue>
        )}
      </ClientInfoItem>
    );
  };

  // Exibir loading enquanto os dados estão sendo carregados
  if (isClientLoading) {
    return (
      <ClientDetailContainer>
        <Loading fullScreen text="Carregando informações do cliente..." />
      </ClientDetailContainer>
    );
  }

  // Exibir mensagem de erro se o cliente não for encontrado
  if (isClientError || (!useMockData && !currentClient)) {
    return (
      <NotFound
        title="Cliente não encontrado"
        message="O cliente que você está procurando não foi encontrado ou não existe."
        backUrl="/clientes"
        backText="Voltar para lista de clientes"
      />
    );
  }

  return (
    <ClientDetailContainer>
      <ClientDetailHeader>
        <div>
          <Link href="/clientes">
            <BackButton>
              <FiArrowLeft size={18} />
              Voltar para lista de clientes
            </BackButton>
          </Link>
          <ClientDetailTitle>{currentClient.customer_name}</ClientDetailTitle>
          <ClientDetailSubtitle>
            <FiCalendar size={14} />
            Cliente desde {format(new Date(currentClient.created_at), 'dd MMMM yyyy', { locale: ptBR })}
          </ClientDetailSubtitle>
        </div>
        <div>
          <Button
            variant="outlined"
            size="small"
            onClick={toggleMockData}
          >
            {useMockData ? 'Usar dados reais' : 'Usar dados de exemplo'}
          </Button>
        </div>
        {currentClient.sales && currentClient.sales.length > 0 && (
          <ClientDetailActions>
            <ActionButton>
              <FiShoppingBag />
              Nova Venda
            </ActionButton>
          </ClientDetailActions>
        )}
      </ClientDetailHeader>

      <ClientDetailContent>
        <div>
          <ClientDetailSection>
            <ClientDetailSectionHeader>
              <ClientDetailSectionTitle>
                <FiUser size={20} />
                Dados Pessoais
              </ClientDetailSectionTitle>
              <ClientDetailSectionToggle
                onClick={() => setShowPersonalData(!showPersonalData)}
                title={showPersonalData ? "Esconder dados" : "Mostrar dados"}
              >
                {showPersonalData ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
              </ClientDetailSectionToggle>
            </ClientDetailSectionHeader>

            {showPersonalData && (
              <ClientInfoGrid>
                {renderEditableField('customer_name', 'Nome', <FiUser size={16} />)}
                {renderEditableField('customer_email', 'Email', <FiMail size={16} />)}
                {renderEditableField('customer_address', 'Endereço', <FiMapPin size={16} />)}
                {renderEditableField('customer_address_number', 'Número', <FiMapPin size={16} />)}
                {renderEditableField('customer_neighborhood', 'Bairro', <FiMapPin size={16} />)}
                {renderEditableField('customer_city', 'Cidade', <FiMapPin size={16} />)}
                {renderEditableField('customer_state', 'Estado', <FiMapPin size={16} />)}
                {renderEditableField('customer_cep', 'CEP', <FiMapPin size={16} />, '99999-999')}
                {renderEditableField('customer_phone_number', 'Telefone', <FiPhone size={16} />, '(99) 99999-9999')}
                {renderEditableField('customer_cpf', 'CPF', <FiUser size={16} />, '999.999.999-99')}
              </ClientInfoGrid>
            )}
          </ClientDetailSection>

          <ClientDetailSection>
            <ClientDetailSectionHeader>
              <ClientDetailSectionTitle>
                <FiTool size={20} />
                Histórico de Serviços
              </ClientDetailSectionTitle>
              <ClientDetailSectionToggle
                onClick={toggleServiceHistory}
                title={showServiceHistory ? "Esconder histórico" : "Mostrar histórico"}
              >
                {showServiceHistory ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
              </ClientDetailSectionToggle>
            </ClientDetailSectionHeader>

            {showServiceHistory && (
              <>
                {currentClient.services && currentClient.services.length > 0 ? (
                  <SalesHistoryList>
                    {currentClient.services.map((service: any) => (
                      <Link
                        href={`/servicos/${service.id}?cliente=${currentClient.id}`}
                        key={service.id}
                        style={{ textDecoration: 'none' }}
                      >
                        <SaleItem title="Ver detalhes do serviço">
                          <SaleHeader>
                            <SaleTitle>{service.service_name}</SaleTitle>
                            <SaleDate>{format(new Date(service.created_at), 'dd/MM/yyyy', { locale: ptBR })}</SaleDate>
                          </SaleHeader>
                          <SaleInfo>
                            <SaleAmount>
                              <FiDollarSign size={18} />
                              R$ {service.price.toFixed(2)}
                            </SaleAmount>
                            <SaleStatus $status={service.status === 'completed' ? 'paid' : service.status === 'in_progress' ? 'pending' : 'scheduled'}>
                              {service.status === 'completed' ? 'Concluído' :
                               service.status === 'in_progress' ? 'Em andamento' : 'Agendado'}
                            </SaleStatus>
                          </SaleInfo>
                          <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
                            {service.description}
                          </p>
                          <p style={{ marginTop: '4px', fontSize: '14px', color: '#666' }}>
                            <strong>Técnico:</strong> {service.technician_name}
                          </p>
                        </SaleItem>
                      </Link>
                    ))}
                  </SalesHistoryList>
                ) : (
                  <EmptyState>
                    <FiTool size={48} />
                    <p>Este cliente ainda não possui serviços registrados.</p>
                    <ActionButton>
                      <FiTool />
                      Registrar Novo Serviço
                    </ActionButton>
                  </EmptyState>
                )}
              </>
            )}
          </ClientDetailSection>
        </div>

        <div>
          <ClientDetailSection>
            <ClientDetailSectionHeader>
              <ClientDetailSectionTitle>
                <FiShoppingBag size={20} />
                Histórico de Compras
              </ClientDetailSectionTitle>
              <ClientDetailSectionToggle
                onClick={togglePurchaseHistory}
                title={showPurchaseHistory ? "Esconder histórico" : "Mostrar histórico"}
              >
                {showPurchaseHistory ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
              </ClientDetailSectionToggle>
            </ClientDetailSectionHeader>

            {showPurchaseHistory && (
              <>
                {currentClient.sales && currentClient.sales.length > 0 ? (
                  <SalesHistoryList>
                    {currentClient.sales.map((sale: any) => (
                      <Link
                        href={`/vendas/${sale.id}?cliente=${currentClient.id}`}
                        key={sale.id}
                        style={{ textDecoration: 'none' }}
                      >
                        <SaleItem title="Ver detalhes da compra">
                          <SaleHeader>
                            <SaleTitle>Venda #{sale.id.substring(0, 8)}</SaleTitle>
                            <SaleDate>{format(new Date(sale.created_at), 'dd/MM/yyyy', { locale: ptBR })}</SaleDate>
                          </SaleHeader>
                          <SaleInfo>
                            <SaleAmount>
                              <FiDollarSign size={18} />
                              R$ {sale.total_amount.toFixed(2)}
                            </SaleAmount>
                            <SaleStatus $status={sale.status || 'paid'}>
                              {sale.status === 'paid' ? 'Pago' :
                               sale.status === 'pending' ? 'Pendente' : 'Cancelado'}
                            </SaleStatus>
                          </SaleInfo>
                        </SaleItem>
                      </Link>
                    ))}
                  </SalesHistoryList>
                ) : (
                  <EmptyState>
                    <FiShoppingBag size={48} />
                    <p>Este cliente ainda não realizou nenhuma compra.</p>
                    <ActionButton>
                      <FiShoppingBag />
                      Registrar Primeira Venda
                    </ActionButton>
                  </EmptyState>
                )}
              </>
            )}
          </ClientDetailSection>
        </div>
      </ClientDetailContent>
    </ClientDetailContainer>
  );
}
