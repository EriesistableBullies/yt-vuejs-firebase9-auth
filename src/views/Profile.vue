<template>
  <div class="view-profile container">
    <div v-if="user" class="card">
      <div class="nameImg">
        <h1>{{ user.displayName }}'s Profile</h1>
        <img :src="this.image" />
      </div>
      <div class="created">
        <h2 style="margin-bottom: 0.6rem">update profile image</h2>
        <form @submit.prevent="updateProfile">
          <input type="text" placeholder="Display Name" v-model="displayName" />
          <!-- <input type="email" placeholder="Email" v-model="email" />
          <input type="password" placeholder="Password" v-model="password" /> -->
          <!-- <input type="tel" placeholder="Phone" v-model="phone" /> -->
          <input
            type="file"
            ref="input1"
            accept="image/*"
            @change="onChange"
            placeholder="Choose Profile Photo"
            style="font-size: x-small; cursor: pointer"
          />
          <div class="error">
            {{ error }}
          </div>
          <button style="cursor: pointer" id="signupbtn">Update</button>
        </form>
      </div>
      <div class="status">
        <form @submit.prevent="updateProfileStatus">
          <textarea
            style="height: 200px"
            placeholder="Update status..."
            v-model="mystat"
          >
          </textarea>
          <div class="error">
            {{ error }}
          </div>
          <button style="margin-top: 1rem; cursor: pointer">
            update status
          </button>
        </form>
      </div>
    </div>
    <div v-if="user" class="wall">
      <div class="status_bar">
        <h2 id="status">Current<br />Status:</h2>
        <p id="status" class="status_display">
          {{ this.currentStat }}
        </p>
        <button style="cursor: pointer" id="dm">Send Message</button>
      </div>
      <div class="posts">
        <div v-for="post in posts" :key="post" class="user_post">
          <div id="author_label">
            <img id="post_image" :src="this.image" />
            <div id="author">
              {{ post.author }}:
              </div>
            <div id="post_body">
              {{ post.body }}
            </div>
            <div id="post_comment">
              <input id="comment" type="text" placeholder="Enter Comment" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import getUser from "../composables/getUser";
import firebase from "firebase";
import { auth } from "../firebase/index";
import { rtdb } from "../firebase/index";
import useRest from "../composables/rest";
// import toDate from 'date-fns/esm/fp/isDate'
// import { timestamp } from "../firebase";
export default {
  name: "Profile",
  data() {
    return {
      photo: null,
      profile: null,
      posts: ref(),
    };
  },
  computed: {
    listPosts() {
      var readStatus = rtdb
        .ref("user-posts/" + auth.currentUser.uid)
        .limitToLast(5);
      readStatus.on("value", (snapshot) => {
        this.posts = snapshot.val();
      });

      return this.posts;
    },
  },
  created() {
    this.listPosts;
  },
  setup() {
    const { writeNewPost } = useRest();
    const { user } = getUser();
    const image = ref(null);
    const displayName = ref("");
    const photoURL = ref(null);
    const mystat = ref("");
    const currentStat = ref("");

    function onChange(e) {
      this.uploadValue = 0;
      this.img1 = null;
      this.photoURL = e.target.files[0];
    }

    async function updateProfile() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          user
            .updateProfile({
              displayName: displayName.value,
              photoURL: photoURL.value,
            })
            .then(alert("successfully updated profile"));
        }
      });
    }
    function updateProfileStatus() {
      if (auth.currentUser) {
        writeNewPost(
          auth.currentUser.uid,
          auth.currentUser.displayName,
          image.value,
          mystat.value
        );
        var readStatus = rtdb
          .ref("user-posts/" + auth.currentUser.uid)
          .limitToLast(10);
        readStatus.on("value", (snapshot) => {
          snapshot.forEach(function (childsnapshot) {
            //  var key = childsnapshot.key;
            // childData will be the actual contents of the child
            var childData = childsnapshot.val();
            currentStat.value = childData.body;
            // console.log(childData);
          });
        });
      }
    }

    auth.onAuthStateChanged((user) => {
      if (user != null) {
        firebase
          .storage()
          .ref("users/" + user.uid + "/profile.jpg")
          .getDownloadURL()
          .then((photo) => {
            image.value = photo;
          });
      }
    });
    return {
      currentStat,
      mystat,
      displayName,
      photoURL,
      user,
      image,
      onChange,
      updateProfile,
      updateProfileStatus,
    };
  },
};
</script>

