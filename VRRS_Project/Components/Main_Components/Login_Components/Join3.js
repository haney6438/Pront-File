import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme, Main_theme } from "../../../assets/styles/Theme_Colors";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import DropDown from "../../../assets/styles/ReuseComponents/Button/DropDown";
import showToast from "../../../assets/styles/ReuseComponents/showToast";

import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// Data 관련
import { vegTypes } from "../../../assets/ServerDatas/Dummy/dummyVegTypes";
import { joinUser } from "../../../assets/ServerDatas/ServerApi/authApi";

export default function Join3({ route, navigation }) {
  useTabBarVisibility(false);
  const windowWidth = useWindowDimensions().width;
  const windowHeigh = useWindowDimensions().height;

  // DropDown에 사용될 변수 및 내용입니다
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    vegTypes
      .filter((item) => item.id !== 0)
      .map((item) => ({ label: item.name, value: item.id }))
  );

  const { username, email, password } = route.params;
  const [nameText, setNameText] = useState("");
  const [isNicknameTouched, setIsNicknameTouched] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);

 // 닉네임 유효성 검사 함수 수정
const validateNickname = (nickname) => {
  const isValidLength = nickname.length >= 2 && nickname.length <= 15;
  setIsNicknameValid(isValidLength);
  return isValidLength; // 유효성 검사 결과 반환
};

// handleConfirm 함수 수정
const handleConfirm = async () => {
  if (nameText === "" || !value) {
    showToast("모든 항목을 작성해주세요");
    return;
  }
  // 사용자 정보가 모두 유효한지 확인
  if (!validateNickname(nameText) || value === "none") {
    showToast("입력한 정보를 확인해주세요");
    return; // 유효성 검사 실패 시 종료
  } else {
    try {
      await joinUser({
        username,
        email,
        password,
        nickname: nameText,
        vegTypeId: value,
      });
      navigation.navigate("Joinr");
    } catch (error) {
      console.error("Failed to join:", error);
      Alert.alert("오류", "회원가입에 실패했습니다.");
    }
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      >
        회원가입하기
      </BackHeader>
      {/* 단계 섹션 */}
      <View style={styles.stepContainer}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.stepHeader}>정보입력</Text>
        </View>
        <View style={styles.stepIndicator1}>
          <Octicons name="dot-fill" size={24} color={Gray_theme.gray_30} />
          <Octicons
            name="kebab-horizontal"
            size={24}
            color={Gray_theme.gray_30}
          />
          <Octicons name="dot-fill" size={24} color={Gray_theme.gray_30} />
          <Octicons
            name="kebab-horizontal"
            size={24}
            color={Gray_theme.gray_30}
          />
          <MaterialCommunityIcons
            name="numeric-3-circle"
            size={24}
            color={Main_theme.main_50}
          />
        </View>
        <View style={styles.stepIndicator2}>
          <Text style={styles.stepText2}>약관동의</Text>
          <Octicons name="kebab-horizontal" size={24} color="white" />
          <Text style={styles.stepText2}>계정생성 </Text>
          <Octicons name="kebab-horizontal" size={24} color="white" />
          <Text style={styles.stepText1}>정보입력 </Text>
        </View>
      </View>
      {/* 닉네임 입력란 */}
      <View style={styles.inputContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>닉네임</Text>
          <FontAwesome5
            name="star-of-life"
            size={8}
            color={Main_theme.main_30}
            style={styles.cPoint}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="가입 후 변경 가능합니다"
          value={nameText}
          onChangeText={(name) => {
            setNameText(name);
            setIsNicknameTouched(true); // 닉네임 입력 필드가 터치됨
            validateNickname(name); // 닉네임 유효성 검사
          }}
          placeholderTextColor={Gray_theme.gray_40}
        />
        <View style={{ marginBottom: 4 }}>
          {isNicknameTouched && !isNicknameValid && (
            <Text style={styles.warningText}>
              닉네임은 2-15자 이내로 입력해주세요.
            </Text>
          )}
          {isNicknameValid && (
            <Text style={styles.helperText}>사용할 수 있는 닉네임입니다.</Text>
          )}
        </View>
      </View>

      {/* 채식 유형 선택 */}
      <View style={styles.inputContainer}>
        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          <Text style={styles.label}>채식 유형</Text>
          <FontAwesome5
            name="star-of-life"
            size={8}
            color={Main_theme.main_30}
            style={styles.cPoint}
          />
        </View>
        <DropDown
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={"채식 유형을 선택해주세요"}
        ></DropDown>
        <View style={{ height: 16 }}>
          {value === "none" && (
            <Text style={styles.warningText}>
              반드시 입력해야 하는 정보입니다.
            </Text>
          )}
        </View>
      </View>

      {/* 다음 버튼 */}
      <View style={{ ...styles.button }}>
        <BtnC onPress={handleConfirm}>다음</BtnC>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  stepContainer: {
    paddingBottom: 24,
  },
  stepHeader: {
    fontSize: 28,
    fontFamily: "Pretendard-Bold",
    color: Main_theme.main_50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  stepIndicator1: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 80,
    marginTop: 20,
  },
  stepIndicator2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 72,
  },
  stepText1: {
    fontFamily: "Pretendard-Bold",
    fontSize: 14,
    color: Main_theme.main_50,
  },
  stepText2: {
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
    color: Gray_theme.gray_30,
  },
  inputContainer: {
    position: "relative",
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 16,
    fontFamily: "Pretendard-Medium",
    marginLeft: 8,
    marginBottom: 6,
  },
  input: {
    height: 48,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Gray_theme.gray_40,
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
  },
  helperText: {
    fontSize: 12,
    fontFamily: "Pretendard-Regular",
    color: Main_theme.main_50,
    left: 4,
    marginTop: 4,
  },
  warningText: {
    fontSize: 12,
    fontFamily: "Pretendard-Regular",
    color: Main_theme.main_reverse,
    left: 4,
    marginTop: 4,
  },
  button: {
    position: "absolute",
    bottom: 24,
    right: 0,
    left: 0,
    paddingHorizontal: 24,
  },
  cPoint: {
    marginLeft: 4,
    marginTop: 2,
  },
});
