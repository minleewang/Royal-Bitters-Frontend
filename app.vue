<!--app.vue가 전체를 감싸고 있다-->
<template>
  <div>
    <v-app>
      <NavigationBar />
      <v-main>
        <NuxtPage />
      </v-main>
    </v-app>
  </div>
</template>

<script setup></script>

<style scoped></style>
