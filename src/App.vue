<template>
  <div id="nav" v-if="$store.state.user">
    <router-link to="/"
      ><img id="logo-bully" src="./assets/ebz-logo.png"
    /></router-link>
    <router-link to="/">Home</router-link> |
    <select id="breed-select" @change="breedSelect">
      <option value="0">Select Breed</option>
      <option value="1"><router-link to="/frenchies">Frenchies</router-link></option>
      <option value="2"><router-link to="/micro">Micro Exotic Bully</router-link></option>
    </select>
     |
    <router-link to="/abg-dapp">Bully Tracker Web3.0 Dapp</router-link> |
    <router-link to="/my-kennel">My Kennel</router-link> |
    <router-link to="/shop">Shop</router-link> |
    <button @click="$store.dispatch('logout')">Logout</button>
  </div>
  <router-view />
</template>

<script>
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
import router from "./router";

export default {
  setup() {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch("fetchUser");
    });
  },
  methods: {
    breedSelect() {
      const menu = document.getElementById('breedSelect')
      const menutOpt = document.getElementsByTagName('option')
      if(menutOpt[1].selected) {
        router.push({
          path: '/frenchies'
        });
      }
      else if (menutOpt[2].selected) {
        router.push({
          path: '/micro'
        });
      }
      return menu.style.display === menutOpt[0]
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#breed-select{
  height: 30px;
  width: 200px;
}

option{
  font-size: large;
  font-family: 'Bebas Neue';
}

#logo-bully {
  height: 40%;
  width: 40%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
  color: black;
  background-color: white;
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
</style>
