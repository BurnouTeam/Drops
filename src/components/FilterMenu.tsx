import React, { useState, useRef, useEffect } from 'react';

interface FilterMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (type: string, status: string ) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ isOpen, onClose, onFilter }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const [filterType, setFilterType] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');

  const clearFilter = () => {
    setFilterType("");
    setFilterStatus("");
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="absolute right-0 mt-2 w-[400px] bg-white border rounded-lg shadow-lg z-50"
      ref={menuRef}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filtros</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo
              </label>
              <select
                id="type"
                className="w-full border rounded-md px-3  py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setFilterType(e.target.value)}
                value={filterType}
              >
                <option disabled selected hidden value="">Selecione</option>
                {/* TODO: It is mocked, we need to get from the backend */}
                <option value="20L">20L</option>
                <option value="5L">5L</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setFilterStatus(e.target.value)}
                value={filterStatus}
              >
                <option disabled selected hidden value="">Selecione</option>
                {/* TODO: It is mocked, we need to get from the backend */}
                <option value="Em Estoque">Em Estoque</option>
                <option value="Baixo Estoque">Baixo Estoque</option>
                <option value="Sem Estoque">Sem Estoque</option>
              </select>
            </div>
          </div>
          {/* Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => {onFilter(filterType,filterStatus)}}
            >
              Filtrar
            </button>
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-blue-600"
              onClick={() => {onFilter("","");clearFilter()}}
            >
              Limpar
            </button>
          </div>
      </div>
    </div>
  );
};

export default FilterMenu;
