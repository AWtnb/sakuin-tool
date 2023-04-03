<script setup>
import { computed } from "vue";

import DuplicateTable from "@/components/CheckFormat/DuplicateTable.vue";
import IgnorableArea from "@/components/IgnorableArea.vue";

import { GroupChecker } from "@/helpers/groupChecker";

const props = defineProps({
  result: String,
});

const ungrouped = computed(() => {
  const checker = new GroupChecker(props.result);
  return checker.getUngrouped();
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
