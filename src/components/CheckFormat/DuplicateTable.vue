<script setup lang="ts">
import SimpleList from "@/components/SimpleList.vue";
defineProps<{ detailsArr: string[][] }>();
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
        <td><SimpleList :arr="details" /></td>
      </tr>
    </tbody>
  </table>
</template>
