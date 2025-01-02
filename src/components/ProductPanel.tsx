import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faPlus,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Table from "./Table";
import ProductInsertModal from "./ProductInsertModal";
import FilterButton from "./FilterButton";

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

const ProductPanel: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Product | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="py-6 px-8">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/4">
          <input
            type="text"
            placeholder="Buscar por produto..."
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} color="gray" className="absolute inset-y-3 right-4" />
        </div>
        <div className="flex gap-8">
          <FilterButton onFilter={(type, status) => {
            setFilterType(type);
            setFilterStatus(status);
          }} />
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 text-white px-4 py-4 rounded-xl flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Novo Produto
          </button>
        </div>
      </div>
      <Table
        data={products}
        headers={[
          { label: "Nome", field: "name" },
          { label: "Tipo", field: "type" },
          { label: "Valor", field: "value" },
          { label: "Quantidade", field: "quantity" },
          { label: "Status", field: "status" },
        ]}
        sortField={sortField}
        sortOrder={sortOrder}
        search={search}
        filterType={filterType}
        filterStatus={filterStatus}
        onSort={handleSort}
        actions={(product) => (
          <>
            <button className="mr-6">
              <FontAwesomeIcon icon={faPen} className="text-secondary hover:text-primary" />
            </button>
            <button>
              <FontAwesomeIcon icon={faTrash} className="text-secondary hover:text-red-500" />
            </button>
          </>
        )}
      />
      <ProductInsertModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ProductPanel;
