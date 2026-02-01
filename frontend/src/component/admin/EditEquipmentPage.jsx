import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditEquipmentPage = () => {
    const { equipmentId } = useParams();
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

    useEffect(() => {
        const fetchEquipmentDetails = async () => {
            try {
                const response = await ApiService.getEquipmentById(equipmentId);
                setEquipmentDetails({
                    imageUrl: response.equipment.imageUrl,
                    category: response.equipment.category,
                    dailyRate: response.equipment.dailyRate,
                    description: response.equipment.description,
                });
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchEquipmentDetails();
    }, [equipmentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEquipmentDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
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


    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('category', equipmentDetails.category);
            formData.append('dailyRate', equipmentDetails.dailyRate);
            formData.append('description', equipmentDetails.description);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.updateEquipment(equipmentId, formData);
            if (result.statusCode === 200) {
                setSuccess('Equipment updated successfully.');
                
                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-equipments');
                }, 3000);
            }
            setTimeout(() => setSuccess(''), 5000);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Do you want to delete this equipment?')) {
            try {
                const result = await ApiService.deleteEquipment(equipmentId);
                if (result.statusCode === 200) {
                    setSuccess('Equipment Deleted successfully.');
                    
                    setTimeout(() => {
                        setSuccess('');
                        navigate('/admin/manage-equipments');
                    }, 3000);
                }
            } catch (error) {
                setError(error.response?.data?.message || error.message);
                setTimeout(() => setError(''), 5000);
            }
        }
    };

    return (
        <div className="edit-equipment-container">
            <h2>Edit Equipment</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <div className="edit-equipment-form">
                <div className="form-group">
                    {preview ? (
                        <img src={preview} alt="Equipment Preview" className="equipment-photo-preview" />
                    ) : (
                        equipmentDetails.imageUrl && (
                            <img src={equipmentDetails.imageUrl} alt="Equipment" className="equipment-photo" />
                        )
                    )}
                    <input
                        type="file"
                        name="equipmentPhoto"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <label>Equipment Type</label>
                    <input
                        type="text"
                        name="category"
                        value={equipmentDetails.category}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Equipment Price</label>
                    <input
                        type="text"
                        name="dailyRate"
                        value={equipmentDetails.dailyRate}
                        onChange={handleChange}
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
                <button className="update-button" onClick={handleUpdate}>Update Equipment</button>
                <button className="delete-button" onClick={handleDelete}>Delete Equipment</button>
            </div>
        </div>
    );
};

export default EditEquipmentPage;
