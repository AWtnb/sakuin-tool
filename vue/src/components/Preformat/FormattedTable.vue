<template>
  <div v-if="lines.length" v-cloak>
    <div class="limit-height">
      <table>
        <thead>
          <tr> <th>項目</th><th>ノンブル</th> </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in lines" :key="idx">
            <td>{{ item.name }}</td>
            <td>{{ item.nombre }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <CopyButton :copyStr="resultStr" />
  </div>
</template>

<script>
import CopyButton from "@/components/CopyButton.vue";

export default {
  name: "FormattedTable",
  props: {
    lines: Array,
    resultStr: String,
  },
  components: {
    CopyButton,
  },
};
</script>