<style scoped>
#comment{

}
#post_image{
  grid-area: 1/1/span 1/span 1;
}
#author{
  grid-area: 1/2/span 1/span 1;
  border-color: black;
  border: 0.2rem;
  border-style: solid;
  border-radius: 22rem;
  background-color: crimson;
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  margin-right: 2rem;
  margin-top: 2rem;

}
#post_body{
  grid-area: 2/1/span 1/span 2;
}
#post_comment{
  grid-area: 3/1/span 1/span 2;
    
}
#post_image {
  height: 100px;
  width: 100px;
}
#comment {
  width: fit-content;
  word-wrap: normal;
}
#author_label {
  border-color: black;
  border: 0.2rem;
  border-style: solid;
  border-radius: 1rem;
  background-color: white;
  width: 50%;
  word-wrap: normal;
  padding: 6px;
  font-size: xx-large;
  display: grid;

  height: fit-content;
  /* display: flex;
  flex-direction: column; */
  /* justify-content: space-around; */
}
.posts {
  display: flex;
  flex-direction: column;
  height: 400px;
  padding: 1rem;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    
}
.user_post {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 1rem;
}
#dm {
  border: 0.5rem;
  border-color: black;
  border-radius: 1rem;
  border-style: solid;
  font-size: x-large;
  margin: 0.8rem;
  padding: 8px;
  height: fit-content;
  width: auto;
  transition: transform 0.2s;
}
#dm:hover {
  background-color: red;
  transform: scale(1.5);
}
h2 {
  height: 90px;
}
#status {
  border: 0.5rem;
  border-color: black;
  border-radius: 1rem;
  border-style: solid;
  font-size: x-large;
  margin: 0.8rem;
  padding: 8px;
  background-color: white;
}
.status_display {
  height: fit-content;
}
#status_message {
  word-wrap: normal;
  width: 400px;
}
.status_bar {
  margin: 1.3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 200px;
  border: 0.5rem;
  border-style: solid;
  border-color: black;
  border-radius: 2rem;
  background-color: crimson;
}
.wall {
  grid-area: 2/1 / span 2 / span 3;
    background-image: url('../assets/EB_Long.png');
  background-size: cover;
  bottom: 25%;

  /* display: flex;
  justify-content: space-around; */
}
textarea {
  width: 700px;
  max-width: 700px;
  height: auto;
  margin-bottom: 6px;
  margin-top: 1rem;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  font-family: inherit;
  outline: solid 0.4rem black;
  /* border-color: black; */
  font-size: x-large;
}
#signupbtn {
  margin-left: 48%;
  font-size: x-large;
  border-radius: 1rem;
  padding: 4px;
}
#updatephoto {
  margin-left: 40%;
  font-size: xx-large;
}
input {
  padding: 1rem;
  width: 600px;
  height: auto;
  border-radius: 2rem;
  margin-bottom: 1rem;
  border-color: black;
  border: 0.3rem;
  border-style: solid;
}
form {
  display: flex;
  flex-direction: column;
  align-content: center;
}
.uploader {
  grid-area: 1/1;
}
.file-uploads {
  overflow: hidden;
  position: relative;
  text-align: center;
  display: inline-block;
}
.view-profile {
  color: black;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
}
.card {
  grid-area: 1/1 / span 1 / span 3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 15px;
  background-color: crimson;
  border: 2rem;
  border-style: ridge;
  border-color: grey;
}

h1 {
  font-size: 63pt;
}
.headline {
  margin-top: 1rem;
}
button {
  padding: 6px;
  width: fit-content;
  height: 40px;
  font-size: x-large;
  margin-left: 40%;
}
img {
  height: 400px;
  width: 400px;
  border: 6px;
  border-color: black;
  border-style: solid;
  border-radius: 12rem;
}
</style>