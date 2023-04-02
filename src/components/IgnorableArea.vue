<script setup>
import { ref } from "vue";
const isIgnorable = ref(false);
</script>

<template>
  <div class="area">
    <label><input type="checkbox" v-model="isIgnorable" />無視する</label>
    <div v-if="!isIgnorable">
    <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.area {
  background: #f6f6f6;
  border-radius: 4px;
  padding: 4px;
}
</style>