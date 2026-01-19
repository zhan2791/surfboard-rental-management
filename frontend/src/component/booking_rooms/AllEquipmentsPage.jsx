import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import EquipmentResult from '../common/EquipmentResult';
import EquipmentSearch from '../common/EquipmentSearch';



const AllEquipmentsPage = () => {
  const [equipments, setEquipments] = useState([]);
  const [filteredEquipments, setFilteredEquipments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [equipmentsPerPage] = useState(5);

  // Function to handle search results
  const handleSearchResult = (results) => {
    setEquipments(results);
    setFilteredEquipments(results);
  };


  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await ApiService.getAllEquipments();
        const allEquipments = response.equipmentList;
        setEquipments(allEquipments);
        setFilteredEquipments(allEquipments);
      } catch (error) {
        console.error('Error fetching equipments:', error.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const types = await ApiService.getCategories();
        setCategories(types);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchEquipments();
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    filterEquipments(e.target.value);
  };

  const filterEquipments = (type) => {
    if (type === '') {
      setFilteredEquipments(equipments);
    } else {
      const filtered = equipments.filter((equipment) => equipment.category === type);
      setFilteredEquipments(filtered);
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Pagination
  const indexOfLastEquipment = currentPage * equipmentsPerPage;
  const indexOfFirstEquipment = indexOfLastEquipment - equipmentsPerPage;
  const currentEquipments = filteredEquipments.slice(indexOfFirstEquipment, indexOfLastEquipment);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='all-equipments'>
      <h2>All Equipments</h2>
      <div className='all-equipment-filter-div'>
        <label>Filter by Category:</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All</option>
          {categories.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      
      <EquipmentSearch handleSearchResult={handleSearchResult} />
      <EquipmentResult equipmentSearchResults={currentEquipments} />

      <Pagination
          equipmentsPerPage={equipmentsPerPage}
        totalEquipments={filteredEquipments.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default AllEquipmentsPage;
