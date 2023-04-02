<script setup>
import { computed } from "vue";

import { GroupChecker } from "@/helpers/groupChecker";

import RefDuplicate from "@/components/Sort/CheckGroup/RefDuplicate.vue";

const props = defineProps({
  result: String,
});

const ungrouped = computed(() => {
  const checker = new GroupChecker(props.result);
  return checker.getUngrouped();
});

const conflicts = computed(() => {
  const checker = new GroupChecker(props.result);
  return checker.getConflicting();
});
</script>

<template>
  <RefDuplicate :duplicateRefs="ungrouped" msg="名寄せが不十分です：" />
  <RefDuplicate :duplicateRefs="conflicts" msg="見よ項目が本項目として残っています：" />
</template>

