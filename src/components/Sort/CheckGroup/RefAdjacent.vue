<script setup>
import DetailList from "@/components/CheckRefs/DetailList.vue";
import IgnorableArea from "@/components/CheckRefs/IgnorableArea.vue";

const props = defineProps({
  adjacentRefs: Array,
});

</script>

<template>
  <div v-if="adjacentRefs.length">
    <h3>見よ項目のすぐ隣に見よ先項目があります：</h3>
    <IgnorableArea>
      <DetailList :details="adjacentRefs" />
    </IgnorableArea>
  </div>
</template>

