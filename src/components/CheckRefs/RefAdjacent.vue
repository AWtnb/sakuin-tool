<script setup>
import { ref } from "vue";

import DetailList from "@/components/CheckRefs/DetailList.vue";

const props = defineProps({
  adjacentRefs: Array,
});

const isIgnorable = ref(false);
</script>

<template>
  <div v-if="adjacentRefs.length">
    <h3>見よ項目と見よ先項目が隣接しているものがあります！</h3>
    <label><input type="checkbox" v-model="isIgnorable" />無視する</label>
    <div v-if="!isIgnorable">
      <DetailList :details="adjacentRefs" />
    </div>
  </div>
</template>

