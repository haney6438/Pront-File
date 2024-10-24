import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { Gray_theme } from "../../../assets/styles/Theme_Colors";
import BackHeader from "../../../assets/styles/ReuseComponents/Header/BackHeader";
import MainIcons from "../../../assets/Icons/MainIcons";
import Btn from "../../../assets/styles/ReuseComponents/Button/Btn";
import useTabBarVisibility from "../../../assets/styles/ReuseComponents/useTabBarVisibility ";
import DropDown from "../../../assets/styles/ReuseComponents/Button/DropDown";

import Octicons from '@expo/vector-icons/Octicons';

import { useUser } from "../../../assets/ServerDatas/Users/UserContext";
import { vegTypes } from "../../../assets/ServerDatas/Dummy/dummyVegTypes";

export default function User_ModifyScreen({ navigation }) {
    useTabBarVisibility(false);

    const { user, name, vegTypeName } = useUser();

    const [vegType, setVegType] = useState(null);
    const [nickname, setNickname] = useState(name);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(
        vegTypes
            .filter((item) => item.id !== 0)
            .map((item) => ({ label: item.name, value: item.id }))
    );

    useEffect(() => {
        const matchedItem = items.find(item => item.label === vegTypeName);
        if (matchedItem) {
            setVegType(matchedItem.value);
        }
    }, [vegTypeName, items]);

    const handleModify = () => {
        alert(`닉네임 : ${nickname} 채식 유형 : ${vegType}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackHeader
                onPress={() => {
                    navigation.goBack();
                }}
            >내 정보 수정
            </BackHeader>
            <View style={styles.profileContainer}>
                <Image
                    source={MainIcons.user_profile}
                    style={{ width: 72, height: 72 }}
                />
                <TouchableOpacity style={styles.cameraIconContainer}>
                    <Octicons name="device-camera" size={16} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>닉네임</Text>
                <TextInput
                    style={styles.input}
                    value={nickname}
                    onChangeText={setNickname}
                    placeholder="닉네임을 정해주세요"
                    placeholderTextColor={Gray_theme.gray_40}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>채식 유형</Text>
                <DropDown
                    open={open}
                    value={vegType}
                    items={items}
                    setOpen={setOpen}
                    setValue={setVegType}
                    setItems={setItems}
                    placeholder={"채식 유형을 선택해주세요"}
                ></DropDown>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Btn onPress={handleModify}>확인</Btn>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Gray_theme.white,
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 24,
        marginBottom: 40,
    },
    cameraIconContainer: {
        position: 'absolute',
        right: 144,
        top: 48,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Gray_theme.gray_50,
        borderRadius: 15,
        borderColor: Gray_theme.white,
        borderWidth: 1,
    },
    inputContainer: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    buttonContainer: {
        paddingHorizontal: 16,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: Gray_theme.black,
        marginBottom: 8,
        paddingHorizontal: 8,
    },
    input: {
        width: '100%',
        height: 48,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: Gray_theme.gray_60,
        borderRadius: 8,
        fontSize: 14,
    },
    button: {
        width: '30%',
    },
});
