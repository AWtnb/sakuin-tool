<script setup>
import { ref } from "vue";
import DuplicateTable from "@/components/CheckRefs/DuplicateTable.vue";

const props = defineProps({
  msg: String,
  duplicateRefs: Array,
});

const isIgnorable = ref(false);
</script>

<template>
  <div v-if="duplicateRefs.length">
    <h3>{{ msg }}</h3>
    <label><input type="checkbox" v-model="isIgnorable" />無視する</label>
    <div v-if="!isIgnorable">
      <DuplicateTable :detailsArr="duplicateRefs" />
    </div>
  </div>
</template>

