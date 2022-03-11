<template>
  <main class="home">
    <div class="videos">
      <h1 id="title">Featured Bullies</h1>
      <VideoPlayerVue1 />
      <router-link to="/micro"
        ><VideoPlayerVue style="cursor: pointer"
      /></router-link>
      <router-link to="frenchies"
        ><VideoPlayerVue2 style="cursor: pointer"
      /></router-link>
    </div>
    <div class="content">
      <div class="information">
        <h1 id="title">Welcome to Eriesistable Bullies Global &copy; 2022</h1>
        <p>
          The American Bully is a recently formed companion dog breed,
          originally recognized by the American Bully Kennel Club (ABKC). It has
          been recognized by the United Kennel Club (UKC) since July 15, 2013.
          The breed has not been recognized by the American Kennel Club (AKC).
          The American Bully is a small to large breed, which has been divided
          into four categories by some registering organizations, including
          Pocket, Standard, Classic, and XL. Other organizations, including the
          UKC, have one consistent size standard.
        </p>
      </div>
      <div class="information">
        <p>
          American Bullies Global Inc. is an American company, dedicated to the
          support of the American pitbull canine family and its offspring breeds
          in the decentralized market of dog registration, record-keeping,
          genealogy, sport, and community.
        </p>
      </div>
    </div>
  </main>
</template>
<script>
import VideoPlayerVue from "../components/VideoPlayer.vue";
import VideoPlayerVue1 from "../components/VideoPlayer1.vue";
import VideoPlayerVue2 from "../components/VideoPlayer2.vue";
export default {
  components: {
    VideoPlayerVue,
    VideoPlayerVue1,
    VideoPlayerVue2,
  },
};
</script>
<style scoped>
.content{
  display: flex;
  flex-direction: column;
}
.information {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 1.5rem;
}
p {
  text-align: justify;
  font-size: xx-large;
  font-family: 'Bebas Neue';
  width: 80%;
}
.home {
  padding: 1rem;
}

#title {
  font-family: 'Bebas Neue';
  letter-spacing: .5rem;
  padding: 1rem;
  color: black;
  font-size: 36pt;
 
}
</style>