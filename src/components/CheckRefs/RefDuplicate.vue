<template>
  <div v-if="duplicateRefs.length">
    <h3>{{ msg }}</h3>
    <DuplicateTable :detailsArr="duplicateRefs" />
  </div>
</template>

<script>
import DuplicateTable from "@/components/CheckRefs/DuplicateTable.vue";

export default {
  name: "RefDuplicate",
  props: {
    msg: {
      type: String,
      require: true,
    },
    duplicateRefs: {
      type: Array,
      require: true,
    },
  },
  components: {
    DuplicateTable,
  },
};
</script>
