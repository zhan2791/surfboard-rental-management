import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditEquipmentPage = () => {
    const { equipmentId } = useParams();
    const navigate = useNavigate();
    const [equipmentDetails, setRoomDetails] = useState({
        imageUrl: '',
        cateogry: '',
        dailyRate: '',
        description: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await ApiService.getRoomById(equipmentId);
                setRoomDetails({
                    imageUrl: response.equipment.imageUrl,
                    cateogry: response.equipment.cateogry,
                    dailyRate: response.equipment.dailyRate,
                    description: response.equipment.description,
                });
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchRoomDetails();
    }, [equipmentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails(prevState => ({
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
            formData.append('cateogry', equipmentDetails.cateogry);
            formData.append('dailyRate', equipmentDetails.dailyRate);
            formData.append('description', equipmentDetails.description);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.updateRoom(equipmentId, formData);
            if (result.statusCode === 200) {
                setSuccess('Room updated successfully.');
                
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
                const result = await ApiService.deleteRoom(equipmentId);
                if (result.statusCode === 200) {
                    setSuccess('Room Deleted successfully.');
                    
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
            <h2>Edit Room</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <div className="edit-equipment-form">
                <div className="form-group">
                    {preview ? (
                        <img src={preview} alt="Room Preview" className="equipment-photo-preview" />
                    ) : (
                        equipmentDetails.imageUrl && (
                            <img src={equipmentDetails.imageUrl} alt="Room" className="equipment-photo" />
                        )
                    )}
                    <input
                        type="file"
                        name="equipmentPhoto"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <label>Room Type</label>
                    <input
                        type="text"
                        name="cateogry"
                        value={equipmentDetails.cateogry}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Room Price</label>
                    <input
                        type="text"
                        name="dailyRate"
                        value={equipmentDetails.dailyRate}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Room Description</label>
                    <textarea
                        name="description"
                        value={equipmentDetails.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button className="update-button" onClick={handleUpdate}>Update Room</button>
                <button className="delete-button" onClick={handleDelete}>Delete Room</button>
            </div>
        </div>
    );
};

export default EditEquipmentPage;
