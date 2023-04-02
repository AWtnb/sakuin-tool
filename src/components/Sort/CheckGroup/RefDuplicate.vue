<script setup>
import DuplicateTable from "@/components/CheckRefs/DuplicateTable.vue";
import IgnorableArea from "@/components/CheckRefs/IgnorableArea.vue";

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

