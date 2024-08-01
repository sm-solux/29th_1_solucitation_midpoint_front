import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/global.css';
import { myPageStyles } from '../../styles/myPageStyles';
import { refreshAccessToken } from '../../components/refreshAccess';
import { ProfileField, ProfilePassword, ProfileImage } from './Profile/ProfileComponents';
import PasswordConfirmation from './Profile/PasswordConfirmation';
import PasswordChange from './Profile/PasswordChange';

const MyPageProfile = () => {
  const [state, setState] = useState({
    editMode: false,
    passwordEditMode: false,
    passwordConfirmationMode: false,
    deleteConfirmationMode: false,
    nextMode: null,
    errors: {},
    deleteToken: null,
    isLoading: false,
    successMessage: '',
  });
  const [profileData, setProfileData] = useState({
    name: '',
    nickname: '',
    id: '',
    email: '',
    profileImage: '',
    password: '********',
  });

  const [previewImage, setPreviewImage] = useState(null); // 미리보기 상태 추가
  const [isDefaultImage, setIsDefaultImage] = useState(false); // 기본 이미지 여부 상태 추가

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/member/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = response.data;

        // URL이 기본 이미지인지 확인
        const isDefault = data.profileImageUrl.endsWith('profile-images/default_image.png');

        setProfileData({
          name: data.name,
          nickname: data.nickname,
          id: data.loginId,
          email: data.email,
          profileImage: data.profileImageUrl,
          password: profileData.password,
        });
        setIsDefaultImage(isDefault); // 기본 이미지 여부 상태 업데이트
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            const errorData = error.response.data;
            if (errorData.error === 'access_token_expired') {
              try {
                const refreshToken = localStorage.getItem('refreshToken');
                const newAccessToken = await refreshAccessToken(refreshToken);
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/member/profile`, {
                  headers: {
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                });
                const data = response.data;

                const isDefault = data.profileImageUrl.endsWith('profile-images/default_image.png');

                setProfileData({
                  name: data.name,
                  nickname: data.nickname,
                  id: data.loginId,
                  email: data.email,
                  profileImage: data.profileImageUrl,
                  password: profileData.password,
                });
                setIsDefaultImage(isDefault);
              } catch (refreshError) {
                console.error('Failed to refresh access token:', refreshError);
                alert('토큰 갱신에 실패했습니다. 로그인 페이지로 이동합니다.');
                navigate('/login');
              }
            } else if (errorData.error === 'invalid_token') {
              alert('유효하지 않은 Access Token입니다. 로그인 페이지로 이동합니다.');
              navigate('/login');
            }
          } else {
            console.error('회원 정보를 불러오는 중 에러 발생:', error.response.data);
          }
        } else {
          console.error('회원 정보를 불러오는 중 에러 발생:', error.message);
        }
      }
    };

    fetchProfileData();
  }, [navigate, profileData.password]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    // 파일 미리보기 URL 생성
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl); // 상태에 저장
  }
};

const handleSave = async () => {
  // 유효성 검사
  if (!profileData.name.trim()) {
    alert('이름을 입력해 주세요.');
    return;
  }

  if (!profileData.nickname.trim()) {
    alert('닉네임을 입력해 주세요.');
    return;
  }

  try {
    const accessToken = localStorage.getItem('accessToken');

    // 기본 이미지 여부 결정
    const useDefaultImage = !previewImage && profileData.profileImage === 'defaultImagePath'; // 기본 이미지 경로를 'defaultImagePath'로 가정

    // 프로필 업데이트 데이터 준비
    const profileUpdateRequestDto = {
      nickname: profileData.nickname,
      name: profileData.name,
      useDefaultImage,
    };

    // 전송할 데이터 객체 생성
    const data = {
      profileUpdateRequestDto,
      profileImage: previewImage || null, // 미리보기 이미지가 있으면 전송, 없으면 null
    };

    console.log(data);
    // JSON 형식으로 요청 보내기
    await axios.patch(`${process.env.REACT_APP_API_URL}/api/member/profile`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // JSON 데이터 전송을 위한 설정
      },
    });

    // 상태 업데이트
    setState({ ...state, editMode: false, passwordEditMode: false });

    // 프로필 이미지 업데이트
    setProfileData(prev => ({
      ...prev,
      profileImage: previewImage || prev.profileImage,
    }));
  } catch (error) {
    if (error.response) {
      console.error('프로필 저장 중 에러 발생:', error.response.data);
    } else {
      console.error('프로필 저장 중 에러 발생:', error.message);
    }
  }
};

  const handleCancel = () => {
    setState({ ...state, editMode: false, passwordEditMode: false });
    setPreviewImage(null); // 미리보기 초기화
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm('정말로 탈퇴하시겠습니까? 되돌릴 수 없습니다.');
    if (confirmed) {
      setState({ ...state, nextMode: 'delete', passwordConfirmationMode: true });
    }
  };

  const togglePasswordEditMode = () => {
    setState({ ...state, nextMode: 'passwordChange', passwordConfirmationMode: true });
  };

  const handlePasswordConfirmation = (deleteToken) => {
    if (state.nextMode === 'delete') {
      setState((prevState) => ({
        ...prevState,
        passwordConfirmationMode: false,
        deleteConfirmationMode: true,
        deleteToken,
      }));
    } else if (state.nextMode === 'passwordChange') {
      setState((prevState) => ({
        ...prevState,
        passwordConfirmationMode: false,
        passwordEditMode: true,
      }));
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const { deleteToken } = state;
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/member/delete`, {
        headers: {
          "X-Delete-Token": `Bearer ${deleteToken}`,
          Authorization: `Bearer ${accessToken}`,
          "X-Refresh-Token": `Bearer ${refreshToken}`,
        },
      });
      alert('탈퇴 됐습니다.');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401 && error.response.data.error === 'access_token_expired') {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const newAccessToken = await refreshAccessToken(refreshToken);
          const { deleteToken } = state;
          await axios.delete(`${process.env.REACT_APP_API_URL}/api/member/delete`, {
            headers: {
              "X-Delete-Token": `Bearer ${deleteToken}`,
              Authorization: `Bearer ${newAccessToken}`,
              "X-Refresh-Token": `Bearer ${refreshToken}`,
            },
          });
          alert('탈퇴 됐습니다.');
          navigate('/');
        } catch (refreshError) {
          alert('토큰 갱신에 실패했습니다. 로그인 페이지로 이동합니다.');
          navigate('/login');
        }
      } else {
        console.error('탈퇴 중 에러 발생:', error);
      }
    }
  };

  if (state.passwordConfirmationMode) {
    return <PasswordConfirmation onConfirm={handlePasswordConfirmation} />;
  }

  if (state.passwordEditMode) {
    return (
      <PasswordChange
        onChangePassword={(newPassword) => {
          if (newPassword.length < 8 || newPassword.length > 16) {
            alert('비밀번호는 8자 이상 16자 이하여야 합니다.');
            return;
          }
          setProfileData({ ...profileData, password: newPassword });
          setState({ ...state, passwordEditMode: false, editMode: false });
        }}
      />
    );
  }

  if (state.deleteConfirmationMode) {
    return (
      <div style={myPageStyles.deleteConfirmationContainer}>
        <h2 style={myPageStyles.deleteConfirmationTitle}>미드포인트 탈퇴</h2>
        <p style={myPageStyles.deleteConfirmationMessage}>정말 탈퇴하시겠습니까? 탈퇴 시 되돌릴 수 없습니다. 신중하게 결정해주세요.</p>
        <button onClick={handleDeleteConfirm} style={myPageStyles.deleteCheckButton}>탈퇴</button>
        <button onClick={() => setState({ ...state, deleteConfirmationMode: false })} style={myPageStyles.deleteConfirmationButton}>취소</button>
      </div>
    );
  }

  return (
    <div style={myPageStyles.profileContainer}>
      <ProfileField
        field="name"
        value={profileData.name}
        editMode={state.editMode}
        handleInputChange={handleInputChange}
        placeholder="이름"
      />
      <ProfileField
        field="nickname"
        value={profileData.nickname}
        editMode={state.editMode}
        handleInputChange={handleInputChange}
        placeholder="닉네임"
      />
      <ProfileField
        field="id"
        value={profileData.id}
        editMode={false}
        handleInputChange={() => {}}
        placeholder="아이디"
      />
      <ProfileField
        field="email"
        value={profileData.email}
        editMode={false}
        handleInputChange={handleInputChange}
        placeholder="이메일"
      />
      <ProfilePassword
        password={profileData.password}
        passwordEditMode={state.passwordEditMode}
        editMode={state.editMode}
        togglePasswordEditMode={togglePasswordEditMode}
      />
      <ProfileImage
        profileImage={previewImage || profileData.profileImage} // 미리보기 이미지 또는 프로필 이미지
        editMode={state.editMode} // Edit mode 적용
        handleFileChange={handleFileChange}
        handleImageClick={() => fileInputRef.current?.click()}
        fileInputRef={fileInputRef}
      />
      <div style={myPageStyles.buttonContainer}>
        {state.editMode ? (
          <>
            <button onClick={handleSave} style={myPageStyles.profileButtonEdit}>저장</button>
            <button onClick={handleCancel} style={myPageStyles.profileButtonCancel}>취소</button>
          </>
        ) : (
          <>
            <button onClick={() => setState({ ...state, editMode: true })} style={myPageStyles.profileButtonEdit}>편집</button>
            <button onClick={handleDeleteAccount} style={myPageStyles.profileButtonQuit}>탈퇴</button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPageProfile;