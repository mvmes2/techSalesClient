// Mock de dados para serviços seguindo a estrutura do schema Prisma
import { format } from 'date-fns';

// Tipos baseados no schema Prisma
export interface ServicePart {
  id: string;
  name: string;
  quantity: number;
  cost_price: number;
  sale_price: number;
  markup: number;
  product_id?: string; // Referência ao produto no estoque, se existir
}

export interface ServiceOrderItem {
  id: string;
  service_name: string;
  description: string;
  value: number;
}

export interface ServiceOrderChartItem {
  id: string;
  service_order_chart_id: string;
  service_order_item_id: string;
  service_order_item: ServiceOrderItem;
  quantity: number;
}

export interface ProductChartItem {
  id: string;
  product_chart_id: string;
  product_id: string;
  product: {
    id: string;
    product_name: string;
    product_brand?: string;
    description?: string;
    bought_value?: number;
    sell_value: number;
  };
  quantity: number;
  service_order_chart_id?: string;
}

export interface ServiceOrderChart {
  id: string;
  service_name: string;
  description: string;
  value: number;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
  service_order_items: ServiceOrderChartItem[];
  product_chart_items: ProductChartItem[];
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  technician_name: string;
  client_name: string;
  client_document?: string;
  client_phone?: string;
  client_id?: string;
  conclusion?: string;
  authorization_image?: string;
}

// Mock de dados para serviços
export const mockServiceOrderCharts: ServiceOrderChart[] = [
  {
    id: "service1",
    service_name: "Substituição de tela quebrada do smartphone",
    description: "Substituição de tela quebrada do smartphone",
    value: 350.00,
    created_at: "2023-10-01T10:00:00Z",
    updated_at: "2023-10-03T14:30:00Z",
    status: "completed",
    technician_name: "Carlos Silva",
    client_name: "Cliente Utilizador",
    client_document: "000.000.000-00",
    client_phone: "(00) 00000-0000",
    client_id: "customer1",
    conclusion: "Tela substituída com sucesso. Calibração e testes realizados. Funcionamento normal.",
    service_order_items: [
      {
        id: "soi1",
        service_order_chart_id: "service1",
        service_order_item_id: "si1",
        service_order_item: {
          id: "si1",
          service_name: "Mão de obra para troca de tela",
          description: "Serviço de substituição de tela incluindo calibração e testes",
          value: 100.00
        },
        quantity: 1
      }
    ],
    product_chart_items: [
      {
        id: "pci1",
        product_chart_id: "pc1",
        product_id: "p1",
        product: {
          id: "p1",
          product_name: "Tela LCD Samsung Galaxy A54",
          product_brand: "Samsung",
          description: "Tela LCD original para Samsung Galaxy A54",
          bought_value: 200.00,
          sell_value: 250.00
        },
        quantity: 1,
        service_order_chart_id: "service1"
      },
      {
        id: "pci2",
        product_chart_id: "pc1",
        product_id: "p2",
        product: {
          id: "p2",
          product_name: "Kit de ferramentas para reparo",
          description: "Kit básico de ferramentas para reparo de smartphones",
          bought_value: 0,
          sell_value: 0
        },
        quantity: 1,
        service_order_chart_id: "service1"
      }
    ]
  },
  {
    id: "service2",
    service_name: "Reparo de placa-mãe de notebook",
    description: "Notebook não liga, possível problema na placa-mãe",
    value: 345.00,
    created_at: "2023-10-05T09:30:00Z",
    updated_at: "2023-10-06T11:45:00Z",
    status: "in_progress",
    technician_name: "Roberto Almeida",
    client_name: "Maria Silva",
    client_document: "111.222.333-44",
    client_phone: "(11) 98765-4321",
    client_id: "customer1",
    service_order_items: [
      {
        id: "soi2",
        service_order_chart_id: "service2",
        service_order_item_id: "si2",
        service_order_item: {
          id: "si2",
          service_name: "Mão de obra para reparo de placa-mãe",
          description: "Serviço de diagnóstico e reparo de placa-mãe de notebook",
          value: 150.00
        },
        quantity: 1
      }
    ],
    product_chart_items: [
      {
        id: "pci3",
        product_chart_id: "pc2",
        product_id: "p3",
        product: {
          id: "p3",
          product_name: "Capacitor 470uF",
          product_brand: "Eletronic Parts",
          description: "Capacitor eletrolítico 470uF 16V",
          bought_value: 5.00,
          sell_value: 15.00
        },
        quantity: 3,
        service_order_chart_id: "service2"
      },
      {
        id: "pci4",
        product_chart_id: "pc2",
        product_id: "p4",
        product: {
          id: "p4",
          product_name: "Chip de vídeo",
          product_brand: "NVIDIA",
          description: "Chip de vídeo para notebook",
          bought_value: 120.00,
          sell_value: 180.00
        },
        quantity: 1,
        service_order_chart_id: "service2"
      }
    ]
  }
];

// Função para adaptar o formato do ServiceOrderChart para o formato esperado pelo componente ServiceDetail
export const adaptServiceForDetail = (service: ServiceOrderChart) => {
  // Mapear as peças do formato do Prisma para o formato esperado pelo componente
  const parts = service.product_chart_items.map(item => ({
    id: item.id,
    name: item.product.product_name,
    quantity: item.quantity,
    cost_price: item.product.bought_value || 0,
    sale_price: item.product.sell_value,
    markup: item.product.bought_value ? 
      ((item.product.sell_value - item.product.bought_value) / item.product.bought_value) * 100 : 0
  }));

  // Calcular o custo total das peças
  const parts_cost = parts.reduce((acc, part) => acc + (part.cost_price * part.quantity), 0);
  
  // Calcular o custo da mão de obra
  const labor_cost = service.service_order_items.reduce(
    (acc, item) => acc + (item.service_order_item.value * item.quantity), 
    0
  );

  // Mapear para o formato esperado pelo componente
  return {
    id: service.id,
    title: service.service_name,
    description: service.description,
    status: service.status === 'completed' ? 'Concluído' : 
            service.status === 'in_progress' ? 'Em andamento' : 
            service.status === 'pending' ? 'Pendente' : 'Cancelado',
    created_at: service.created_at,
    updated_at: service.updated_at || service.created_at,
    conclusion: service.conclusion || '',
    client_name: service.client_name,
    client_document: service.client_document || '',
    client_phone: service.client_phone || '',
    technician_name: service.technician_name,
    parts,
    parts_cost,
    labor_cost,
    price: service.value
  };
};

// Função para adaptar o formato do ServiceOrderChart para o formato esperado pelo histórico de serviços do cliente
export const adaptServiceForCustomerHistory = (service: ServiceOrderChart) => {
  return {
    id: service.id,
    created_at: service.created_at,
    service_name: service.service_name,
    description: service.description,
    status: service.status,
    price: service.value,
    technician_name: service.technician_name
  };
};

// Função para buscar um serviço pelo ID
export const getServiceById = (id: string) => {
  const service = mockServiceOrderCharts.find(service => service.id === id);
  return service ? adaptServiceForDetail(service) : null;
};

// Função para buscar todos os serviços
export const getAllServices = () => {
  return mockServiceOrderCharts.map(service => adaptServiceForDetail(service));
};

// Função para buscar serviços de um cliente pelo ID do cliente
export const getServicesByCustomerId = (customerId: string) => {
  const services = mockServiceOrderCharts.filter(service => service.client_id === customerId);
  return services.map(service => adaptServiceForCustomerHistory(service));
};
