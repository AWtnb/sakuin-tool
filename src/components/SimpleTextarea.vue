<script setup>
const emits = defineEmits(["updateContent"]);

const onInput = (evt) => {
  emits("updateContent", evt);
};
</script>

<template>
  <div class="box">
    <textarea @input="onInput" placeholder="paste here!"></textarea>
  </div>
</template>

<style scoped>
.box {
  margin: 6px auto;
}
</style>
