import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import {
  StyledModal,
  CloseButton,
  ProfileContainer,
  ProfileImg,
  ProfileName,
  InputName,
  Textarea,
  ImgContainer,
  AddImg,
  TagContainer,
  TagButton,
  SubmitButton
} from '../styles/writeModalStyles';

Modal.setAppElement('#root');

const WriteModal = ({
  isOpen,
  closeModal,
  addReview,
  existingReview,
  isEditing,
}) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const [placeName, setPlaceName] = useState('');
  const [content, setContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([null, null, null]);
  const fileInputRefs = [useRef(null), useRef(null), useRef(null)];
  const [selectedTags, setSelectedTags] = useState([]);
  const [photoURLs, setPhotoURLs] = useState([null, null, null]);

  const predefinedTags = [
    '#식사',
    '#카페',
    '#공부',
    '#문화생활',
    '#쇼핑',
    '#자연',
    '#산책',
    '#친목',
    '#여럿이',
    '#혼자',
  ];

  useEffect(() => {
    if (existingReview && Object.keys(existingReview).length > 0) {
      setPlaceName(existingReview.title || '');
      setContent(existingReview.content || '');
      setSelectedFiles([null, null, null]);
      setPhotoURLs(existingReview.images || [null, null, null]);
      setSelectedTags(existingReview.postHashtags ? existingReview.postHashtags.map(tagId => predefinedTags[tagId - 1]) : []);
    }
  }, [existingReview]);

  useEffect(() => {
    return () => {
      photoURLs.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [photoURLs]);

  const handleIconClick = (index) => {
    if (fileInputRefs[index].current) {
      fileInputRefs[index].current.click();
    }
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[index] = file;
    setSelectedFiles(newSelectedFiles);

    const newPhotoURLs = [...photoURLs];
    if (newPhotoURLs[index]) {
      URL.revokeObjectURL(newPhotoURLs[index]);
    }
    newPhotoURLs[index] = URL.createObjectURL(file);
    setPhotoURLs(newPhotoURLs);
  };

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      const newTags = selectedTags.filter((t) => t !== tag);
      setSelectedTags(newTags);
    } else if (selectedTags.length < 2) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();

    if (selectedTags.length < 2) {
      alert('태그를 2개 선택해 주세요.');
      return;
    }

    const newReview = {
      placeName,
      content,
      photos: selectedFiles.filter(file => file !== null),
      tags: selectedTags,
      author: currentUser,
    };

    addReview(newReview, isEditing);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setPlaceName('');
    setContent('');
    setSelectedFiles([null, null, null]);
    setPhotoURLs([null, null, null]);
    setSelectedTags([]);
    closeModal();
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
      contentLabel='Write Review Modal'
    >
      <form onSubmit={handleAddReview}>
        <CloseButton onClick={handleCloseModal}>X</CloseButton>
        <ProfileContainer>
          <ProfileImg src='/img/default-profile.png' alt='profile' />
          <ProfileName>{currentUser ? currentUser.name : '가상 글쓴이'}</ProfileName>
        </ProfileContainer>
        <InputName
          type='text'
          placeholder='글제목'
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
        />
        <Textarea
          placeholder='내용을 입력하세요'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <ImgContainer>
          {photoURLs.map((url, index) => (
            <span key={index}>
              <AddImg
                src={url || '/img/addPhoto.png'}
                onClick={() => handleIconClick(index)}
                alt={url ? `Image ${index + 1}` : `Upload ${index + 1}`}
              />
              <input
                type='file'
                ref={fileInputRefs[index]}
                onChange={(e) => handleFileChange(index, e)}
                style={{ display: 'none' }}
              />
            </span>
          ))}
        </ImgContainer>
        <div style={{ fontWeight: 'bold' }}>태그 (2개 필수)</div>
        <TagContainer>
          {predefinedTags.map((tag) => (
            <TagButton
              type='button'
              key={tag}
              onClick={() => handleTagClick(tag)}
              selected={selectedTags.includes(tag)}
            >
              {tag}
            </TagButton>
          ))}
        </TagContainer>
        <SubmitButton type='submit'>게시</SubmitButton>
      </form>
    </StyledModal>
  );
};

export default WriteModal;
