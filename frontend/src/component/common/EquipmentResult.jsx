import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ApiService from '../../service/ApiService';

const EquipmentResult = ({ equipmentSearchResults }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const isAdmin = ApiService.isAdmin();
    return (
        <section className="equipment-results">
            {equipmentSearchResults && equipmentSearchResults.length > 0 && (
                <div className="equipment-list">
                    {equipmentSearchResults.map(equipment => (
                        <div key={equipment.id} className="equipment-list-item">
                            <img className='equipment-list-item-image' src={equipment.imageUrl} alt={equipment.category} />
                            <div className="equipment-details">
                                <h3>{equipment.category}</h3>
                                <p>Price: ${equipment.dailyRate} / day (AUD)</p>
                                <p>Description: {equipment.description}</p>
                            </div>

                            <div className='rent-now-div'>
                                {isAdmin ? (
                                    <button
                                        className="edit-equipment-button"
                                        onClick={() => navigate(`/admin/edit-equipment/${equipment.id}`)} // Navigate to edit equipment with equipment ID
                                    >
                                        Edit Equipment
                                    </button>
                                ) : (
                                    <button
                                        className="rent-now-button"
                                        onClick={() => navigate(`/equipment-details-rent/${equipment.id}`)} // Navigate to book equipment with equipment ID
                                    >
                                        View/Rent Now
                                    </button>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default EquipmentResult;
