type Product = {
  name: string;
  type: string;
  value: string;
  quantity: number;
  status: "Em Estoque" | "Baixo Estoque" | "Sem Estoque";
};

const products: Product[] = [
  { name: "Naturágua", type: "20L", value: "R$ 13,00", quantity: 100, status: "Em Estoque" },
  { name: "Naturágua", type: "5L", value: "R$ 5,00", quantity: 50, status: "Em Estoque" },
  { name: "Serra Grande", type: "20L", value: "R$ 10,00", quantity: 20, status: "Em Estoque" },
  { name: "Límpida", type: "20L", value: "R$ 9,00", quantity: 20, status: "Em Estoque" },
  { name: "Água Azul", type: "20L", value: "R$ 9,00", quantity: 5, status: "Baixo Estoque" },
  { name: "Pacoty", type: "20L", value: "R$ 10,00", quantity: 20, status: "Em Estoque" },
  { name: "Indaiá", type: "20L", value: "R$ 13,00", quantity: 0, status: "Sem Estoque" },
];

export default products;
