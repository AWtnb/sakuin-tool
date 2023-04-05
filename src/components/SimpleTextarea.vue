<script setup>
import { ref } from "vue";

const emits = defineEmits(["updateContent"]);
const content = ref("");
const onInput = () => {
  emits("updateContent", { content: content.value });
};
</script>

<template>
  <div class="box">
    <textarea @input="onInput" v-model="content" placeholder="paste here!"></textarea>
  </div>
</template>

<style scoped>
.box {
  margin: 6px auto;
}
</style>

