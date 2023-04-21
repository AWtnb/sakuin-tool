<script setup>
import { computed } from "vue";

import DuplicateTable from "./DuplicateTable.vue";
import IgnorableArea from "@/components/IgnorableArea.vue";

import { GroupChecker } from "@/helpers/groupChecker";

const props = defineProps({
  result: String,
});

const emits = defineEmits(["checkFinished"]);

const conflicts = computed(() => {
  const checker = new GroupChecker(props.result);
  const found = checker.getConflicting();
  emits("checkFinished", found.length);
  return found;
});
</script>

<template>
  <div v-if="conflicts.length">
    <h3>見よ項目が本項目として残っています：</h3>
    <IgnorableArea>
      <DuplicateTable :detailsArr="conflicts" />
    </IgnorableArea>
  </div>
</template>

