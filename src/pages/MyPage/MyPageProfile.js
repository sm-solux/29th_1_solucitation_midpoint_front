import React from 'react';
import { myPageStyles } from '../../styles/myPageStyles';

const MyPageProfile = () => {
  // 예시 데이터임, 수정해야함
  const profileData = {
    name: '김눈송',
    nickname: '솔룩션짱짱최고',
    email: 'soluxion@sookmyung.ac.kr',
    password: '********',
    profileImage: '../img/default-profile.png',

  };
  return (
    <div style={myPageStyles.profileContainer}>
      <div style={myPageStyles.profileItem}>
        <span style={myPageStyles.profileLabel}>이름</span>
        <span style={myPageStyles.profileText}> {profileData.name}</span>
      </div>
      <div style={myPageStyles.profileItem}>
        <span style={myPageStyles.profileLabel}>닉네임</span>
        <span style={myPageStyles.profileText}> {profileData.nickname}</span>
      </div>
      <div style={myPageStyles.profileItem}>
        <span style={myPageStyles.profileLabel}>이메일</span>
        <span style={myPageStyles.profileText}> {profileData.email}</span>
      </div>
      <div style={myPageStyles.profileItem}>
        <span style={myPageStyles.profileLabel}>비밀번호</span>
        <span style={myPageStyles.profileText}>{profileData.password}</span>
      </div>
      <div>
        <div style={myPageStyles.profileLabel}>프로필 사진</div>
        <div>
          <img src={profileData.profileImage} alt="프로필 사진" style={{ maxWidth: '200px', borderRadius: '50%' }} />
        </div>
      </div>
      <span style={myPageStyles.profileButtonContainer} >
        <button style={myPageStyles.profileButtonEdit}>편집</button>
        <button style={myPageStyles.profileButtonQuit}>탈퇴</button>
      </span>
    </div>
  );
};

export default MyPageProfile;
