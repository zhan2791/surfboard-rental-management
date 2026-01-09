import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ApiService from '../../service/ApiService';

const RoomResult = ({ roomSearchResults }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const isAdmin = ApiService.isAdmin();
    return (
        <section className="equipment-results">
            {roomSearchResults && roomSearchResults.length > 0 && (
                <div className="equipment-list">
                    {roomSearchResults.map(equipment => (
                        <div key={equipment.id} className="equipment-list-item">
                            <img className='equipment-list-item-image' src={equipment.roomPhotoUrl} alt={equipment.roomType} />
                            <div className="equipment-details">
                                <h3>{equipment.roomType}</h3>
                                <p>Price: ${equipment.roomPrice} / night</p>
                                <p>Description: {equipment.roomDescription}</p>
                            </div>

                            <div className='book-now-div'>
                                {isAdmin ? (
                                    <button
                                        className="edit-equipment-button"
                                        onClick={() => navigate(`/admin/edit-equipment/${equipment.id}`)} // Navigate to edit equipment with equipment ID
                                    >
                                        Edit Room
                                    </button>
                                ) : (
                                    <button
                                        className="book-now-button"
                                        onClick={() => navigate(`/equipment-details-book/${equipment.id}`)} // Navigate to book equipment with equipment ID
                                    >
                                        View/Book Now
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

export default RoomResult;
