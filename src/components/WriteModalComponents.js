import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import { writeModalStyles } from '../styles/writeModalStyles';

Modal.setAppElement('#root');

const WriteModal = ({ isOpen, closeModal, addReview, }) => {
  const [placeName, setPlaceName] = useState('');
  const [content, setContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([null, null, null]);
  const fileInputRefs = [useRef(null), useRef(null), useRef(null)];
  const [selectedTag, setSelectedTag] = useState(null);

  const predefinedTags = {
    '#태그1': ['태그3', '태그4', '태그5'],
    '#태그2': ['태그3', '태그4', '태그5'],
  };

  const handleIconClick = (index) => {
    if (fileInputRefs[index].current) {
      fileInputRefs[index].current.click();
    }
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const newSelectedFiles = [...selectedFiles];
      newSelectedFiles[index] = file;
      setSelectedFiles(newSelectedFiles);
    };

    reader.readAsDataURL(file);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    const newReview = {
      placeName,
      content,
      photoUrls: selectedFiles.map((file) => (file ? URL.createObjectURL(file) : null)).filter((url) => url !== null),
      tags: selectedTag ? [selectedTag] : [],
    };
    addReview(newReview);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setPlaceName('');
    setContent('');
    setSelectedFiles([null, null, null]);
    setSelectedTag(null);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={{ overlay: writeModalStyles.overlay, content: writeModalStyles.modal }}
      contentLabel='Write Review Modal'
    >
      <form onSubmit={handleAddReview}>
        <button onClick={handleCloseModal} style={writeModalStyles.closeButton}>
          X
        </button>
        <div style={writeModalStyles.profileContainer}>
          <img src='/img/Rectangle.png' alt="profile image" style={writeModalStyles.profileImg} />
          <span style={writeModalStyles.profileName}>솔룩션짱짱최고</span>
        </div>
        <input
          type="text"
          placeholder="글제목"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          style={writeModalStyles.inputName}
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={writeModalStyles.textarea}
        />
        <div style={writeModalStyles.imgContainer}>
          {[0, 1, 2].map((index) => (
            <span key={index}>
              <img
                src={selectedFiles[index] ? URL.createObjectURL(selectedFiles[index]) : '/img/addPhoto.png'}
                onClick={() => handleIconClick(index)}
                style={writeModalStyles.addImg}
                alt={`Image ${index + 1}`}
              />
              <input
                type="file"
                ref={fileInputRefs[index]}
                onChange={(e) => handleFileChange(index, e)}
                style={{ display: 'none' }}
              />
            </span>
          ))}
        </div>
        <div style={writeModalStyles.tagContainer}>
          {Object.keys(predefinedTags).map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => handleTagClick(tag)}
              style={writeModalStyles.tagButton}
            >
              {tag}
            </button>
          ))}
        </div>
        {selectedTag && predefinedTags[selectedTag] && (
        <div style={writeModalStyles.subTagContainer}>
          {predefinedTags[selectedTag].map((subTag) => (
          <button
            type="button"
            key={subTag}
            onClick={() => handleTagClick(subTag)}
            style={writeModalStyles.tagButton}
          >
            {subTag}
          </button>
          ))}
        </div>
        )}
        <button type="submit" style={writeModalStyles.button}>게시</button>
      </form>
    </Modal>
  );
};

export default WriteModal;
