<script setup>
import DuplicateTable from "@/components/Sort/CheckGroup/DuplicateTable.vue";
import IgnorableArea from "@/components/IgnorableArea.vue";

const props = defineProps({
  msg: String,
  duplicateRefs: Array,
});

</script>

<template>
  <div v-if="duplicateRefs.length">
    <h3>{{ msg }}</h3>
    <IgnorableArea>
      <DuplicateTable :detailsArr="duplicateRefs" />
    </IgnorableArea>
  </div>
</template>

