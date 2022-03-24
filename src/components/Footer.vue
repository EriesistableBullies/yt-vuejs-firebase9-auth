<template>
  <div class="foot-wrap">
    <footer id="footer">
      <router-link to="/home"></router-link>
      <router-link to="/home">Home</router-link>
      <span class="divider">|</span>
      <router-link to="/chatroom">Park Ave.</router-link>
      <span class="divider">|</span>
      <router-link to="/abg-dapp">Bully Tracker Web3.0 Dapp</router-link>
      <span class="divider">|</span>
      <router-link to="/profile">My Kennel</router-link>
      <span class="divider">|</span>
      <router-link to="/shop">Shop</router-link>
      <span class="divider">|</span>
      <button @click="handleClick" style="cursor: pointer">Logout</button>
      <div id="social-buttons">
        <img src="../assets/insta.png" />
        <img src="../assets/fb.png" />
        <img src="../assets/youtube.png" />
        <img src="../assets/whatsapp.png" />
        <img src="../assets/gmail-small.png" />
      </div>
    </footer>
  </div>
</template>

<script>
import router from "../router";
import useLogout from "../composables/useLogout";
import getUser from "../composables/getUser";
export default {
  setup() {
    const { logout, error } = useLogout();
    const { user } = getUser();

    async function handleClick() {
      await logout();
      if (!error.value) {
        router.push({
          name: "Welcome",
        });
      }
    }
    return { handleClick, user };
  },
};
</script>

<style scoped>
.foot-wrap {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
#social-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
  background-color: black;
}
#footer button {
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
img{
    padding: 1rem;
    transition: transform .2s;
}
img:hover{
  background-color: black;
  transform: scale(1.5);
}

#footer {
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: black;
  z-index: 2;
  height: 400px;
  background-color: black;
}

#footer a {
  font-size: x-large;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

#footer a.router-link-exact-active {
  color: #ff0000;
}
#footer a.router-link-exact-visited {
  color: grey;
}
</style>