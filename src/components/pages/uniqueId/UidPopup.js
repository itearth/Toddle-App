
import React from 'react';

const UniqueIdPopup = ({ uniqueId, onClose }) => {
  return (
    <div className="unique-id-popup">
      <div className="popup-content">
        <p>Your unique ID is: {uniqueId}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UniqueIdPopup;
