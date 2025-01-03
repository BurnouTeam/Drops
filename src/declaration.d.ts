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
