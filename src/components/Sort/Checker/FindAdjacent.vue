<script setup>
import { computed } from "vue";

import SimpleList from "@/components/SimpleList.vue";
import IgnorableArea from "@/components/IgnorableArea.vue";
import { ReferenceChecker } from "@/helpers/referenceChecker";

const props = defineProps({
  result: String,
});

const adjacentRefs = computed(() => {
  const checker = new ReferenceChecker(props.result);
  return checker.findAdjacent();
});

</script>

<template>
  <div v-if="adjacentRefs.length">
    <h3>見よ項目のすぐ隣に見よ先項目があります：</h3>
    <IgnorableArea>
      <SimpleList :arr="adjacentRefs" />
    </IgnorableArea>
  </div>
</template>

