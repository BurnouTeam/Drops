import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faPlus,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Table from "./Table";
// import ClientInsertModal from "./ClientInsertModal";
import FilterButton from "./FilterButton";
import clients from "../data/clients"

type Client = {
  name: string;
  phone: string;
  address: string;
};


const ClientPanel: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Client | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSort = (field: keyof Client) => {
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
            placeholder="Buscar por client..."
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
        data={clients}
        headers={[
          { label: "Nome", field: "name" },
          { label: "Endereço", field: "address" },
          { label: "Telefone", field: "phone" },
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
      {/* <ClientInsertModal isOpen={isModalOpen} onClose={handleCloseModal} /> */}
    </div>
  );
};

export default ClientPanel;
