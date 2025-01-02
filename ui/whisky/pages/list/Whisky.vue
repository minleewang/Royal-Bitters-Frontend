<template>
  <div
    class="pa-0"
    :style="{
      backgroundImage: `url(${whiskyImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      width: '100%',
      margin: '0',
    }"
  >
    <v-container>
      <h2 :style="{ color: 'gold' }">Whisky Chart</h2>

      <!-- 상품 등록 링크 -->
      <div style="text-align: left; margin: 15px">
        <NuxtLink :to="{ name: 'WhiskyRegisterPage' }">위스키 등록</NuxtLink>
      </div>

      <!-- 상품 목록 -->
      <v-row v-if="whiskyList.length > 0">
        <v-col v-for="(whisky, index) in whiskyList" :key="index" sm="3">
          <v-card @click="goToWhiskyReadPage(whisky.id)">
            <v-img
              :src="getWhiskyImageUrl(whisky.image)"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <!-- 이미지 로딩 중 빙글빙글 도는 부분이 추가됨(지연이 없다면 나타나지 않음) -->
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5" />
                </v-row>
              </template>
            </v-img>
            <!-- 위스키 타이틀 이름 -->
            <v-card-title>{{ whisky.title }}</v-card-title>
            <!-- 가격 정보 -->
            <v-card-subtitle>{{ whisky.price }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>

      <!-- 상품이 없을 경우 안내 메시지 -->
      <v-row v-else>
        <v-col cols="12" class="text-center">
          <v-alert type="info">등록된 위스키가 없습니다!</v-alert>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="text-center">
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="5"
            :prev-icon="'mdi-chevron-left'"
            :next-icon="'mdi-chevron-right'"
            :first-icon="'mdi-chevron-double-left'"
            :last-icon="'mdi-chevron-double-right'"
          />
          <p>현재 페이지: {{ currentPage }}</p>
        </v-col>
      </v-row>

      <v-row
        class="d-flex"
        style="
          min-height: 100vh;
          flex-direction: column;
          justify-content: flex-end;
        "
      >
        <v-col cols="12" class="text-center">
          <v-divider></v-divider>
          <p>&copy; Drink.alcohol();</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useWhiskyStore } from "../../stores/whiskyStore";
import { useRouter } from "vue-router";
import { resolve } from "path";
import whiskyImage from "@/assets/images/fixed/whiskyBackGround.jpg";

const whiskyStore = useWhiskyStore();
const whiskyList = computed(() => whiskyStore.whiskyList);

const totalPages = computed(() => whiskyStore.totalPages);
const currentPage = ref(1);
const perPage = 8;

// 라우터 설정
const router = useRouter();

interface ImageModule {
  default: string;
}

// 상품 이미지 URL을 반환하는 함수
const images = import.meta.glob("@/assets/images/uploadImages/*", {
  eager: true,
}) as Record<string, ImageModule>;
for (const [key, value] of Object.entries(images)) {
  console.log(`Key: ${key}`);
  console.log(`Value:`, value);
}

const getWhiskyImageUrl = (imageName: string) => {
  console.log(`imageName: ${imageName}`);
  console.log(`images[\`@/assets/images/uploadImages/${imageName}\`]`);
  console.log(`images: ${images}`);
  const imagePathKey = `/assets/images/uploadImages/${imageName}`;
  console.log(`imagePathKey: ${imagePathKey}`);
  const imagePath = images[imagePathKey];
  console.log(`imagePath: ${imagePath.default}`);

  if (imagePath) {
    return imagePath.default;
  }
  return "/assets/images/default-image.jpg";
};

// 상품 상세 페이지로 이동하는 함수
const goToWhiskyReadPage = (id: string) => {
  router.push({
    name: "WhiskyRead",
    params: { id },
  });
};

watch(currentPage, (newPage) => {
  whiskyStore.requestWhiskyList(newPage, perPage);
});

// 컴포넌트 마운트 시 상품 목록 요청
onMounted(() => {
  whiskyStore.requestWhiskyList();
});
</script>

<style scoped>
.btn-text {
  color: white;
}
</style>
