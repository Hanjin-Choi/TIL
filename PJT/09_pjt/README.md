# PJT 09

### 이번 pjt 를 통해 배운 내용

* ifram 사용법
* Vue의 Pinia를 사용한 local storage 활용법


## A. 동영상 검색결과 출력

### 요구 사항
  * 네비게이션 바에서 Search 링크 클릭
  * 원하는 검색어 입력
  * YouTube API로부터 Json 데이터 요청

### 결과
#### 네비게이션 바
```html
<template>
  <nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">MyTube</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{name:'home'}">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{name:'search'}">Search</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{name:'later'}">Later</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{name:'channel'}">Channel</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
```
  * 내가 생각하는 이 문제의 포인트
    * Bootstrap의 navbar에서 a tag 대신 RouterLink tag를 이용하여 nav item을 구성

#### 검색어 입력 및 요청
```html
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
```    
```js
export const useYoutubeStore = defineStore('youtube', () => {
  const videoList = ref([])
  const getVideo = function(word) {
    axios({
      method: 'get',
      url : `${URL}/search`,
      params : {
        key: API_KEY,
        part: 'snippet',
        q: word,
        type: 'video',
        maxResults: 12
      }
    })
    .then(res => {
      console.log(res.data)
      videoList.value = []
      res.data.items.forEach(element => {
        const item = {}
        const channel = {}
        item.id = element.id.videoId
        item.title = element.snippet.title
        item.thumbnail = element.snippet.thumbnails.medium.url
        item.channelId = element.snippet.channelId
        item.description = element.snippet.description
        item.publishedAt = element.snippet.publishedAt
        channel.channelId = element.snippet.channelId
        channel.channelTitle = element.snippet.channelTitle
        videoList.value.push(item)
        channelList.value.push(channel)
      })
      console.log(videoList.value)
    })
    .catch(err => console.log(err))
  }
  return { videoList, channelList, laterList, getVideo ,findVideo, addLater, deleteLater }
}, { persist: true })
```

  * 내가 생각하는 이 문제의 포인트
    * 검색어를 양방향 바인딩을 이용하여 실시간으로 탐지 및 저장
    * Local storage에 검색한 동영상 리스트 12개를 저장
    * Youtube API를 이용하여 동영상 검색

## B. 동영상 상세 정보 출력

### 요구 사항
  * 검색 결과에서 특정 비디오 클릭
  * 동영상에 대한 상세 정보 출력
  * iframe 태그 활용해 동영상 재생
  * 동영상 저장
    * Local Storage 활용
    * 저장 안 된 동영상 => 동영상 저장 버튼
    * 저장된 동영상 => 저장 취소 버튼

### 결과
  
```html
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
  <button type="button" class="btn btn-warning">채널 저장</button>
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
```
  * 내가 생각하는 이 문제의 포인트
    * iframe에 영상링크 입력시 embed를 활용한 주소 입력
    * iframe으로 영상 호출 시 화면크기에 맞는 동영상 크기 조절
    * v-if를 이용하여 동영상 저장 및 저장 취소 버튼 구현

## C. 나중에 볼 동영상 저장 및 삭제

* 요구 사항
  * Local Storage 활용
  * 등록된 동영상 없을 경우 - 등록된 비디오 없음 출력

* 결과 : 10명의 사람에게 보내지 않으면 ....
```html
<!-- DetailView -->
<template>
  <button v-if="isLater >= 0" type="button" class="btn btn-secondary" @click="store.deleteLater(video)">저장 취소</button>
  <button v-else type="button" class="btn btn-primary" @click="store.addLater(video)">동영상 저장</button>
  &nbsp;
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useYoutubeStore } from '@/stores/youtubeStore'
import { computed } from 'vue';

const store = useYoutubeStore()
const video = store.findVideo(route.params.videoId)

const videoUrl = `https://www.youtube.com/embed/${video.id}`

const isLater = computed(() => {
  return store.laterList.findIndex(element => element.id === video.id)
})
</script>
```

```html
<!-- LaterView -->
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
```

```js
export const useYoutubeStore = defineStore('youtube', () => {
  const URL = 'https://www.googleapis.com/youtube/v3'
  const API_KEY = 'AIzaSyCuYJGR5SyPEKjFlVJ2V4dzFZQhss4JWCg'

  const videoList = ref([])
  const channelList = ref([])
  const laterList= ref([])
  const findVideo = computed(()=>{
    return (id) => {
      return videoList.value.find((element)=> element.id ===id )
    }
  })

  const addLater = function (video) {
    laterList.value.push(video)
    console.log(laterList)
  }
  const deleteLater = function (video) {
    const idx = laterList.value.indexOf(video)
    laterList.value.splice(idx,1)
    console.log(laterList)
  }
  return { videoList, channelList, laterList, getVideo ,findVideo, addLater, deleteLater }
}, { persist: true })

```
  * 내가 생각하는 이 문제의 포인트
    * 동영상 세부사항에서 Local Storage의 나중에 볼 동영상 목록에 동영상 객체가 들어있는지 확인하여 추가 및 삭제 기능 구현
    * 나중에 볼 동영상 리스트 목록을 기존의 동영상 item 컴포넌트를 이용하여 표시

## D. 내가 좋아하는 채널 저장 및 삭제

* 요구 사항
  * 상세 페이지에 채널 저장 기능 추가
  * 클릭 시 Local Storage 활용해 채널 저장
  * 채널 페이지 접속 시 저장된 채널 목록 출력

* 결과
```js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useYoutubeStore = defineStore('youtube', () => {
  const channelList = ref([])
  const getChannel = function(channelId) {
    axios({
      method: 'get',
      url: `${URL}/channels`,
      params: {
        key: API_KEY,
        part: 'snippet',
        id: channelId
      }
    })
    .then(res => {
      console.log(res.data)
      const channel = {}
      channel.id = res.data.items[0].id
      channel.title = res.data.items[0].snippet.title
      channel.thumbnail = res.data.items[0].snippet.thumbnails.medium.url
      channelList.value.push(channel)
    })
    .catch(err => console.log(err))
  }
  const deleteChannel = function (channelId) {
    const idx = channelList.value.findIndex((element) => {
      return element.id === channelId
    })
    console.log(channelId)
    channelList.value.splice(idx,1)
    console.log(channelList)
  }
  return { videoList, channelList, laterList, getVideo, getChannel, findVideo, addLater, deleteLater, deleteChannel }
}, { persist: true })
```
```html
<!-- channelView.vue -->
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

```
```html
<!-- channelItem.vue -->
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
```

  * 내가 생각하는 이 문제의 포인트
    * 채널 이름과 채널 사진을 동영상 Id를 통해 조회 후 구독 목록을 새로 형성
    * 채널item 컴포넌트 작성을 통해 반복된 채널 정보를 routing을 통해 표기


# 후기

* Local Storage를 초반에 형성하여 API 조회 횟수를 줄일 수 있었다. 나중에 개발할 경우 API 요청을 줄여 데이터를 구성하는데 도움이 될 것 같다.
* iframe을 이용하여 동영상 재생 칸을 만드는 구현을 새로 배울 수 있었다.
* Vue를 학습하면서 배웠던 내용을 모두 사용할 수 있었던 좋은 기회였다.
* Youtube API를 활용할 수 있어서 새로웠다.
