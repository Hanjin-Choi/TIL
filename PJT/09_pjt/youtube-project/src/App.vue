<template>
  <div>
    <Navbar />
    <div class="container my-4">
      <p @click="goBack"><i class="fa-solid fa-arrow-left fa-xl"></i>&nbsp;뒤로 가기</p>
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
const goBack = function() {
  router.go(-1)
}
</script>

<style scoped>
p {
  cursor: pointer;
}
</style>