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
import api from "../utils/api";
import Modal from "./Modal";
import UserInsertModal from "./UserInsertModal";
import UserEditModal from "./UserEditModal";



const UserPanel: React.FC = () => {
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState([]);
  const [sortField, setSortField] = useState<keyof User | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);


  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await api.get("/user/2?include=1");
      if ( response.status === 200 ) {
        setUsers(prev => response.data)
      }

    } catch ( error ) {
      console.error('Failed to fetch orders:', error);
    }
  }

  const fetchRoles = async (): Promise<void> => {
    try {
      const response = await api.get("/user/role/2");
      console.log(response)
      if ( response.status === 200 ) {
        setRoles(response.data)
      }

    } catch ( error ) {
      console.error('Failed to fetch orders:', error);
    }
  }

  useEffect( () => {
    fetchUsers();
  }, [] )

  useEffect( () => {
    fetchRoles();
  }, [] )


  const handleCreateUser = (user: User | null) => {
    if ( user ){
      setUsers( (prev) => [...prev, user] );
    }
    handleCloseModal("new");
  }

  const handleEditUser = (user: User | null) => {
    if ( user ){
      setUsers((prevUsers) =>
          prevUsers.map((userOld) =>
            userOld.id === user.id ? { ...user } : userOld
        ))
      }
      handleCloseModal("edit");
  }
  const handleRoleChange = (id: number, roleId: number) => {
    console.log(event)
    setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, roleId: Number(roleId) } : user
      )
    );
  }

  const handleDeleteUser = async (user: User | null) => {
    try {
      const response = await api.delete(`/user/2/${user?.id}`);
      if ( response.status === 200 ) {
        const remainingUsers = users.filter( (usr: User) => { return (user?.id !== usr.id) } )
        setUsers(remainingUsers);
      }
    } catch ( error ) {
      console.error('Failed to delete product:', error);
    }
    handleCloseModal("delete");
  }
  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleOpenModal = (modal: string, data?: User | null) => {
    switch (modal){
      case "new":
        setIsNewModalOpen(true)
        break;
      case "edit":
        if (data) setSelectedUser(data)
        setIsEditModalOpen(true)
        break;
      case "delete":
        if (data) setSelectedUser(data)
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
    fetchUsers();
  }, [] )

  return (
    <div className="w-full py-6 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl my-5 font-bold text-gray-500 ">Usuários</h2>
        <div className="flex gap-8">
          <button
            type="button"
            onClick={() => handleOpenModal("new")}
            className="text-blue-500 px-4 py-4 border-2 border-blue-400 rounded-xl flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Novo Usuário
          </button>
        </div>
      </div>
      <Table
        data={users}
        headers={[
          { label: "Usuário", field: ["profilePhoto","name"] },
          { label: "Email", field: "email" },
          { label: "Cargo", field: "role" },
        ]}
        sortField={sortField}
        sortOrder={sortOrder}
        search={search}
        filterType={filterType}
        filterStatus={filterStatus}
        onSort={handleSort}
        onRoleChange={handleRoleChange}
        roleOptions={roles}
        actions={(user) => (
          <>
            <button type="button" className="mr-6 relative group" onClick={ () => handleOpenModal("edit", user) }>
              <FontAwesomeIcon icon={faPen} className="text-secondary hover:text-primary" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50">
                Editar
              </div>
            </button>
            <button type="button" className="relative group" onClick={ () => handleOpenModal("delete", user) }>
              <FontAwesomeIcon icon={faTrash} className="text-secondary hover:text-red-500" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50">
                Excluir
              </div>
            </button>
            <Modal isOpen={isDeleteModalOpen} data={selectedUser?.name} title="Deletar Usuário" subtitle="Você está excluindo o usuário " confirmText="Apagar"  onClose={() => handleCloseModal("delete")} onConfirm={() => handleDeleteUser(selectedUser)}/>
            <UserInsertModal isOpen={isNewModalOpen}  onClose={handleCreateUser} />
            <UserEditModal isOpen={isEditModalOpen} data={selectedUser} onClose={handleEditUser} />
          </>
        )}
      />
    </div>
  );
};

export default UserPanel;
