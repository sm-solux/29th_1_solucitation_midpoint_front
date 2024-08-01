import React, { useState } from 'react';
import { myPageStyles } from '../../../styles/myPageStyles';
import AddLocationModal from './AddLocationModal';

const FavoritesLocates = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false);
  const [locations, setLocations] = useState([
    { id: 1, name: '집', locate: '', icon: 'homeIcon', type: 'home' },
    {
      id: 2,
      name: '직장/학교',
      locate: '서울특별시 동작구',
      icon: 'schoolIcon',
      type: 'work',
    },
  ]);

  const openAddLocationModal = (location) => {
    setSelectedLocation(location);
    setIsAddLocationModalOpen(true);
  };

  const closeAddLocationModal = () => {
    setIsAddLocationModalOpen(false);
  };

  const handleAddLocation = (newLocation) => {
    setLocations((prevLocations) => [...prevLocations, newLocation]);
    setSelectedLocation(newLocation);
  };

  const handleEditLocation = (editedLocation) => {
    setLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.id === editedLocation.id ? editedLocation : location
      )
    );
    setSelectedLocation(editedLocation);
  };

  const handleDeleteLocation = (locationToDelete) => {
    setLocations((prevLocations) =>
      prevLocations.filter((location) => location.id !== locationToDelete.id)
    );
    setSelectedLocation(null);
    closeAddLocationModal();
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
      {selectedLocation && (
        <AddLocationModal
          isOpen={isAddLocationModalOpen}
          closeModal={closeAddLocationModal}
          addLocation={handleAddLocation}
          editLocation={handleEditLocation}
          deleteLocation={handleDeleteLocation}
          selectedLocation={selectedLocation}
          loading={false}
        />
      )}
    </div>
  );
};

export default FavoritesLocates;