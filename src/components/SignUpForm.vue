<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Display Name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
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
    <button>Sign Up</button>
  </form>
  <div v-if="imageData != null">
    <img class="preview" height="268" width="356" :src="this.photoURL" />
    <br />
  </div>
</template>

<script>
import { ref } from "vue";
import useSignup from "../composables/useSignup";
import { auth, storage } from "../firebase/index";
export default {
  setup(props, context) {
    const { error, signup, createUser, writeUserData } = useSignup();
    //refs
    const displayName = ref("");
    const email = ref("");
    const password = ref("");
    const photoURL = ref("")
    // const imageData = ref("")
    function onChange(e) {
      this.uploadValue = 0;
      this.img1 = null;
      this.photoURL = e.target.files[0];
    }
    async function handleSubmit() {
      await signup(email.value, password.value, displayName.value, photoURL.value).then(
        (auth) => {
          storage
            .ref("users/" + auth.user.uid + "/profile.jpg")
            .put(this.photoURL)
            .on(
              auth,
              (snapshot) => {
                this.uploadValue =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              },
              (error) => {
                console.log(error.message);
              },
            );
        }
      ).then(() => {
        writeUserData(auth.currentUser.uid, displayName.value, email.value, photoURL.value)
      })
      
      await createUser({
        email: email.value,
        displayName: displayName.value,
        password: password.value,
        photoURL: photoURL.value,
      })
      if (!error.value) {
        context.emit("signup");
      }
    }
    return { displayName, email, password, handleSubmit, onChange, error };
  },
};
</script>

<style>
input {
  width: 200px;
  height: auto;
  font-size: x-large;
}
</style>