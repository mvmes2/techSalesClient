// Importando os serviços do mock de serviços
import { getServicesByCustomerId } from './services/servicesMock';

// Cliente com histórico completo
export const customerWithHistory = {
  id: "customer1",
  customer_name: 'Maria Silva',
  customer_email: 'maria.silva@email.com',
  customer_phone_number: '(11) 98765-4321',
  customer_address: 'Rua das Flores',
  customer_address_number: '123',
  customer_neighborhood: 'Jardim Primavera',
  customer_cep: '01234-567',
  customer_cpf: '123.456.789-00',
  created_at: new Date().toISOString(),
  sales: [
    {
      id: "sale1",
      created_at: new Date().toISOString(),
      total_amount: 1250.99,
      status: 'paid',
      items: [
        {
          id: "item1",
          product_name: 'Smartphone Samsung Galaxy A54',
          quantity: 1,
          price: 1250.99
        }
      ]
    },
    {
      id: "sale2",
      created_at: new Date().toISOString(),
      total_amount: 89.90,
      status: 'paid',
      items: [
        {
          id: "item2",
          product_name: 'Carregador USB-C',
          quantity: 1,
          price: 49.90
        },
        {
          id: "item3",
          product_name: 'Película de Vidro',
          quantity: 1,
          price: 40.00
        }
      ]
    }
  ],
  // Usando a função do mock de serviços para obter os serviços do cliente
  get services() {
    return getServicesByCustomerId(this.id);
  }
};

// Função para obter um cliente pelo ID
export const getMockCustomerById = (id: string) => {
  return customerWithHistory;
};
