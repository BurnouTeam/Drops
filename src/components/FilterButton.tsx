import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FilterMenu from './FilterMenu';

const FilterButton: React.FC = ({onFilter}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="bg-white-500 text-black px-4 py-4 rounded-xl flex items-center shadow"
      >
        <FontAwesomeIcon icon={faFilter} className="mr-2" /> Filtros
      </button>
      <FilterMenu isOpen={isMenuOpen} onClose={closeMenu} onFilter={onFilter}/>
    </div>
  );
};

export default FilterButton;
