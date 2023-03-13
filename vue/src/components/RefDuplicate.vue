<template>
  <h3>{{ msg }}</h3>
  <DuplicateTable :detailsArr="duplicateRefs" />
</template>

<script>
import DuplicateTable from "@/components/DuplicateTable.vue";

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
