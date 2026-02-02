import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';


const AddEquipmentPage = () => {
    const navigate = useNavigate();
    const [equipmentDetails, setEquipmentDetails] = useState({
        imageUrl: '',
        category: '',
        dailyRate: '',
        description: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState(false);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const types = await ApiService.getCategories();
                setCategories(types);
            } catch (error) {
                console.error('Error fetching equipment types:', error.message);
            }
        };
        fetchCategories();
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setEquipmentDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleCategoryChange = (e) => {
        if (e.target.value === 'new') {
            setNewCategory(true);
            setEquipmentDetails(prevState => ({ ...prevState, category: '' }));
        } else {
            setNewCategory(false);
            setEquipmentDetails(prevState => ({ ...prevState, category: e.target.value }));
        }
    };


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreview(null);
        }
    };


    const addEquipment = async () => {
        if (!equipmentDetails.category || !equipmentDetails.dailyRate || !equipmentDetails.description) {
            setError('All equipment details must be provided.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        if (!window.confirm('Do you want to add this equipment?')) {
            return
        }

        try {
            const formData = new FormData();
            formData.append('category', equipmentDetails.category);
            formData.append('dailyRate', equipmentDetails.dailyRate);
            formData.append('description', equipmentDetails.description);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.addEquipment(formData);
            if (result.statusCode === 200) {
                setSuccess('Equipment Added successfully.');
                
                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-equipments');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="edit-equipment-container">
            <h2>Add New Equipment</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <div className="edit-equipment-form">
                <div className="form-group">
                    {preview && (
                        <img src={preview} alt="Equipment Preview" className="equipment-photo-preview" />
                    )}
                    <input
                        type="file"
                        name="equipmentPhoto"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="form-group">
                    <label>Equipment Name</label>
                    <input
                        type="text"
                        name="name"
                        value={equipmentDetails.name}
                        onChange={handleChange}
                        placeholder="e.g. Soft Top Beginner 8ft"
                        />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <select value={equipmentDetails.category} onChange={handleCategoryChange}>
                        <option value="">Select an equipment type</option>
                        {categories.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                        <option value="new">Other (please specify)</option>
                    </select>
                    {newCategory && (
                        <input
                            type="text"
                            name="category"
                            placeholder="Enter new equipment type"
                            value={equipmentDetails.category}
                            onChange={handleChange}
                        />
                    )}
                </div>
                <div className="form-group">
                    <label> Daily Rate </label>
                    <input
                        type="text"
                        name="dailyRate"
                        value={equipmentDetails.dailyRate}
                        onChange={handleChange}
                        placeholder="e.g. 20"
                        min="0"
                        step="0.01"
                    />
                </div>
                <div className="form-group">
                    <label>Equipment Description</label>
                    <textarea
                        name="description"
                        value={equipmentDetails.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button className="update-button" onClick={addEquipment}>Add Equipment</button>
            </div>
        </div>
    );
};

export default AddEquipmentPage;
