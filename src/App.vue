<template>
  <div id="nav">
    <router-link to="/home"
      ><img id="logo-bully" src="./assets/ebz-logo.png"
    /></router-link>
    <router-link to="/home">Home</router-link> <span class="divider">|</span>
    <select id="breed-select" @change="breedSelect">
      <option value="0">Select Breed</option>
      <option value="1">
        <router-link to="/frenchies">Frenchies</router-link>
      </option>
      <option value="2">
        <router-link to="/micro">Micro Exotic Bully</router-link>
      </option>
    </select>
    <span class="divider">|</span>
    <router-link to="/chatroom">Park Ave.</router-link>
    <span class="divider">|</span>
    <router-link to="/abg-dapp">Bully Tracker Web3.0 Dapp</router-link>
    <span class="divider">|</span>
    <router-link to="/profile">My Kennel</router-link>
    <span class="divider">|</span> <router-link to="/shop">Shop</router-link>
    <span class="divider">|</span>
    <button @click="handleClick" style="cursor: pointer">Logout</button>
  </div>
  <router-view />
  <Footer style="display: none" class="footer-global" />
</template>

<script>
import router from "./router";
import "./css/main.css";
import useLogout from "./composables/useLogout";
import getUser from "./composables/getUser";
import Footer from "./components/Footer.vue";
export default {
  components: { Footer },
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
  methods: {
    breedSelect() {
      const menu = document.getElementById("breedSelect");
      const menutOpt = document.getElementsByTagName("option");
      if (menutOpt[1].selected) {
        router.push({
          path: "/frenchies",
        });
      } else if (menutOpt[2].selected) {
        router.push({
          path: "/micro",
        });
      }
      return menu.style.display === menutOpt[0];
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Bebas Neue";
  letter-spacing: 0.2rem;
  color: black;
}

.divider {
  color: white;
}

#breed-select {
  font-size: x-large;
  height: 30px;
  width: 200px;
  background-color: white;
  color: black;
  letter-spacing: 0.2rem;
}

option {
  font-size: x-large;
  font-family: "Bebas Neue";
  color: black;
  letter-spacing: 0.2rem;
}

#logo-bully {
  height: 40%;
  width: 40%;
}

#app {
  font-family: Bebas Neue, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav button {
  height: 50%;
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

#nav {
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: black;
  z-index: 2;
}

#nav a {
  font-size: x-large;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #ff0000;
}
#nav a.router-link-exact-visited {
  color: grey;
}
.footer-global {
  position:fixed;
  top: 100;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 250px
}
</style>
