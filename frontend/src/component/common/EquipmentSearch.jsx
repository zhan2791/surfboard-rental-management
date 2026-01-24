import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ApiService from '../../service/ApiService';

const EquipmentSearch = ({ handleSearchResult }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const types = await ApiService.getCategories();
        setCategories(types);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };
    fetchCategories();
  }, []);

  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, timeout);
  };

  const handleInternalSearch = async () => {
    if (!startDate || !endDate || !category) {
      showError('Please select all fields');
      return false;
    }
    try {
      const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
      const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;

      const response = await ApiService.getAvailableEquipmentByDateAndType(formattedStartDate, formattedEndDate, category);

      if (response.statusCode === 200) {
        if (response.equipmentList.length === 0) {
          showError('No equipment available for these dates/category.');
          return;
        }
        handleSearchResult(response.equipmentList);
        setError('');
      }
    } catch (error) {
      showError("Unknown error occurred: " + (error.response?.data?.message || error.message));
    }
  };

  return (
      <section className="relative z-30 -mt-10 px-4 overflow-visible">
        {/* Container: The White Floating Capsule */}
        <div
            className="bg-white max-w-5xl mx-auto rounded-3xl shadow-2xl border border-slate-100
             p-3 lg:p-4 flex flex-col md:flex-row items-center gap-4
             overflow-visible"
        >

          {/* Input 1: Check-in */}
          <div className="w-full md:w-1/3 flex flex-col px-4 border-b md:border-b-0 md:border-r border-slate-200 py-10">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Check-in</label>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Add dates"
                className="w-full outline-none text-slate-700 font-medium placeholder:text-slate-300 bg-transparent"
                portalId="root"//make sure date picker on the surface
                popperPlacement="bottom-start"//pop up at bottom left
                // forbid keyboard input，force pop out
                onFocus={(e) => e.target.blur()}
            />
          </div>

          {/* Input 2: Check-out */}
          <div className="w-full md:w-1/3 flex flex-col px-4 border-b md:border-b-0 md:border-r border-slate-200 py-10">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Check-out</label>
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Add dates"
                className="w-full outline-none text-slate-700 font-medium placeholder:text-slate-300 bg-transparent"
                portalId="root"
                popperPlacement="bottom-start"
                onFocus={(e) => e.target.blur()}
            />
          </div>

          {/* Input 3: Category */}
          <div className="w-full md:w-1/3 flex flex-col px-4 py-10">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Category</label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full outline-none text-slate-700 font-medium bg-transparent cursor-pointer appearance-none"
            >
              <option disabled value="">Select Type</option>
              {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
              className="bg-brand hover:bg-brand-dark text-white rounded-2xl md:rounded-full px-8 py-4 font-bold shadow-lg shadow-brand/30 transition-all transform hover:scale-105 w-full md:w-auto mt-2 md:mt-0"
              onClick={handleInternalSearch}
          >
            Search
          </button>
        </div>

        {/* Error Message Toast */}
        {error && (
            <div className="max-w-md mx-auto mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded shadow-sm text-center">
              {error}
            </div>
        )}
      </section>
  );
};

export default EquipmentSearch;