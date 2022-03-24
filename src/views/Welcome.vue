<template>
  <div class="welcome container">
    <div class="box">
      <p id="header">Welcome to Eriesistable Bullies Global &copy; 2022</p>
      <div v-if="showLogin">
        <h2>Login</h2>
        <LoginFormVue @login="enterChat" />
        <p>
          No account yet? <span @click="showLogin = false">Signup</span> instead
        </p>
      </div>
      <div v-else>
        <h2>Sign Up</h2>
        <SignUpFormVue @signup="enterChat" />
        <p>
          Already registered?
          <span @click="showLogin = true">Login</span> instead
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import SignUpFormVue from "../components/SignUpForm.vue";
import LoginFormVue from "../components/LoginForm.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  components: {
    SignUpFormVue,
    LoginFormVue,
  },
  setup() {
    const showLogin = ref(true);

    const router = useRouter();

    const enterChat = () => {
      router.push({
        name: "Home",
      });
    };

    return { showLogin, enterChat };
  },
};
</script>

<style>
.box {
  background-color:lightslategray;
  width: fit-content;
  grid-area: 1/2;
  align-items: center;
  margin-top: 7%;
  border-radius: 1rem;
  padding: 1rem;
  font-size: xx-large;
}
#header {
  padding: 2rem;
  font-size: xx-large;
}
.welcome {
  text-align: center;
  padding: 20px 0;
  display: grid;
  grid-template-areas: 1/3;
  display: flex;
  justify-content: center;
}
.welcome form {
  width: 300px;
  margin: 20px auto;
}
.welcome label {
  display: block;
  margin: 20px 0 10px;
}
.welcome input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid black;
  outline: none;
  color: black;
  margin: 10px auto;
}
.welcome span {
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
}
.welcome button {
  margin: 20px auto;
  border-radius: 1rem;
  padding: 0.3rem;
}
</style>