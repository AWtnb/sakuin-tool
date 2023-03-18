<template>
  <div class="limit-height" v-if="lines.length" v-cloak>
    <table>
      <thead>
        <tr><th>項目</th><th>ノンブル</th></tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in lines" :key="idx">
          <td>{{ item.name }}</td>
          <td>{{ item.nombre }}</td>
        </tr>
      </tbody>
    </table>
    <CopyButton :copyStr="resultStr" />
  </div>
</template>

<script>
import CopyButton from "@/components/CopyButton.vue";

export default {
  name: "UngroupedTable",
  props: {
    lines: Array,
    resultStr: String,
  },
  components: {
    CopyButton,
  },
};
</script>
