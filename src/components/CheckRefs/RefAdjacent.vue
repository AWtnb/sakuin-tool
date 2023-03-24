<template>
  <div v-if="adjacentRefs.length">
    <h3>見よ項目と見よ先項目が隣接しているものがあります！</h3>
    <DetailList :details="adjacentRefs" />
  </div>
</template>

<script>
import DetailList from "@/components/CheckRefs/DetailList.vue";

export default {
  name: "RefAdjacent",
  props: {
    adjacentRefs: {
      type: Array,
      require: true,
    },
  },
  components: {
    DetailList,
  },
};
</script>
