<template>
  <div
    class="pa-0"
    :style="{
      backgroundImage:
        'url(https://www.theguru.co.kr/data/photos/20210728/art_16263394591829_693b10.jpg)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: '120px',
      width: '100%',
      margin: '0',
    }"
  >
    <v-container>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-col class="text-center">
          <h2 :style="{ color: 'red', fontSize: '48px' }" class="mb-4">
            Check out various alcohol!
          </h2>
        </v-col>
      </v-row>

      <!-- 기능 카드 섹션 -->
      <v-row class="mt-6" align="start">
        <v-col v-for="n in 8" :key="n" cols="12" sm="6" md="3">
          <v-card>
            <v-img src="https://picsum.photos/1600/900" height="200"></v-img>
            <v-card-title class="text-h6">특징 {{ n }}</v-card-title>
            <v-card-subtitle> 가즈아~ 지브로 </v-card-subtitle>
            <v-card-actions>
              <v-btn text>Learn More</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Footer 섹션 -->
      <v-row>
        <v-col cols="12" class="text-center">
          <v-divider></v-divider>
          <p>&copy; Drink.alcohol();</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped></style>
