'use client';

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/authContext';
import { useToast } from '@/hooks/useToast';
import { Modal } from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FiSearch, FiPackage, FiPlus } from 'react-icons/fi';
import { 
  StockContainer,
  StockHeader,
  StockTitle,
  StockActions,
  SearchContainer,
  SearchInput,
  FormContainer,
  FormGroup,
  FormRow,
  FormActions,
  EmptyState,
  ProductGrid,
  ProductCard,
  ProductName,
  ProductPrice,
  ProductDescription,
  ProductActions,
  ProductMeta
} from '@/styles/pages/stock.styles';
import { apiGet, apiPost } from '@/lib/api/api-client';
import { delay } from '@/helpers/delay/delay';

// Dados mockados para demonstração
const mockedProducts = [
  {
    id: 'product-1',
    name: 'Notebook Dell Inspiron',
    description: 'Notebook Dell Inspiron 15 polegadas, 8GB RAM, 256GB SSD',
    price: 3499.99,
    stock: 10,
    type: 'Eletrônico',
    code: '123456789123'
  },
  {
    id: 'product-2',
    name: 'Mouse Wireless Logitech',
    description: 'Mouse sem fio com bateria de longa duração',
    price: 149.99,
    stock: 25,
    type: 'Acessório',
    code: '223256289125'
  }
];

export default function Estoque() {
  const { userLogged } = useAuthContext();
  const { notifySuccess, notifyError } = useToast();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(mockedProducts);
  
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    type: '',
    code: ''
  });
  
  // Função para lidar com mudanças no formulário
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Função para cadastrar um novo produto
  const handleCreateProduct = async () => {
    // Validação básica
    if (!productForm.name || !productForm.price) {
      notifyError('Nome e preço são obrigatórios');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Simulando uma chamada de API
      await delay(1000);
      
      // Adiciona o novo produto à lista (em uma aplicação real, isso viria da API)
      const newProduct = {
        id: `product-${Date.now()}`,
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock || '0'),
        type: productForm.type,
        code: productForm.code
      };
      
      setProducts(prev => [...prev, newProduct]);
      
      notifySuccess('Produto cadastrado com sucesso!');
      setIsModalOpen(false);
      
      // Limpa o formulário
      setProductForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        type: '',
        code: ''
      });
    } catch (error: any) {
      console.error(error);
      notifyError(error.message || 'Erro ao cadastrar produto');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Filtra produtos com base no termo de busca
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <StockContainer>
      <StockHeader>
        <StockTitle>Estoque</StockTitle>
        <StockActions>
          <SearchContainer>
            <FiSearch size={18} />
            <SearchInput 
              placeholder="Buscar produto..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          <Button 
            onClick={() => setIsModalOpen(true)}
            startIcon={<FiPlus />}
          >
            Novo Produto
          </Button>
        </StockActions>
      </StockHeader>
      
      <Card>
        {products.length === 0 ? (
          <EmptyState>
            <FiPackage size={48} />
            <p>Nenhum produto cadastrado.</p>
            <Button 
              variant="outlined" 
              onClick={() => setIsModalOpen(true)}
              startIcon={<FiPlus />}
            >
              Cadastrar Produto
            </Button>
          </EmptyState>
        ) : (
          <ProductGrid>
            {filteredProducts.map(product => (
              <ProductCard key={product.id}>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>R$ {product.price.toFixed(2)}</ProductPrice>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductMeta>
                  <span>Estoque: {product.stock} unidades</span>
                </ProductMeta>
                <ProductMeta>
                  <span>Tipo: {product.type}</span>
                </ProductMeta>
                <ProductActions>
                  <Button variant="text" size="small">
                    Editar
                  </Button>
                  <Button variant="text" size="small">
                    Excluir
                  </Button>
                </ProductActions>
              </ProductCard>
            ))}
          </ProductGrid>
        )}
      </Card>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Novo Produto"
      >
        <FormContainer>
          <FormRow>
            <FormGroup>
              <Input
                label="Nome do Produto"
                name="name"
                value={productForm.name}
                onChange={handleFormChange}
                placeholder="Nome do produto"
                fullWidth
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <Input
                label="Descrição"
                name="description"
                value={productForm.description}
                onChange={handleFormChange}
                placeholder="Descrição do produto"
                fullWidth
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <Input
                label="Preço (R$)"
                name="price"
                type="number"
                value={productForm.price}
                onChange={handleFormChange}
                placeholder="0,00"
                fullWidth
              />
            </FormGroup>
            
            <FormGroup>
              <Input
                label="Quantidade em Estoque"
                name="stock"
                type="number"
                value={productForm.stock}
                onChange={handleFormChange}
                placeholder="0"
                fullWidth
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <Input
                label="Tipo de Produto"
                name="type"
                value={productForm.type}
                onChange={handleFormChange}
                placeholder="Categoria do produto"
                fullWidth
              />
            </FormGroup>
            
            <FormGroup>
              <Input
                label="Código de Barras"
                name="code"
                value={productForm.code}
                onChange={handleFormChange}
                placeholder="Código de barras"
                fullWidth
              />
            </FormGroup>
          </FormRow>
          
          <FormActions>
            <Button 
              variant="outlined" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              isLoading={isLoading}
              onClick={handleCreateProduct}
            >
              Cadastrar
            </Button>
          </FormActions>
        </FormContainer>
      </Modal>
    </StockContainer>
  );
}
