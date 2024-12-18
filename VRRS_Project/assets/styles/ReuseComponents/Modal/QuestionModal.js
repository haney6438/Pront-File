import { StyleSheet } from "react-native";
import { Text, View, Modal } from "react-native";
import { Gray_theme, Main_theme } from "../../Theme_Colors";
import Octicons from "@expo/vector-icons/Octicons";
import BtnC from "../Button/BtnC";

const QuestionModal = ({ children, visible, onRequestClose, onPress }) => {
  return (
    <Modal
      animationType="fade" //모달이 나타나는 방식
      visible={visible} //모달이 보이는 여부
      transparent={true} // 모달 배경 투명 여부
      onRequestClose={onRequestClose} // 뒤로가기를 눌렀을 때
    >
      <View
        style={styles.modalBgc}
        onTouchEnd={onRequestClose} // 모달창의 배경을 눌렀을 때
      >
        <View
          style={styles.modalContainer}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <View style={styles.modalHeader}>
            {/* 모달 창의 제목이 되는 텍스트 입니다. */}
            <Text style={styles.modalHeaderText}>{children}</Text>
          </View>

          <View style={styles.modalBtn}>
            <BtnC
              style={styles.style_cancle}
              stlye_title={styles.cancle_title}
              onPress={onRequestClose}
            >
              취소
            </BtnC>
            <BtnC style={styles.style_ok} onPress={onPress}>
              확인
            </BtnC>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBgc: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 뒷 배경 흐리게
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: Gray_theme.white,
    width: "100%",
    borderRadius: 10,
    elevation: 3,
  },

  modalHeader: {
    paddingVertical: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeaderText: {
    textAlign: "left",
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    color: Gray_theme.balck,
  },
  modalBtn: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    marginVertical: 16,
  },
  style_cancle: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: Gray_theme.gray_30,
    borderColor: Gray_theme.gray_30,
    marginRight: 4,
  },
  cancle_title: {
    color: Gray_theme.gray_70,
  },
  style_ok: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: Main_theme.main_30,
    marginLeft: 4,
  },
});

export default QuestionModal;
