<template>
  <div>
    <h1>구독 채널 목록</h1>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xxl-6 g-4">
      <ChannelItem v-for="channel in store.channelList" :key="channel.id" :channel="channel"/>
    </div>
  </div>
</template>

<script setup>
import ChannelItem from '@/components/ChannelItem.vue'
import { useYoutubeStore } from '@/stores/youtubeStore'

const store = useYoutubeStore()
console.log(store.channelList)
</script>

<style scoped>

</style>