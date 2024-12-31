<template>
  <v-app-bar app color="black" white>
    <v-btn @click="goToHome">
      <v-toolbar-title>Drink.alcohol();</v-toolbar-title>
    </v-btn>
    <v-spacer></v-spacer>

    <v-btn text @click="toggleBottomBar" class="btn-text">
      <v-icon left>mdi-eye</v-icon>
      <span>상품보기</span>
    </v-btn>

    <v-app-bar v-if="isBottomBarVisible" app color="secondary" dark>
      <v-spacer></v-spacer>
      <v-btn text @click="goToWinePage" class="btn-text">
        <v-icon left>mdi-glass-wine</v-icon>
        <span>와인</span>
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn text @click="goToWhiskyPage" class="btn-text">
        <v-icon left>mdi-delete-variant</v-icon>
        <span>위스키</span>
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn text @click="goToBeerPage" class="btn-text">
        <v-icon left>mdi-glass-mug-variant</v-icon>
        <span>맥주</span>
      </v-btn>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-btn text @click="goToCart" class="btn-text">
      <v-icon left>mdi-cart-outline</v-icon>
      <span>카트</span>
    </v-btn>

    <!-- 로그인 버튼 -->
    <template v-if="!kakaoAuthentication.isAuthenticated">
      <v-btn text @click="signIn" class="btn-text">
        <!-- 아이콘 설정 (mdi-login은 로그인 아이콘) -->
        <v-icon left>mdi-login</v-icon>
        <span>로그인</span>
      </v-btn>
    </template>

    <template v-else>
      <v-btn text @click="signOut" class="btn-text">
        <v-icon left>mdi-logout</v-icon>
        <span>로그아웃</span>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useKakaoAuthenticationStore } from "~/kakaoAuthentication/stores/kakaoAuthenticationStore";

const router = useRouter();
const kakaoAuthentication = useKakaoAuthenticationStore();

const isBottomBarVisible = ref(false);

const goToHome = () => {
  router.push("/");
};

const toggleBottomBar = () => {
  isBottomBarVisible.value = !isBottomBarVisible.value;
};

const goToWinePage = () => {
  router.push("/wine/list");
  isBottomBarVisible.value = false;
};

const goToWhiskyPage = () => {
  router.push("/whisky/list"); // 게시판 페이지로 연결
  isBottomBarVisible.value = false;
};

const goToBeerPage = () => {
  router.push("/beer/list"); // 게시판 페이지로 연결
  isBottomBarVisible.value = false;
};

const goToCart = () => {
  console.log("Go to Cart clicked!");
  router.push("/cart/list"); // 카트 페이지로 이동
};

// 기존 Domain/index.ts에 등록한 라우터 URL로 맵핑
const signIn = () => {
  console.log("로그인 클릭");
  router.push("/account/login");
};

const signOut = () => {
  console.log("로그아웃 클릭");
  const userToken = localStorage.getItem("userToken");

  if (userToken != null) {
    kakaoAuthentication.requestLogout(userToken);
  } else {
    console.log("userToken이 없습니다");
  }

  localStorage.removeItem("userToken");
  kakaoAuthentication.isAuthenticated = false;
  router.push("/");
};

onMounted(async () => {
  const userToken = localStorage.getItem("userToken");

  if (userToken) {
    const isValid = await kakaoAuthentication.requestValidationUserToken(
      userToken
    );
    kakaoAuthentication.isAuthenticated = isValid;
  }
});
</script>
