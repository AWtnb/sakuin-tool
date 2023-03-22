<template>
  <div v-if="sortedArr.length">
    <div class="limit-height">
      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>読み</th>
            <th>配列読み</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(line, idx) in sortedArr" :key="idx">
            <td>{{ line.item }}</td>
            <td class="reading">{{ line.reading }}</td>
            <td class="normalized-reading">{{ line.normalized }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <CopyButton :copyStr="resultStr" />
    <label for="asTsv"><input type="checkbox" id="asTsv" v-model="asTsv">3列ともコピーする</label>
  </div>
</template>

<script>
import CopyButton from "@/components/CopyButton.vue";

export default {
  name: "SorttedTable",
  props: {
    sortedArr: Array,
  },
  data: function () {
    return {
      asTsv: true,
    };
  },
  computed: {
    resultArr: function () {
      if (this.asTsv) {
        return this.sortedArr.map((x) => `${x.item}\t${x.reading}\t${x.normalized}`);
      }
      return this.sortedArr.map((x) => x.item);
    },
    resultStr: function () {
      return this.resultArr.join("\n");
    },
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
