<template>
  <div>
    <h1>{{ video.title }}</h1>
    <p>업로드 날짜 : {{ video.publishedAt.slice(0,10) }}</p>
    <div class="area">
      <iframe :src="videoUrl" frameborder="0"></iframe>
    </div>
    <p>{{ video.description }}</p>
  </div>
  &nbsp;
  <button v-if="isLater >= 0" type="button" class="btn btn-secondary" @click="store.deleteLater(video)">저장 취소</button>
  <button v-else type="button" class="btn btn-primary" @click="store.addLater(video)">동영상 저장</button>
  &nbsp;
  <button v-if="isSubscribed >= 0" type="button" class="btn btn-secondary" @click="store.deleteChannel(video.channelId)">구독 취소</button>
  <button v-else type="button" class="btn btn-warning" @click="store.getChannel(video.channelId)">채널 저장</button>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useYoutubeStore } from '@/stores/youtubeStore'
import { computed } from 'vue';

const route = useRoute()

const store = useYoutubeStore()
const video = store.findVideo(route.params.videoId)

const videoUrl = `https://www.youtube.com/embed/${video.id}`

const isLater = computed(() => {
  return store.laterList.findIndex(element => element.id === video.id)
})

const isSubscribed = computed(() => {
  return store.channelList.findIndex(element => element.id === video.channelId)
})
</script>

<style scoped>
.area {
  position: relative;
  width : 100%;
  padding-bottom : 56.25%;
}
iframe{
  position: absolute;
  width: 100%; 
  height: 100%;
}
</style>