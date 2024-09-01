import { vegTypes } from "./dummyVegTypes";

export const users = [
  {
    id: 1,
    username: "김철수",
    veg_type_id: 1, // 비건
  },
  {
    id: 2,
    username: "이우빈",
    veg_type_id: 2, // 락토
  },
  {
    id: 3,
    username: "구본하",
    veg_type_id: 3, // 오보
  },
];

// 특정 유저의 채식 유형 이름을 ID로 찾는 함수
export const getUserVegTypeName = (vegTypeId) => {
  const vegType = vegTypes.find((type) => type.id === vegTypeId);
  return vegType ? vegType.name : "Unknown";
};

// 전체 유저 데이터를 가져오는 함수
export const getAllUsers = () => {
  return users;
};