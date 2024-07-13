import React, { useState } from 'react';
import { myPageStyles } from '../styles/myPageStyles';
import AddLocationModal from '../components/AddLocationModal';

const FavoritesLocateComponents = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false);

  const [locations, setLocations] = useState([
    { id: 1, name: '집', locate: '', icon: 'homeIcon' },
    {
      id: 2,
      name: '직장/학교',
      locate: '서울특별시 동작구',
      icon: 'schoolIcon',
    },
  ]);

  const openAddLocationModal = (location) => {
    setSelectedLocation(location);
    setIsAddLocationModalOpen(true);
  };

  const closeAddLocationModal = () => {
    setIsAddLocationModalOpen(false);
  };

  const handleAddLocation = (updatedLocation) => {
    setLocations(
      locations.map((location) =>
        location.id === updatedLocation.id ? updatedLocation : location
      )
    );
    setSelectedLocation(updatedLocation);
  };

  const handleEditLocation = (editedLocation) => {
    setLocations(
      locations.map((location) =>
        location.id === editedLocation.id ? editedLocation : location
      )
    );
    setSelectedLocation(editedLocation);
  };

  const handleDeleteLocation = (locationToDelete) => {
    setLocations(
      locations.map((location) =>
        location.id === locationToDelete.id
          ? { ...location, locate: '' }
          : location
      )
    );
    setSelectedLocation({ ...locationToDelete, locate: '' });
  };

  return (
    <div style={myPageStyles.favoritesLocateContainer}>
      <h3
        style={{
          padding: '10px',
          textDecoration: 'underline',
          textAlign: 'center',
        }}
      >
        즐겨찾는 장소
      </h3>
      {locations.map((location) => (
        <div
          key={location.id}
          onClick={() => openAddLocationModal(location)}
          style={myPageStyles.locateontainer}
        >
          <img
            src={`/img/${location.icon}.png`}
            width='22'
            height='22'
            alt={location.name}
          />
          {location.name}
          {'                         >'}
        </div>
      ))}
      <AddLocationModal
        isOpen={isAddLocationModalOpen}
        closeModal={closeAddLocationModal}
        addLocation={handleAddLocation}
        editLocation={handleEditLocation}
        deleteLocation={handleDeleteLocation}
        selectedLocation={selectedLocation}
      />
    </div>
  );
};

export default FavoritesLocateComponents;
