declare module '*.svg' {
  import { ReactComponent as ReactComponent } from 'react';
  export { ReactComponent };
}

type Product = {
  id: number;
  name: string;
  type: Omit<ProductType, 'organizationId | id'>
  price: number;
  quantity: number;
  status: "Em Estoque" | "Baixo Estoque" | "Sem Estoque";
};

type ProductType = {
  id: number;
  name: string;
  organizationId: number;
};

type OrderContainer = {
  pending: Order[];
  shipped: Order[];
  completed: Order[];
  recused: Order[];
}
type OrderItem = {
  id: number,
  orderId: number,
  product: Item,
  price: number,
  quantity: number,
  details: string,
}
type Item = {
  id: number,
  name: string,
  quantity: number,
  price: number,
  details: string,
}

type Order = {
  client: Client;
  createdAt: string;
  id: number;
  organizationId: number;
  items: OrderItem[];
  clientId: string;
  totalPrice: number;
  default: boolean;
  paymentMethod: PaymentMethod;
  customer: Client;
  status: string
  payment: string;
  updatedAt: string;
}

enum PaymentMethod {
  PIX = 'PIX',
  CREDIT_CARD = 'CREDIT_CARD',
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER'
}

type Client = {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  profilePhoto: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  country: string;
};
