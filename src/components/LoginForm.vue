<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div class="error">
      {{ error }}
    </div>
    <button>Login</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useLogin from "../composables/useLogin";
export default {
    setup(props, context){
  
        const email = ref('')
        const password = ref('')

        const { error, login } = useLogin()

        async function handleSubmit() {
            await login(email.value, password.value)
            if(!error.value) {
              context.emit('login')
            }
        }
        return{email,password, handleSubmit, error}
    }
};
</script>

<style>
input{
    width:200px;
    height: auto;
    font-size: xx-large;
}

</style>