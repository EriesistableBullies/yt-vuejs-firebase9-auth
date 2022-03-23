<template>
  <div class="chat-window">
    '
    <div v-if="error">{{ error }}</div>
    <div class="messages" v-if="documents">
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <div>
          <div>
            <span class="created-at">{{ doc.createdAt }}</span>
          </div>
          <div>
            <span class="name">User Name: {{ doc.name }}</span>
          </div>
          <div>
            <span class="message">Message: {{ doc.message }}</span>
          </div>
          <hr class="solid" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from "../composables/getCollection";
import { formatDistanceToNow } from "date-fns";
import { computed } from "@vue/runtime-core";
export default {
  setup() {
    const { error, documents } = getCollection("messages");

    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((doc) => {
          let time = formatDistanceToNow(doc.createdAt.toDate());
          return { ...doc, createdAt: time };
        });
      }
    });

    return { error, documents, formattedDocuments };
  },
};
</script>

<style>
.chat-window {
  background: #fafafa;
  padding: 20px 20px;
}
.single {
  margin: 18px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 3px;
  border-style: solid;
  border-radius: 2rem;
  border-color: red;
  padding: 1rem;
}
.created-at {
  display: block;
  color: #999;
  font-size: larger;
  margin-bottom: 4px;
}
.name {
  margin-bottom: 6px;
  font-size: x-large;
  background-color: red;
  border-radius: 1rem;
  padding: 6px;
}
.messages {
  max-height: 800px;
  overflow: auto;
  font-size: xx-large;
  word-wrap: normal;
}
hr .solid {
  border-top: 9px solid black;
}
</style>