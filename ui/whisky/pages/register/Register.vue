<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="whiskyTitle" label="위스키 이름" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field v-model="whiskyPrice" label="가격" type="number" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-textarea v-model="whiskyDescription" label="위스키 정보" auto-grow />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-file-input
          v-model="whiskyImage"
          label="위스키 이미지 파일"
          prepend-icon="mdi-camera"
        />
      </v-col>
    </v-row>

    <v-row v-if="uploadedFileName">
      <v-col cols="12">
        <p>업로드된 파일: {{ uploadedFileName }}</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="text-right">
        <v-btn color="primary" @click="onSubmit">작성 완료</v-btn>
        <v-btn color="error" @click="onCancel" class="ml-2">취소</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
definePageMeta({
  name: "WhiskyRegisterPage",
});

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useWhiskyStore } from "../../stores/whiskyStore";

const router = useRouter();
const whiskyStore = useWhiskyStore();

const whiskyTitle = ref("");
const whiskyPrice = ref(0);
const whiskyDescription = ref("");
const whiskyImage = ref(null);
const uploadedFileName = ref("");

const onSubmit = async () => {
  console.log("상품 등록 버튼 눌렀음");

  try {
    if (beerImage.value) {
      const formData = new FormData();
      formData.append("whiskyTitle", whiskyTitle.value);
      formData.append("whiskyPrice", whiskyPrice.value.toString());
      formData.append("whiskyDescription", whiskyDescription.value);
      formData.append("whiskyImage", whiskyImage.value);

      await whiskyStore.requestCreateWhisky(formData);

      uploadedFileName.value = whisky.uploadedFileName;

      router.push({ name: "WhiskyList" });
    } else {
      console.error("이미지 파일을 선택하세요!");
    }
  } catch (error) {
    console.error("상품 등록 실패:", error);
  }
};

const onCancel = () => {
  console.log("취소 버튼 눌렀음");
  router.back();
};
</script>
