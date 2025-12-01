// Funções utilitárias para trabalhar com localStorage

// Chaves para o localStorage
const KEYS = {
  EXPANDED_SECTIONS: 'expandedSections',
};

// Interface para as seções expandidas
interface ExpandedSections {
  [clientId: string]: {
    serviceHistory: boolean;
    purchaseHistory: boolean;
  };
}

// Função para verificar se estamos no navegador
const isBrowser = (): boolean => typeof window !== 'undefined';

// Função para obter as seções expandidas do localStorage
export const getExpandedSections = (): ExpandedSections => {
  if (!isBrowser()) return {};

  try {
    const storedValue = window.localStorage.getItem(KEYS.EXPANDED_SECTIONS);
    return storedValue ? JSON.parse(storedValue) : {};
  } catch (error) {
    console.error('Erro ao ler seções expandidas do localStorage:', error);
    return {};
  }
};

// Função para salvar as seções expandidas no localStorage
export const saveExpandedSections = (sections: ExpandedSections): void => {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(KEYS.EXPANDED_SECTIONS, JSON.stringify(sections));
  } catch (error) {
    console.error('Erro ao salvar seções expandidas no localStorage:', error);
  }
};

// Função para verificar se uma seção está expandida
export const isSectionExpanded = (
  clientId: string,
  section: 'serviceHistory' | 'purchaseHistory'
): boolean => {
  if (!isBrowser()) return false;

  const sections = getExpandedSections();
  return sections[clientId]?.[section] || false;
};

// Função para definir se uma seção está expandida
export const setSectionExpanded = (
  clientId: string,
  section: 'serviceHistory' | 'purchaseHistory',
  expanded: boolean
): void => {
  if (!isBrowser()) return;

  const sections = getExpandedSections();

  // Inicializa o objeto para o cliente se não existir
  if (!sections[clientId]) {
    sections[clientId] = {
      serviceHistory: false,
      purchaseHistory: false,
    };
  }

  // Atualiza o estado da seção
  sections[clientId][section] = expanded;

  // Salva no localStorage
  saveExpandedSections(sections);
};
