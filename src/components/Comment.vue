<template>
  <form>
    <textarea
      placeholder="Leave a comment and hit enter to send..."
      v-model="comment"
      @keypress.enter.prevent="handleSubmit"
    >
    </textarea>
    <div class="error">
      {{ error }}
    </div>
  </form>
</template>

<script>
export default {
  setup() {},
};
</script>

<style>
</style>