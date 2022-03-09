<template>
  <video width="720" height="640" autoplay loop="true" class="promo-vid" ref="videoPlayer">
    <source
      src="../assets/frenchie-in-field.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
</template>

<script>
export default {
  name: "Video-Player",
  methods: {
    play() {
      this.$refs.videoPlayer.play();
    },
    pause() {
      this.$refs.videoPlayer.pause();
    },
    setSpeed(speed) {
      this.$refs.videoPlayer.playbackRate = speed;
    },
  },
  // mounted(){
  //      this.$refs.videoPlayer.play();
  // }
};
</script>
<style scoped>
.promo-vid{
    border: 2rem;
    border-style: solid;
    border-radius: 3rem;
    border-color: red;
}
</style>