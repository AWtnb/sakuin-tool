<script setup>
const props = defineProps({
  state: Number,
  text: String,
});
</script>

<template>
  <span v-if="props.state === 0">{{ props.text }}</span>
  <del v-if="props.state === -1" inert>{{ props.text }}</del>
  <ins v-if="props.state === 1">{{ props.text }}</ins>
</template>

<style scoped>
ins {
  border-radius: 4px;
  background: #ffbebe;
  border: 1px solid tomato;
  text-decoration: none;
}
del {
  background: #a4e5ff;
  border: 1px solid #05374b;
  color: #929292;
}
</style>
