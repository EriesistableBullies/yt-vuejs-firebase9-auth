<template>
  <video width="720" height="640" loop="true" class="promo-vid" ref="videoPlayer">
    <source
      src="../assets/squirt-promo4.mp4"
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
  mounted(){
       this.$refs.videoPlayer.play();
  }
};
</script>
<style scoped>
.promo-vid{
    border: 2rem;
    border-style: solid;
    border-radius: 3rem;
    border-color: red;
    transition: transform .2s;
}
.promo-vid:hover{
  background-color: black;
  transform: scale(1.2);
}
</style>