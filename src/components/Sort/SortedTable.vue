<template>
  <div class="limit-height" v-if="lines.length">
    <table>
      <thead>
        <tr>
          <th>項目</th>
          <th>読み</th>
          <th>配列読み</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, idx) in lines" :key="idx">
          <td>{{ p.item }}</td>
          <td class="reading">{{ p.reading }}</td>
          <td class="normalized-reading">{{ p.normalized }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <CopyButton :copyStr="resultStr" />
</template>

<script>
import CopyButton from "@/components/CopyButton.vue";

export default {
  name: "SorttedTable",
  props: {
    lines: Array,
    resultStr: String,
  },
  components: {
    CopyButton,
  },
};
</script>

<style scoped>
.reading,
.normalized-reading {
  color: #ccc;
}
</style>
