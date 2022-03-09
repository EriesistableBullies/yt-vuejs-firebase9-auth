<template>
  <main class="home">
    <h1 id="title">Eriesistable Bullies &copy; 2022</h1>
    <div class="videos">
      <VideoPlayerVue1 />
      <VideoPlayerVue />
      <VideoPlayerVue2 />
    </div>
  </main>
</template>
<script>
import VideoPlayerVue from "../components/VideoPlayer.vue"
import VideoPlayerVue1 from "../components/VideoPlayer1.vue"
import VideoPlayerVue2 from "../components/VideoPlayer2.vue"
export default {
  components: {
    VideoPlayerVue,
    VideoPlayerVue1,
    VideoPlayerVue2

  }
}
</script>
<style scoped>
.home{
  padding: 1rem;
  background-color: black;
}
#title {
  padding: 1rem;
  color: red;
}
</style>