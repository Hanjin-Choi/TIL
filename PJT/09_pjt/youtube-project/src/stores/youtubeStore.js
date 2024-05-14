import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useYoutubeStore = defineStore('youtube', () => {
  const URL = 'https://www.googleapis.com/youtube/v3'
  const API_KEY = ''

  const videoList = ref([])
  const channelList = ref([])
  const laterList= ref([])

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
        item.id = element.id.videoId
        item.title = element.snippet.title
        item.thumbnail = element.snippet.thumbnails.medium.url
        item.channelId = element.snippet.channelId
        item.description = element.snippet.description
        item.publishedAt = element.snippet.publishedAt
        videoList.value.push(item)
      })
      console.log(videoList.value)
    })
    .catch(err => console.log(err))
  }

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