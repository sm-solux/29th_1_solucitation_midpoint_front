import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import writeModalStyles, {
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
  SubmitButton,
} from '../styles/writeModalStyles';

Modal.setAppElement('#root');

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

const tagIdMap = {
  '#식사': 1,
  '#카페': 2,
  '#공부': 3,
  '#문화생활': 4,
  '#쇼핑': 5,
  '#자연': 6,
  '#산책': 7,
  '#친목': 8,
  '#여럿이': 9,
  '#혼자': 10,
};

const EditModal = ({
  isOpen,
  closeModal,
  existingReview,
}) => {
  const [placeName, setPlaceName] = useState('');
  const [content, setContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([null, null, null]);
  const [photoURLs, setPhotoURLs] = useState([null, null, null]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [profileData, setProfileData] = useState({
    nickname: '',
    profileImageUrl: '',
  });
  const [initialTags, setInitialTags] = useState([]);
  const [initialImages, setInitialImages] = useState([]);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const fileInputRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (isOpen) {
      const fetchProfileData = async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/member/profile`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const data = response.data;
          setProfileData({
            nickname: data.nickname || '',
            profileImageUrl: data.profileImageUrl || '',
          });
        } catch (error) {
          console.error('프로필 정보를 불러오는 중 에러 발생:', error);
        }
      };

      fetchProfileData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && existingReview) {
      setPlaceName(existingReview.title || '');
      setContent(existingReview.content || '');

      const initialPhotoURLs = [null, null, null];
      if (existingReview.images) {
        for (let i = 0; i < existingReview.images.length && i < 3; i++) {
          initialPhotoURLs[i] = existingReview.images[i];
        }
      }
      setPhotoURLs(initialPhotoURLs);
      setInitialImages(initialPhotoURLs);

      const initialTags = existingReview.postHashtags || [];
      setSelectedTags(initialTags);
      setInitialTags(initialTags);

    } else {
      resetForm();
    }
  }, [isOpen, existingReview]);

  useEffect(() => {
    return () => {
      photoURLs.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [photoURLs]);

  const resetForm = () => {
    setPlaceName('');
    setContent('');
    setSelectedFiles([null, null, null]);
    setPhotoURLs([null, null, null]);
    setSelectedTags([]);
    setInitialTags([]);
    setInitialImages([]);
    setIsImageChanged(false);
  };

  const handleIconClick = (index) => {
    fileInputRefs[index]?.current?.click();
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
    setIsImageChanged(true);

  };

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 2) {
      setSelectedTags([...selectedTags, tag]);
    }

  };

  const validateForm = () => {
    if (!placeName.trim()) {
      alert('제목을 입력해 주세요.');
      return false;
    }

    if (placeName.length > 100) {
      alert('제목은 100자 이내로 입력해 주세요.');
      return false;
    }

    if (!content.trim()) {
      alert('내용을 입력해 주세요.');
      return false;
    }

    if (selectedTags.length < 2) {
      alert('태그를 2개 선택해 주세요.');
      return false;
    }

    const validPhotos = selectedFiles.filter((file) => file !== null);
    if (initialImages.filter((url) => url !== null).length < 1 && validPhotos.length < 1) {
      alert('최소 한 장의 사진을 업로드해 주세요.');
      return false;
    }

    return true;
  };

  const handleUpdateReview = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const tags = selectedTags.map((tag) => tagIdMap[tag]);

  const postDto = {};

  if (placeName !== (existingReview?.title || '')) {
    postDto.title = placeName;
  }
  if (content !== (existingReview?.content || '')) {
    postDto.content = content;
  }
  if (JSON.stringify(tags) !== JSON.stringify(initialTags.map((tag) => tagIdMap[tag]))) {
    postDto.postHashtag = tags;
  }

  const formData = new FormData();
  formData.append('postDto', JSON.stringify(postDto));

  if (isImageChanged) {
    const validPhotos = selectedFiles.filter((file) => file !== null);
    validPhotos.forEach((file) => {
      formData.append('postImages', file);
    });
  } else {
    initialImages.forEach((url) => {
      if (url) {
        formData.append('postImages', url);
      }
    });
  }

  try {
    const accessToken = localStorage.getItem('accessToken');
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/posts/${existingReview.postId}`,
      formData,
      { headers }
    );
    alert('게시글을 성공적으로 수정했습니다.');
    window.location.reload();
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          alert('로그인하지 않으면 이 작업을 수행할 수 없습니다.');
          break;
        case 403:
          alert('해당 게시글을 수정할 권한이 없습니다. 본인이 작성한 글만 수정할 수 있습니다.');
          break;
        case 404:
          alert('수정하려는 게시글이 존재하지 않습니다.');
          break;
        case 400:
          if (error.response.data.errors) {
            const errors = error.response.data.errors;
            errors.forEach((err) => {
              if (err.field === 'title') {
                alert('제목을 입력해야 합니다.');
              } else if (err.field === 'content') {
                alert('내용을 입력해야 합니다.');
              }
            });
          } else if (error.response.data.message) {
            const message = error.response.data.message;
            if (message.includes('해시태그')) {
              alert('서로 다른 두 개의 해시태그를 선택해야 합니다.');
            } else if (message.includes('이미지')) {
              alert('이미지는 최대 3장까지 업로드할 수 있습니다.');
            } else {
              alert('알 수 없는 오류가 발생했습니다.');
            }
          } else {
            alert('잘못된 요청입니다.');
          }
          break;
        case 500:
          alert('서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
          break;
        default:
          alert('알 수 없는 오류가 발생했습니다.');
      }
    } else {
      alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.');
    }
  }
};

  const handleCloseModal = () => {
    resetForm();
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={{
        overlay: writeModalStyles.overlay,
        content: writeModalStyles.modal,
      }}
      contentLabel='Edit Review Modal'
    >
      <form onSubmit={handleUpdateReview}>
        <CloseButton onClick={handleCloseModal}>X</CloseButton>
        <ProfileContainer>
          <ProfileImg
            src={profileData.profileImageUrl || '/img/defaultProfile.png'}
            alt='profile'
            onError={(e) => e.target.src = '/img/defaultProfile.png'}
          />
          <ProfileName>{profileData.nickname}</ProfileName>
        </ProfileContainer>
        <InputName
          type='text'
          placeholder='글제목'
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          maxLength={100}
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
        <SubmitButton type='submit'>수정</SubmitButton>
      </form>
    </Modal>
  );
};

export default EditModal;