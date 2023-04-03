<script setup>
import { ref, computed } from "vue";
import CopyButton from "@/components/CopyButton.vue";

const props = defineProps({
  sortedArr: Array,
});

const asTsv = ref(false);

const finalIndexStr = computed(() => {
  return props.sortedArr.map((x) => x.item).join("\n");
});

const resultStr = computed(() => {
  if (asTsv.value) {
    return props.sortedArr.map((x) => `${x.item}\t${x.reading}\t${x.normalized}`).join("\n");
  }
  return finalIndexStr.value;
});
</script>

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
    <label><input type="checkbox" v-model="asTsv" />3列ともコピーする</label>
  </div>
</template>

<style scoped>
.reading,
.normalized-reading {
  color: #ccc;
}
</style>

