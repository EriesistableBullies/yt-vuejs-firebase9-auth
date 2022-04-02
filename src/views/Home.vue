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
      <div class="information1">
        <img src="../assets/abg2.png" style="cursor: pointer" @click="abg" />
        <p id="abg">
          American Bullies Global Inc. is an American company, dedicated to the
          support of the American pitbull canine family and its offspring breeds
          in the decentralized market of dog registration,record-keeping,
          genealogy, sport, and community.
        </p>
      </div>
    </div>
    <div class="main_feed">
      <div class="main_post" v-for="post in posts" :key="post">
        <h2 class="post_author">{{ post.author }}:</h2>
        <hr />
        <p class="post_author2">{{ post.body }}</p>
        <form @submit="postComment">
          <textarea
            style="height: 100px; width: 900px; font-size: x-large"
            id="comment"
            type="text"
            placeholder="Enter Comment"
            @keypress.enter.prevent="postComment"
          />
        </form>
        <button id="send_post">send</button>
      </div>
    </div>
  </main>
</template>
<script>
import VideoPlayerVue from "../components/VideoPlayer.vue";
import VideoPlayerVue1 from "../components/VideoPlayer1.vue";
import VideoPlayerVue2 from "../components/VideoPlayer2.vue";
import { rtdb } from "../firebase";
import { ref } from "vue";
import router from "../router";
export default {
  data() {
    return {
      posts: ref(),
    };
  },
  components: {
    VideoPlayerVue,
    VideoPlayerVue1,
    VideoPlayerVue2,
  },
  methods: {
    abg() {
      router.push({
        path: "/abg-dapp",
      });
    },
  },
  computed: {
    listPosts() {
      var readStatus = rtdb.ref("posts/").limitToLast(20);
      readStatus.on("value", (snapshot) => {
        this.posts = snapshot.val();
        console.log(this.posts);
      });

      return this.posts;
    },
  },
  created() {
    this.listPosts;
  },
};
</script>
<style scoped>
#send_post{
  font-size: x-large;
  color: black;
  border-radius: 1rem;
  padding: 8px;
  margin-left: 0.5rem;
}
.main_feed {
  background-color: black;
  border-radius: 2rem;
  border: 1rem;
  border-style: solid;
  border-color: black;
  padding: 2rem;
  margin: 2rem;
}
.post_author {
  font-size: xx-large;
  border: 0.3rem;
  border-style: groove;
  border-radius: 3rem;
  border-color: red;
  padding: 10px;
  color: white;
  width: 400px;
}
.post_author2 {
  color: white;
  word-wrap: normal;
  width: 50%;
}
.main_post {
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 0.5rem;
  border-color: white;
  border-radius: 1rem;
  border-style: solid;
}
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.information {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 1.5rem;
}
.information1 {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 1.5rem;
  /* background-image: url("../assets/back2.jpg");
  background-size: contain;
  flood-opacity: 33%; */
  /* border-radius: 2rem; */
}
p {
  text-align: justify;
  font-size: xx-large;
  font-family: "Bebas Neue";
  color: white;
  width: 80%;
  padding: 1rem;
}
.home {
  padding: 1rem;
  background-image: url("../assets/space.jpg");
  background-size: cover;
}

#title {
  font-family: "Bebas Neue";
  letter-spacing: 0.5rem;
  padding: 1rem;
  color: white;
  font-size: 36pt;
}
img {
  border-radius: 1rem;
  margin-block: 1rem;
  transition: transform 0.2s;
}
img:hover {
  background-color: white;
  transform: scale(1.2);
}
#abg {
  display: flex;
  align-items: center;
  width: 600px;
  height: 500px;
  color: white;
  background-color: black;
  border-radius: 1rem;
  border: 1rem;
  border-style: ridge;
  margin-block: 1rem;
  border-color: red;
}
.abg-popup {
  color: white;
}
</style>