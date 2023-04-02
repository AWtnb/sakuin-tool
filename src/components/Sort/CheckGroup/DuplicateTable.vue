<script setup>
import DetailList from "@/components/CheckRefs/DetailList.vue";
const props = defineProps({
  detailsArr: Array,
});
</script>

<template>
  <table>
    <thead
      ><tr>
        <th>重複項目</th>
      </tr></thead
    >
    <tbody>
      <tr v-for="(details, idx) in detailsArr" :key="idx">
        <td><detail-list :details="details"></detail-list></td>
      </tr>
    </tbody>
  </table>
</template>
