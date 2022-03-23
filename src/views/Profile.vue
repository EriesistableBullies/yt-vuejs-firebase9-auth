<template>
  <div class="view-profile container">
    <div v-if="user" class="card">
      <h1>{{ user.displayName }}'s Profile</h1>
      <img :src="this.image" />
    </div>

    <div class="deep-purple-text">
      <!-- <div id="preview">
        <img v-if="item.imageUrl" :src="item.imageUrl" />
      </div>
      <input type="file" accept="image/*" @change="onChange" style="font-size:x-small" />
      <h2 class="headline">Upload Profile Photo</h2>
      <button @click="upload">Upload</button> -->
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import getUser from "../composables/getUser";
import firebase from 'firebase'
import { auth } from "../firebase/index";
export default {
  data() {
    return {
      photo: null
    };
  },
  setup() {
    const { user } = getUser();
    const image = ref(null)
    auth.onAuthStateChanged(user => {
      if (user !=null) {
       firebase.storage()
        .ref("users/" + user.uid + "/profile.jpg")
          .getDownloadURL()
          .then((photo) => {
            image.value = photo;
            console.log(user);
            console.log(photo);
          });
      }
    });

    return { user, image };
  },
};
</script>

<style scoped>
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
  grid-area: 1/2;
}
.deep-purple-text {
  grid-area: 2/1;
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
}
img{
  height: 400px;
  width: 400px;
}
</style>