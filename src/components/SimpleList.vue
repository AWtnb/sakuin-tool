<script setup>
const props = defineProps({
  arr: Array,
});
</script>

<template>
  <ul>
    <li v-for="(elm, idx) in arr" :key="idx">{{ elm }}</li>
  </ul>
</template>

