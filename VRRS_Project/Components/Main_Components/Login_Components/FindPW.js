import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme,Main_theme } from "../../../assets/styles/Theme_Colors";
import BtnC from "../../../assets/styles/ReuseComponents/Button/BtnC";

export default function FindPW({ navigation }) {
  const [email, setEmail] = useState('');
  const [id, setid] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isIdValid, setIsIdValid] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isIdTouched, setIsIdTouched] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const validateId = (id) => {
    const idRegex = /^[a-zA-Z0-9]{6,12}$/;
    setIsIdValid(idRegex.test(id));
  };

  const handleFindPW = () => {
    if (isEmailValid && isIdValid) {
      alert(`비밀번호 재설정 요청이 전송되었습니다: ${email}`);
      navigation.navigate('FindPWr1');
    } else {
      alert('입력한 정보를 확인해주세요.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          비밀번호를 찾기 위해{'\n'}가입했던 이메일과 아이디를 입력해주세요.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="이메일 입력"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
            setIsEmailTouched(true);
          }}
          keyboardType="email-address"
          placeholderTextColor={Gray_theme.gray_40}
        />
        {isEmailTouched && (!isEmailValid || email === '') ? (
          <Text style={styles.warningText}>유효한 이메일을 입력해주세요.</Text>
        ) : isEmailTouched && isEmailValid ? (
          <Text> </Text>
        ) : null}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="아이디 입력"
          value={id}
          onChangeText={(text) => {
            setid(text);
            setIsIdTouched(true);
            setIsIdChecked(false);
            validateId(text);
          }}
          keyboardType="default" // or 'ascii-capable'
          placeholderTextColor={Gray_theme.gray_40}
        /><View style={{ height: 24 }}>
          {isIdTouched && isIdChecked ? (
            <Text> </Text>
          ) : isIdTouched && !isIdValid ? (
            <Text style={styles.warningText}>아이디는 6-12자의 영문 또는 숫자입니다.</Text>
          ) : null}
        </View>
      </View>

      <View style={styles.btnContainer}>
        <BtnC onPress={handleFindPW}>확인</BtnC>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_theme.white,
  },
  titleContainer: {
    textAlign: 'left',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  btnContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },

  title: {
    color: Gray_theme.balck,
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
  },
  input: {
    height: 48,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: Gray_theme.gray_40,
    fontFamily: "Pretendard-Medium",
    fontSize: 14,
  },
  warningText: {
      fontSize: 12,
      fontFamily: 'Pretendard-Regular',
      color: Main_theme.main_reverse,
      marginTop: 4,
  },
});