<template>
  <div class="col">
    <div class="card p-3">
      <img :src="channel.thumbnail" class="card-img-top" alt="thumbnail">
      <div class="card-body " style="height: 8rem;">
        <p class="card-title">{{ channel.title }}</p>
      </div>
      <button class="btn btn-secondary" @click="store.deleteChannel(channel.id)">구독 취소</button>
    </div>
  </div>
</template>

<script setup>
import { useYoutubeStore } from '@/stores/youtubeStore'

defineProps({
  channel: Object,
})

const store = useYoutubeStore()
</script>

<style scoped>
.card {
  text-align: center;
}
img {
  border-radius: 100%;
  width: 90%;
  margin:auto;
}
</style>