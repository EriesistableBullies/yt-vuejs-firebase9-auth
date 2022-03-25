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
            style="font-size: x-small"
          />
          <div class="error">
            {{ error }}
          </div>
          <button id="signupbtn">Update</button>
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
          <button style="margin-top: 1rem">update status</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
// import useSignup from "../composables/useSignup";
// import { storage } from "../firebase/index";
import useCollection from "../composables/useCollection";
import { timestamp } from "../firebase/index";
import getUser from "../composables/getUser";
import firebase from "firebase";
import { auth } from "../firebase/index";
export default {
  data() {
    return {
      photo: null,
    };
  },
  setup() {
    const { user } = getUser();
    const image = ref(null);
    const displayName = ref("");
    // const email = ref("");
    // const password = ref("");
    const photoURL = ref(null)
    const { addDoc, error } = useCollection('mystat')

    const mystat = ref('')

    function onChange(e) {
      this.uploadValue = 0;
      this.img1 = null;
      this.photoURL = e.target.files[0];
    }

    async function updateProfile() {
      auth.onAuthStateChanged(user => {
        if(user) {
          // let user = auth.currentUser;
          user.updateProfile({
            displayName: displayName.value,
            photoURL: photoURL.value
          }).then(alert('successfully updated profile'))
        }
      })
    }

    // async function addPost() {

    // }

    async function updateProfileStatus() {
      const status = {
        status: mystat.value,
        createdAt: timestamp()
      }
      await addDoc(status)
      if(!error.value) {
        mystat.value = ''
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

    return { mystat, displayName, photoURL, user, image, onChange, updateProfile, updateProfileStatus };
  },
};
</script>

<style scoped>
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
  border-style:ridge;
  border-color: grey;
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