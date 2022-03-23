<template>
  <form>
      <textarea 
      placeholder="Type a message and hit enter to send..."
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
      >
      </textarea>
      <div class="error">
          {{ error }}
      </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from '../composables/getUser'
import useCollection from '../composables/useCollection'
import { timestamp } from '../firebase'
export default {
setup(){
    const {user} = getUser()
    const { addDoc, error } = useCollection('messages')

    const message = ref('')

    async function handleSubmit() {
        const chat = {
            name: user.value.displayName,
            message: message.value,
            createdAt: timestamp()
        }
        await addDoc(chat)
        if (!error.value) {
        message.value = ''
        }
    }

    return { message, handleSubmit, error }
}
}
</script>

<style scoped>
form{
    margin: 10px;
}
textarea{
    width: 100%;
    max-width: 100%;
    margin-bottom: 6px;
    margin-top: 1rem;
    padding: 10px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    font-family: inherit;
    outline:solid 0.4rem red;
    border-color: red;
    font-size: x-large;
}

</style>