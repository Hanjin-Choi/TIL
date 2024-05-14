<template>
  <div class="col">
    <div @click="moveDetail" class="card" style="width: 18rem;">
      <img :src="video.thumbnail" class="card-img-top" alt="thumb">
      <div class="card-body" style="height: 8rem;">
        <h5 class="card-title">{{ video.title }}</h5>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props=defineProps({
  video: Object,
})

const router = useRouter()
const moveDetail = function () {
  router.push({name:'detail',params:{videoId : props.video.id}})
}

</script>

<style  scoped>
.card {
  cursor: pointer;
}
</style>