<script setup lang="ts">
import CopyButton from "@/components/CopyButton.vue";

defineProps<{
  rows: { id: number; idx: number; nombre: number }[];
  resultStr: string;
}>();
</script>

<template>
  <div v-if="rows.length" v-cloak>
    <div class="limit-height">
      <table>
        <thead>
          <tr> <th>ID</th><th>index</th><th>ページ</th><th>項目</th><th>見よ先</th> </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in rows" :key="idx">
            <td class="meta-info">{{ row.id }}</td>
            <td class="meta-info">{{ row.idx }}</td>
            <td>{{ row.nombre }}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <CopyButton :copyStr="resultStr" />
  </div>
</template>

<style scoped>
.meta-info {
  color: #aaa;
}
</style>