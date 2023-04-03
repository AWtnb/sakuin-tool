<script setup>
const emits = defineEmits(["updateContent", "buttonClicked"]);

const onInput = (evt) => {
  emits("updateContent", evt);
};
const onClick = () => {
  emits("buttonClicked");
};
</script>

<template>
  <div class="box">
    <textarea @input="onInput" placeholder="paste here!"></textarea>
    <button @click="onClick">実行！</button>
  </div>
</template>

<style scoped>
.box {
  margin: 6px auto;
}
</style>
