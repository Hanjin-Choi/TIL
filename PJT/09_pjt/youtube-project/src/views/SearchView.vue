<template>
  <div>
    <h1>비디오 검색</h1>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="검색어를 입력해주세요" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="word">
      <button class="btn btn-success" type="button" id="button-addon2" @click="getVideo">찾기</button>
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-4">
      <VideoItem v-for="video in store.videoList" :key="video.id" :video="video"/>
    </div>
  </div>
</template>

<script setup>
import VideoItem from '@/components/VideoItem.vue'
import { useYoutubeStore } from '@/stores/youtubeStore'
import { ref } from 'vue'

const store = useYoutubeStore()
const word = ref('')

const getVideo = function() {
  store.getVideo(word.value)
  word.value = ''
}
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