<template>
  <div id="nav" v-if="$store.state.user">
    <router-link to="/"><img id="logo-bully" src="./assets/ebz-logo.png"></router-link>
    <router-link to="/">Home</router-link> |
    <router-link to="/frenchies">Frenchies</router-link> |
    <router-link to="/micro">Micro Exotic Bully</router-link> |
    <button @click="$store.dispatch('logout')">Logout</button>
  </div>
  <router-view/>
</template>

<script>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #000000;
}

#logo-bully{
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
  color: #000000;
  background-color: white;
}

#nav {
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: black;
}

#nav a {
  font-size: x-large;
  font-weight: bold;
  color: #000000;
}

#nav a.router-link-exact-active {
  color: #ff0000;
}
</style>
