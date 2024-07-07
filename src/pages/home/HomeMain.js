import React, { useState } from "react";
import { commonStyles } from "../../styles/styles";
import { Logo } from "../../components/CommonComponents";

const HomeMain = () => {
  const [addressInputs, setAddressInputs] = useState([
    { profile: "/img/default-profile.png", name: "솔룩션짱짱최고" },
  ]);
  const [selectedPurpose, setSelectedPurpose] = useState("");

  const handleAddInput = () => {
    setAddressInputs([
      ...addressInputs,
      { profile: "/img/default-profile.png", name: "@솔룩스" },
    ]);
  };

  const handlePurposeChange = (event) => {
    setSelectedPurpose(event.target.value);
  };

  const purposes = [
    "목적 추천 TEST",
    "맛집",
    "카페",
    "산책/등산",
    "공부",
    "문화생활",
    "핫플",
    "친목",
  ];

  return (
    <div style={commonStyles.container}>
      <Logo />
      <div style={commonStyles.content}>
        {addressInputs.map((input, index) => (
          <div key={index} style={commonStyles.inputContainer}>
            <div style={commonStyles.profileContainer}>
              <img
                src={input.profile}
                alt="프로필 이미지"
                style={commonStyles.profileImg}
              />
              <span style={commonStyles.profileName}>{input.name}</span>
            </div>
            <div style={commonStyles.inputGroup}>
              <input
                type="text"
                placeholder="주소를 입력하세요"
                style={commonStyles.inputField}
              />
              <button type="button" style={commonStyles.submitButton}>
                검색
              </button>
            </div>
          </div>
        ))}
        <div style={commonStyles.addButton} onClick={handleAddInput}></div>
        <div style={commonStyles.destination}>
          <select
            value={selectedPurpose}
            onChange={handlePurposeChange}
            style={commonStyles.selectField}
          >
            <option value="" disabled hidden>
              목적을 선택하세요
            </option>
            {purposes.map((purpose, index) => (
              <option key={index} value={purpose}>
                {purpose}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="button" style={commonStyles.placeButton}>
            장소 찾기
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeMain;
