<template>
  <div v-if="lines.length" v-cloak>
    <div class="limit-height">
      <table>
        <thead>
          <tr> <th>ID</th><th>index</th><th>ページ</th><th>項目</th><th>見よ先</th> </tr>
        </thead>
        <tbody>
          <tr v-for="(line, idx) in lines" :key="idx">
            <td>{{ line.id }}</td>
            <td>{{ line.pageIdx }}</td>
            <td>{{ line.page }}</td>
            <td></td>
            <td></td>
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
  name: "TemplateTable",
  props: {
    lines: Array,
    resultStr: String
  },
  components: {
    CopyButton,
  },
};
</script>
