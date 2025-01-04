declare module '*.svg' {
  import { ReactComponent as ReactComponent } from 'react';
  export { ReactComponent };
}

type Product = {
  name: string;
  type: string;
  value: number;
  quantity: number;
  status: "Em Estoque" | "Baixo Estoque" | "Sem Estoque";
};

type OrderContainer = {
  pending: Order[];
  shipped: Order[];
  completed: Order[];
}

type Order = {
  orderId: string;
  quantity: number;
  product: string;
  customer: string;
  phone: string;
  address: string;
  price: number;
  payment: string;
  time: string;
}

type Client = {
  name: string;
  phone: string;
  address: string;
};
