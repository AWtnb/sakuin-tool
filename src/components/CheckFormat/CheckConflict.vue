<script setup>
import { computed } from "vue";

import DuplicateTable from "@/components/CheckFormat/DuplicateTable.vue";
import IgnorableArea from "@/components/IgnorableArea.vue";

import { GroupChecker } from "@/helpers/groupChecker";

const props = defineProps({
  result: String,
});

const conflicts = computed(() => {
  const checker = new GroupChecker(props.result);
  return checker.getConflicting();
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
