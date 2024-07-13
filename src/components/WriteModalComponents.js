import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import { writeModalStyles } from '../styles/writeModalStyles';

Modal.setAppElement('#root');

const WriteModal = ({ isOpen, closeModal, addReview, existingReview = {}, isEditing }) => {
  const currentUser = { name: 'user1' };

  const [placeName, setPlaceName] = useState('');
  const [content, setContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([null, null, null]);
  const fileInputRefs = [useRef(null), useRef(null), useRef(null)];
  const [selectedTags, setSelectedTags] = useState([]);

  const predefinedTags = ['#식사', '#카페', '#공부', '#문화생활', '#쇼핑', '#자연', '#산책', '#친목', '#여럿이', '#혼자'];

  useEffect(() => {
    if (existingReview && Object.keys(existingReview).length > 0) {
      setPlaceName(existingReview.placeName || '');
      setContent(existingReview.content || '');
      setSelectedFiles(existingReview.photos || [null, null, null]);
      setSelectedTags(existingReview.tags || []);
    }
  }, [existingReview]);

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
    if (selectedTags.includes(tag)) {
      const newTags = selectedTags.filter(t => t !== tag);
      setSelectedTags(newTags);
    } else if (selectedTags.length < 2) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    const newReview = {
      placeName,
      content,
      photos: selectedFiles.filter(file => file !== null).map(file => URL.createObjectURL(file)),
      tags: selectedTags,
      author: currentUser.name,
    };
    addReview(newReview, isEditing);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setPlaceName('');
    setContent('');
    setSelectedFiles([null, null, null]);
    setSelectedTags([]);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={{ overlay: writeModalStyles.overlay, content: writeModalStyles.modal }}
      contentLabel="Write Review Modal"
    >
      <form onSubmit={handleAddReview}>
        <button onClick={handleCloseModal} style={writeModalStyles.closeButton}>X</button>
        <div style={writeModalStyles.profileContainer}>
          <img src="/img/default-profile.png" alt="profile" style={writeModalStyles.profileImg} />
          <span style={writeModalStyles.profileName}>{currentUser.name}</span>
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
          {selectedFiles.map((file, index) => (
            <span key={index}>
              <img
                src={file ? URL.createObjectURL(file) : '/img/addPhoto.png'}
                onClick={() => handleIconClick(index)}
                style={writeModalStyles.addImg}
                alt={`Upload ${index + 1}`}
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
        <div>태그 (2개 필수)</div>
        <div style={writeModalStyles.tagContainer}>
          {predefinedTags.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => handleTagClick(tag)}
              style={{
                ...writeModalStyles.tagButton,
                ...(selectedTags.includes(tag) ? writeModalStyles.selectedTagButton : {}),
              }}
            >
              {tag}
            </button>
          ))}
        </div>
        <button type="submit" style={writeModalStyles.button}>게시</button>
      </form>
    </Modal>
  );
};

export default WriteModal;
