"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";
import { customerWithHistory } from "@/mocks/customerMock";

interface CustomerContextType {
    setCustomerInfo: (customer: any) => void;
    customer: any;
    useMockData: boolean;
    setUseMockData: (use: boolean) => void;
    mockCustomer: any;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

interface CustomerContextProviderProps {
  children: ReactNode;
}

export function CustomerContextProvider({ children }: CustomerContextProviderProps) {
  const [customer, setCustomer] = useState<any>(null);
  const [useMockData, setUseMockData] = useState<boolean>(false);

  // Usando o mock do cliente importado do arquivo customerMock.ts
  const mockCustomer = customerWithHistory;

  const setCustomerInfo = (customer: any) => {
    setCustomer(customer);
  };

  return (
    <CustomerContext.Provider value={{ setCustomerInfo, customer, useMockData, setUseMockData, mockCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
}

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("CustomerContext must be used within a CustomerContextProvider");
  }
  return context;
};
