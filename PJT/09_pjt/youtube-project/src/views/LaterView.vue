<template>
  <div>
    <h1>나중에 볼 동영상</h1>
    <p v-if="store.laterList.length===0">등록된 비디오 없음</p>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-4">
      <VideoItem v-for="video in store.laterList" :key="video.id" :video="video"/>
    </div>
  </div>
</template>

<script setup>
import VideoItem from '@/components/VideoItem.vue'
import { useYoutubeStore } from '@/stores/youtubeStore'

const store = useYoutubeStore()
</script>

<style scoped>
a {
  color: grey;
  text-decoration-line: none;
}
i {
  color: black;
}
</style>