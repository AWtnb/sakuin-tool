<script setup>
import DetailList from "@/components/CheckRefs/DetailList.vue";
import IgnorableArea from "@/components/CheckRefs/IgnorableArea.vue";

const props = defineProps({
  adjacentRefs: Array,
});

</script>

<template>
  <div v-if="adjacentRefs.length">
    <h3>見よ項目と見よ先項目が隣接しているものがあります！</h3>
    <IgnorableArea>
      <DetailList :details="adjacentRefs" />
    </IgnorableArea>
  </div>
</template>

