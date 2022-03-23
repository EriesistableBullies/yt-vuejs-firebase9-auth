<template>
  <nav v-if="user">
    <div>
      <p>Hi, {{ user.displayName }}</p>
      <p class="email">Currently logged in as {{ user.email }}</p>
    </div>
    <h1 id="message-title">
      Eriesistable Bullies Global Community Message Board
    </h1>
    <img style="height: 100px, width: 150px, border-radius: 2rem" :src="this.image">
  </nav>
</template>

<script>
import useLogout from "../composables/useLogout";
import getUser from "../composables/getUser";
import { ref } from "vue";
import firebase from 'firebase'
import { auth } from "../firebase/index";
export default {
  setup() {
    const { logout, error } = useLogout();
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

    async function handleClick() {
      await logout();
      if (!error.value) {
        console.log("user logged out");
      }
    }

    return { handleClick, user, image };
  },
};
</script>

<style scoped>
img{
  height: 100px;
  width: 150px;
  border-radius: 2rem;
}
nav {
  padding: 20px;
  border-bottom: 1px solid red;
  border-width: 100%;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* right: 20%; */
}
nav p {
  margin: 2px auto;
  font-size: xx-large;
  color: black;
}
nav p.email {
  font-size: xx-large;
  color: black;
}
button {
  height: auto;
  width: auto;
  font-size: x-large;
  font-weight: bold;
  color: white;
  background-color: black;
  border: 0.3rem;
  border-style: solid;
  border-radius: 1rem;
  border-color: red;
  padding: 0.3rem;
  font-family: "Bebas Neue";
}
</style>