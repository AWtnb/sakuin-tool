<script setup>
import { computed } from "vue";
import DiffInfo from "./DiffInfo.vue";

import DiffMatchPatch from "diff-match-patch";

const props = defineProps({
  from: String,
  to: String,
});

const diffs = computed(() => {
  const dmp = new DiffMatchPatch();
  const diff = dmp.diff_main(props.from, props.to);
  dmp.diff_cleanupSemantic(diff);
  return diff;
});
</script>

<template>
  <DiffInfo :state="d[0]" :text="d[1]" v-for="(d, idx) in diffs" :key="idx" />
</template>
