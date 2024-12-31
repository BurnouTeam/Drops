import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faSortUp, faSortDown, faSort, faPen, faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";

import ProductInsertModal from "./ProductInsertModal.tsx"
import FilterButton from "./FilterButton.tsx"


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

const Table = () => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Product | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const handleFilter = (type: string | null, status: string | null) => {
    setFilterType(type);
    setFilterStatus(status);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

const filteredProducts = products
  .filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType ? product.type === filterType : true;
    const matchesStatus = filterStatus ? product.status === filterStatus : true;
    return matchesSearch && matchesType && matchesStatus;
  })
  .sort((a, b) => {
    if (!sortField) return 0;
    const valueA = a[sortField];
    const valueB = b[sortField];
    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    }
    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    return 0;
  });

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
          <div className="relative w-1/4">
            <input
              type="text"
              placeholder="Buscar por produto..."
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} color="gray" className="absolute inset-y-3 right-4"/>
          </div>
        <div className="flex gap-8">
          {/* <button className="bg-white-500 text-black px-4 py-4 rounded-xl flex items-center shadow"> */}
          {/*   <FontAwesomeIcon icon={faFilter} className="mr-2" /> Filtros */}
          {/* </button> */}
          <FilterButton onFilter={handleFilter}/>
          <button onClick={handleOpenModal} className="bg-blue-500 text-white px-4 py-4 rounded-xl flex items-center">
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Novo Produto
          </button>
        </div>
      </div>
      <table className="table-auto w-full bg-white shadow-sm">
        <thead className="bg-custom_light_gray ">
          <tr>
            {[
              { label: "Nome", field: "name" },
              { label: "Tipo", field: "type" },
              { label: "Valor", field: "value" },
              { label: "Quantidade", field: "quantity" },
              { label: "Status", field: "status" },
            ].map(({ label, field }, index) => (
              <th
                key={index}
                className="px-4 py-2 cursor-pointer text-left first:rounded-l-full"
                onClick={() => handleSort(field as keyof Product)}
              >
                {label}{" "}
                {sortField === field ? (
                  sortOrder === "asc" ? (
                    <FontAwesomeIcon icon={faSortUp} className="ml-1" />
                  ) : (
                    <FontAwesomeIcon icon={faSortDown} className="ml-1" />
                  )
                ) : <FontAwesomeIcon icon={faSort} className="ml-1" />
                }
              </th>
            ))}
            <th className="px-4 py-2 rounded-r-full"></th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={index} className="text-left border-b-gray-300 border-b">
              <td className="px-4 py-8">{product.name}</td>
              <td className="px-4 py-8">{product.type}</td>
              <td className="px-4 py-8">{product.value}</td>
              <td className="px-4 py-8">{product.quantity}</td>
              <td
                className={`px-4 py-2 font-semibold ${
                  product.status === "Em Estoque"
                    ? "text-green-600"
                    : product.status === "Baixo Estoque"
                    ? "text-orange-500"
                    : "text-red-500"
                }`}
              >
                {product.status}
              </td>
              <td className="px-4 py-2 text-center ">
                <button className="mr-6">
                  <FontAwesomeIcon icon={faPen} className="text-secondary hover:text-primary"/>
                </button>
                <button className="">
                  <FontAwesomeIcon icon={faTrash} className="text-secondary hover:text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ProductInsertModal isOpen={isModalOpen} onClose={handleCloseModal}/>
    </div>
  );
};

export default Table;

