import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faComment,
  faPen,
  faPlus,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Table from "./Table";
import ClientInsertModal from "./ClientInsertModal";
import api from "../utils/api";
import clients2 from "../data/clients"
import Modal from "./Modal";
import ClientEditModal from "./ClienEditModal";



const ClientPanel: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Client | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [clients, setClients] = useState<Client[]>([]);


  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const fetchClients = async (): Promise<void> => {
    try {
      const response = await api.get("/client/2?include=1");
      if ( response.status === 200 ) {
        setClients(prev => response.data)
      }

    } catch ( error ) {
      console.error('Failed to fetch orders:', error);
    }
  }

  useEffect( () => {
    fetchClients();
  }, [] )


  const handleCreateClient = (client: Client | null) => {
    if ( client ){
      setClients( (prev) => [...prev, client] );
    }
    handleCloseModal("new");
  }

  const handleDeleteProduct = async (client: Client | null) => {
    console.log(client);
    try {
      const response = await api.delete(`/client/2/${client?.phoneNumber}`);
      if ( response.status === 200 ) {
        const remainingClients = clients.filter( (cli: Client) => { return (client?.phoneNumber !== cli.phoneNumber) } )
        setClients(remainingClients);
      }
    } catch ( error ) {
      console.error('Failed to delete product:', error);
    }
    handleCloseModal("delete");
  }
  const handleSort = (field: keyof Client) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleOpenModal = (modal: string, data?: Client | null) => {
    switch (modal){
      case "new":
        setIsNewModalOpen(true)
        break;
      case "edit":
        if (data) setSelectedClient(data)
        setIsEditModalOpen(true)
        break;
      case "delete":
        if (data) setSelectedClient(data)
        setIsDeleteModalOpen(true)
        break;
      default:
        break;
    }
  };
  const handleCloseModal = (modal: string) => {
    switch (modal){
      case "new":
        setIsNewModalOpen(false)
        break;
      case "edit":
        setIsEditModalOpen(false)
        break;
      case "delete":
        setIsDeleteModalOpen(false)
        break;
    }
  };


  useEffect( () => {
    fetchClients();
  }, [] )

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
          <button
            onClick={() => handleOpenModal("new")}
            className="bg-blue-500 text-white px-4 py-4 rounded-xl flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Novo Cliente
          </button>
        </div>
      </div>
      <Table
        data={clients}
        headers={[
          { label: "Nome", field: "name" },
          { label: "Endereço", field: ["street", "neighborhood","complement","cep"] },
          { label: "Telefone", field: "phoneNumber" },
        ]}
        sortField={sortField}
        sortOrder={sortOrder}
        search={search}
        filterType={filterType}
        filterStatus={filterStatus}
        onSort={handleSort}
        actions={(client) => (
          <>
            <button className="mr-6 relative group">
              <FontAwesomeIcon icon={faComment} className="text-secondary hover:text-primary" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50">
                Mandar Mensagem
              </div>
            </button>
            <button className="mr-6 relative group" onClick={ () => handleOpenModal("edit", client) }>
              <FontAwesomeIcon icon={faPen} className="text-secondary hover:text-primary" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50">
                Editar
              </div>
            </button>
            <button className="relative group" onClick={ () => handleOpenModal("delete", client) }>
              <FontAwesomeIcon icon={faTrash} className="text-secondary hover:text-red-500" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50">
                Excluir
              </div>
            </button>
          </>
        )}
      />
      <Modal isOpen={isDeleteModalOpen} data={selectedClient?.name} title="Deletar Cliente" subtitle="Você está excluindo o cliente " confirmText="Apagar"  onClose={() => handleCloseModal("delete")} onConfirm={() => handleDeleteProduct(selectedClient)}/>
      <ClientInsertModal isOpen={isNewModalOpen} onClose={handleCreateClient} />
      <ClientEditModal isOpen={isEditModalOpen} data={selectedClient} onClose={() => handleCloseModal("edit")} />
    </div>
  );
};

export default ClientPanel;
