<script setup>
const props = defineProps({
  details: Array,
});
</script>

<template>
  <ul>
    <li v-for="(d, idx) in details" :key="idx">{{ d }}</li>
  </ul>
</template>

