import React, { useState } from 'react';
import { myPageStyles } from '../styles/myPageStyles';
import AddLocationModal from '../components/AddLocationModal';

const FavoritesLocateComponents = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false);

  const locations = [
    { id: 1, name: '집', locate: '', icon: 'homeIcon', type: 'home' },
    { id: 2, name: '직장/학교', locate: '서울특별시 동작구', icon: 'schoolIcon', type: 'work' },
  ];

  const openAddLocationModal = (location, type) => {
    setSelectedLocation({ ...location, type: type.toUpperCase() });
    setIsAddLocationModalOpen(true);
  };

  const closeAddLocationModal = () => {
    setIsAddLocationModalOpen(false);
    setSelectedLocation(null);
  };

  return (
    <div style={myPageStyles.favoritesLocateContainer}>
      <h3 style={{ padding: '10px', textDecoration: 'underline', textAlign: 'center' }}>
        즐겨찾는 장소
      </h3>
      {locations.map((location) => (
        <div
          key={location.id}
          onClick={() => openAddLocationModal(location, location.type)}
          style={myPageStyles.locateontainer}
        >
          <img
            src={`/img/${location.icon}.png`}
            width="22"
            height="22"
            alt={location.name}
          />
          {location.name}
          {' >'}
        </div>
      ))}
      {selectedLocation && (
        <AddLocationModal
          isOpen={isAddLocationModalOpen}
          closeModal={closeAddLocationModal}
          selectedLocation={selectedLocation}
        />
      )}
    </div>
  );
};

export default FavoritesLocateComponents;