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

<script>
import DetailList from "@/components/CheckRefs/DetailList.vue";

export default {
  name: "DuplicateTable",
  props: {
    detailsArr: {
      type: Array,
      require: true,
    },
  },
  components: {
    DetailList,
  },
};
</script>
