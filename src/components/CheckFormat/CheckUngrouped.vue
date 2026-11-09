<script setup lang="ts">
import { computed } from "vue";

import DuplicateTable from "./DuplicateTable.vue";
import IgnorableArea from "@/components/IgnorableArea.vue";

import { GroupChecker } from "@/helpers/groupChecker";

const props = defineProps<{ result: string }>();

const emits = defineEmits<{ checkFinished: [event: { problem: string; count: number }] }>();

const ungrouped = computed(() => {
  const checker = new GroupChecker(props.result);
  const found = checker.getUngrouped();
  emits("checkFinished", {
    problem: "ungrouped",
    count: found.length
  });
  return found;
});
</script>

<template>
  <div v-if="ungrouped.length">
    <h3>名寄せが不十分です：</h3>
    <IgnorableArea>
      <DuplicateTable :detailsArr="ungrouped" />
    </IgnorableArea>
  </div>
</template>
