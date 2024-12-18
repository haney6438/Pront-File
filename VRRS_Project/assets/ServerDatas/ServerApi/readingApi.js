// 서버에서 판독 관련 내용을 저장한 파일입니다.
import axios from "axios";
import Constants from "expo-constants";
import showToast from "../../styles/ReuseComponents/showToast";

// 서버 URL
const SERVER_URL = Constants.expoConfig?.extra?.serverUrl;

// OCR 기능 URL
const OCR_URL = `${SERVER_URL}${Constants.expoConfig?.extra?.ocrEndPoint}`; // OCR URL
console.log(OCR_URL);
const READING_URL = `${SERVER_URL}${Constants.expoConfig?.extra?.readingEndPoint}`; // reading URL
console.log(READING_URL);
const UPLOAD_URL = `${SERVER_URL}${Constants.expoConfig?.extra?.uploadEndPoint}`; // 제품 업로드 URL

// OCR 등록 함수
// OCR 등록 함수
export const getOCRData = async (fileUri, jwt) => {
  try {
    // fileUri가 유효한지 확인
    if (typeof fileUri !== "string" || !fileUri) {
      throw new Error("Invalid file URI");
    }

    // formData 생성 및 파일 추가
    const formData = new FormData();
    formData.append("file", {
      uri: fileUri,
      name: "ocr_image.jpg",
      type: "image/jpeg",
    });

    // fetch를 사용해 multipart/form-data 요청 보내기
    const response = await fetch(OCR_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`, // JWT 토큰 추가
        // Content-Type 생략
      },
      body: formData,
    });

    if (!response.ok) {
      // 상태 코드에 따라 에러 메시지 추가
      let errorMessage;
      if (response.status === 422) {
        const errorData = await response.json(); // 422의 경우 데이터 포함
        errorMessage = { status: 422, data: errorData };
      } else if (response.status === 400) {
        errorMessage = `${response.status}`;
      } else {
        errorMessage = `${response.status}`;
      }
      throw new Error(JSON.stringify(errorMessage));
    }

    // JSON 응답 데이터 반환
    const data = await response.json();
    return data;
  } catch (error) {
    const errorObj = JSON.parse(error.message);
    if (errorObj.status === 422) {
      showToast("원재료명을 확인해주세요");
      console.log("OCR 요청 에러:", errorObj); // 422의 경우 데이터 로그
      return errorObj.data;
    } else {
      console.log("OCR 요청 에러:", errorObj);
      throw new Error(errorObj);
    }
  }
};

// Reading 함수
export const submitProductData = async (
  reportNum,
  vegTypeId,
  ingredients,
  exists,
  fullBracket,
  jwt
) => {
  try {
    const response = await axios.post(
      READING_URL,
      {
        reportNum: reportNum,
        vegTypeId: vegTypeId,
        ingredients: ingredients,
        exists: exists,
        fullBracket: fullBracket,
      },
      {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 명시
          Authorization: `Bearer ${jwt}`, // JWT 토큰 추가 (필요할 경우)
        },
      }
    );

    console.log("Server response:", response.data); // 서버 응답 확인
    return response.data; // 서버에서 반환하는 데이터
  } catch (error) {
    console.error("Failed to submit data:", error);
    throw error;
  }
};

// 제품 업로드 함수
export const uploadProductData = async (image, jsonData, jwt) => {
  try {
    const formData = new FormData();

    formData.append("file", {
      uri: image.uri,
      type: "image/jpeg",
      name: "product_image.jpg",
    });

    formData.append("jsonData", JSON.stringify(jsonData));

    console.log("FormData 내용:", formData._parts);

    const response = await axios.post(UPLOAD_URL, formData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      return { success: false, message: "이미 등록된 제품입니다." };
    } else {
      throw error;
    }
  }
};
