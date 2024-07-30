import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import Modal from 'react-modal';
import { myPageStyles } from '../styles/myPageStyles';

Modal.setAppElement('#root');

const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const AddLocationModal = ({ isOpen, closeModal, addLocation, selectedLocation }) => {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (selectedLocation) {
      setSearchInput(selectedLocation.locate);
    } else {
      clearInputs();
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (isOpen) {
      loadGoogleMaps().catch((error) => {
        console.error('Error loading Google Maps', error);
      });
    }
  }, [isOpen]);

  const loadGoogleMaps = () => {
    return loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`);
  };

  const clearInputs = () => {
    setSearchInput('');
    setSuggestions([]);
  };

  const fetchSuggestions = async (value) => {
    if (value.trim() !== '') {
      const targetUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=ko`;
      try {
        const response = await axios.get(targetUrl);
        setSuggestions(response.data.predictions.slice(0, 3)); // 최대 3개의 제안만 설정
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedFetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setSearchInput(suggestion.description);
    setSuggestions([]);
  };

  const handleAddLocation = () => {
    const newLocation = {
      id: Math.random(),
      name: searchInput,
      locate: searchInput,
    };
    addLocation(newLocation);
    clearInputs();
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{ overlay: myPageStyles.overlay, content: myPageStyles.modal }}
      contentLabel='AddEditLocationModal'
    >
      <div style={myPageStyles.modalContent}>
        <h3>{selectedLocation ? selectedLocation.name : '장소 추가'}</h3>
        <div style={{ position: 'relative' }}>
          <input
            ref={inputRef}
            id='location-input'
            type='text'
            value={searchInput}
            style={myPageStyles.inputLocate}
            onChange={handleSearchInputChange}
            placeholder='검색어를 입력하세요'
          />
          {suggestions.length > 0 && (
            <div style={myPageStyles.predictionsContainer}>
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.place_id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={myPageStyles.predictionItem}
                >
                  {suggestion.description}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleAddLocation}
          style={myPageStyles.addFriendModalButton}
        >
          추가
        </button>
        <button onClick={closeModal} style={myPageStyles.closeButton}>
          X
        </button>
      </div>
    </Modal>
  );
};

export default AddLocationModal;
