import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import ProductInsertModal from "./ProductInsertModal";
import ProductEditModal from "./ProductEditModal";
import Modal from "./Modal";
import FilterButton from "./FilterButton";
import ProductCard from "./ProductCard"
import mockedProducts from "../data/products";
import api from "../utils/api";
import NewProductCard from "./NewProductCard";

const ProductPanel: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Product | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(mockedProducts);

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

  const handleOpenModal = (modal: string, data?: Product) => {
    switch (modal){
      case "new":
        setIsNewModalOpen(true)
        break;
      case "edit":
        setIsEditModalOpen(true)
      console.log(data);
        setSelectedProduct(data)
        break;
      case "delete":
        setSelectedProduct(data)
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

  const handleCreateProduct = (product: Product | null) => {
    if ( product ){
      setProducts( (prev) => [...prev, product] );
    }
    handleCloseModal("new");
  }

  const handleDeleteProduct = async (product: Product) => {
    try {
      const response = await api.delete(`/product/2/${product.id}`);
      if ( response.status === 200 ) {
        const remainingProducts = products.filter( (prod) => { return (product.id !== prod.id) } )
        setProducts(remainingProducts);
      }
    } catch ( error ) {
      console.error('Failed to delete product:', error);
    }
    handleCloseModal("delete");
  }


  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.type.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType ? product.type.name === filterType : true;
    const matchesStatus =
      filterStatus ? product.status === filterStatus : true;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="py-6 px-8">
      <div className="flex items-center mb-6 gap-x-4">
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
        </div>

      </div>
      <div
        className={'grid grid-cols-5 gap-4 p-4'}
        style={{ maxHeight: 'calc(100vh - 275px)' }}

      >
        <NewProductCard handleOpenModal={handleOpenModal} />
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.id}
            id={product.id}
            name={product.name}
            type={product.type?.name}
            price={product.price}
            quantity={product.quantity}
            status={product.quantity <= 20 && product.quantity > 0  ? "Estoque Baixo": product.quantity === 0 ? "Sem Estoque" : "Em Estoque"}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}


          />
        ))}
        </div>
      {/* TODO: Passar a ação ao confirmar a deleção do item */}
      <Modal isOpen={isDeleteModalOpen} products={products} data={selectedProduct?.name} title="Deletar Produto" subtitle="Você está excluindo o produto " confirmText="Apagar"  onClose={() => handleDeleteProduct(selectedProduct)} onConfirm={() => {}}/>
      <ProductInsertModal isOpen={isNewModalOpen} products={products} onClose={handleCreateProduct} />
      <ProductEditModal isOpen={isEditModalOpen} data={selectedProduct} onClose={() => handleCloseModal("edit")} />
    </div>
  );
};

export default ProductPanel;
