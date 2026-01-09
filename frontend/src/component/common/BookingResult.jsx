import React from 'react';
import { Link } from 'react-router-dom';

const BookingResult = ({ bookingSearchResults }) => {
  return (
    <div className="rental-results">
      {bookingSearchResults.map((rental) => (
        <div key={rental.id} className="rental-result-item">
          <p>Room ID: {rental.roomId}</p>
          <p>User ID: {rental.userId}</p>
          <p>Start Date: {rental.startDate}</p>
          <p>End Date: {rental.endDate}</p>
          <p>Status: {rental.status}</p>
          <Link to={`/admin/edit-rental/${rental.id}`} className="edit-link">Edit</Link>
        </div>
      ))}
    </div>
  );
};

export default BookingResult;
