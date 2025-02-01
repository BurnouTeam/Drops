import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faPlus,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Table from "./Table";
import ProductInsertModal from "./ProductInsertModal";
import ProductEditModal from "./ProductEditModal";
import Modal from "./Modal";
import FilterButton from "./FilterButton";
import ProductCard from "./ProductCard"
import mockedProducts from "../data/products";
import api from "../utils/api";

const ProductPanel: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Product | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Omit<Product,"status"> | null>(null);
  const [products, setProducts] = useState<Omit<Product[],"status">>([]);

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await api.get("/product/2?include=1");
      if ( response.status === 200 ) {
        setProducts( prev => response.data );
        console.log(response.data);
      }

    } catch ( error ) {
      console.error('Failed to fetch orders:', error);
    }
  }

  useEffect( () => {
    fetchProducts();
  }, [] )

  const handleOpenModal = (modal: string, data?: Omit<Product,"status">) => {
    switch (modal){
      case "new":
        setIsNewModalOpen(true)
        break;
      case "edit":
        setIsEditModalOpen(true)
        setSelectedProduct(data)
        break;
      case "delete":
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


  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };


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
            onClick={() => handleOpenModal("new")}
            className="bg-blue-500 text-white px-4 py-4 rounded-xl flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Novo Produto
          </button>
        </div>
      </div>
      <div
        className={'overflow-y-auto max-h-[700px] grid grid-cols-5 gap-4 p-4'}
        style={{ maxHeight: 'calc(100vh - 275px)' }}
      >
        {products.map((product) => (
          <ProductCard key={product.id}
            name={product.name}
            type={product.type?.name}
            price={product.price}
            quantity={product.quantity}
            status={product.quantity <= 20 && product.quantity > 0  ? "Estoque Baixo": product.quantity === 0 ? "Sem Estoque" : "Em Estoque"}
          />
        ))}
        </div>
      {/* TODO: Passar a ação ao confirmar a deleção do item */}
      <Modal isOpen={isDeleteModalOpen} data={selectedProduct?.name} title="Deletar Produto" subtitle="Você está excluindo o produto " confirmText="Apagar"  onClose={() => handleCloseModal("delete")} onConfirm={() => {}}/>
      <ProductInsertModal isOpen={isNewModalOpen} onClose={() => handleCloseModal("new")} />
      <ProductEditModal isOpen={isEditModalOpen} data={selectedProduct} onClose={() => handleCloseModal("edit")} />
    </div>
  );
};

export default ProductPanel;


      {/* <Table */}
      {/*   data={products} */}
      {/*   headers={[ */}
      {/*     { label: "Nome", field: "name" }, */}
      {/*     { label: "Tipo", field: "type" }, */}
      {/*     { label: "Valor", field: "value" }, */}
      {/*     { label: "Quantidade", field: "quantity" }, */}
      {/*     { label: "Status", field: "status" }, */}
      {/*   ]} */}
      {/*   sortField={sortField} */}
      {/*   sortOrder={sortOrder} */}
      {/*   search={search} */}
      {/*   filterType={filterType} */}
      {/*   filterStatus={filterStatus} */}
      {/*   onSort={handleSort} */}
      {/*   actions={(data) => ( */}
      {/*     <> */}
      {/*       <button className="mr-6" onClick={() => handleOpenModal("edit", data)}> */}
      {/*         <FontAwesomeIcon icon={faPen} className="text-secondary hover:text-primary" /> */}
      {/*       </button> */}
      {/*       <button onClick={() => handleOpenModal("delete", data)}> */}
      {/*         <FontAwesomeIcon icon={faTrash} className="text-secondary hover:text-red-500" /> */}
      {/*       </button> */}
      {/*     </> */}
      {/*   )} */}
      {/* /> */}
