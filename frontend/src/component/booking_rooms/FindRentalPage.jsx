import React, { useState } from 'react';
import ApiService from '../../service/ApiService'; // Assuming your service is in a file called ApiService.js

const FindRentalPage = () => {
    const [confirmationCode, setConfirmationCode] = useState(''); // State variable for confirmation code
    const [rentalDetails, setRentalDetails] = useState(null); // State variable for rental details
    const [error, setError] = useState(null); // Track any errors

    const handleSearch = async () => {
        if (!confirmationCode.trim()) {
            setError("Please Enter a rental confirmation code");
            setTimeout(() => setError(''), 5000);
            return;
        }
        try {
            // Call API to get rental details
            const response = await ApiService.getRentalByConfirmationCode(confirmationCode);
            setRentalDetails(response.rental);
            setError(null); // Clear error if successful
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="find-rental-page">
            <h2>Find Rental</h2>
            <div className="search-container">
                <input
                    required
                    type="text"
                    placeholder="Enter your rental confirmation code"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                />
                <button onClick={handleSearch}>Find</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {rentalDetails && (
                <div className="rental-details">
                    <h3>Rental Details</h3>
                    <p>Confirmation Code: {rentalDetails.rentalConfirmationCode}</p>
                    <p>Check-in Date: {rentalDetails.checkInDate}</p>
                    <p>Check-out Date: {rentalDetails.checkOutDate}</p>

                    <br />
                    <hr />
                    <br />
                    <h3>Renter Details</h3>
                    <div>
                        <p> Name: {rentalDetails.user.name}</p>
                        <p> Email: {rentalDetails.user.email}</p>
                        <p> Phone Number: {rentalDetails.user.phoneNumber}</p>
                    </div>

                    <br />
                    <hr />
                    <br />
                    <h3>Board Details</h3>
                    <div>
                        <p> Category: {rentalDetails.equipment.category}</p>
                        <img src={rentalDetails.equipment.imageUrl} alt="" sizes="" srcSet="" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindRentalPage;
