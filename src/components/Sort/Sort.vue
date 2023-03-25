<script setup>
import { ref, computed } from "vue";

import { arrayOfLines } from "@/helpers/utils.js";
import Normalize from "@/components/Sort/Normalize.vue";
import SortedTable from "@/components/Sort/SortedTable.vue";
import PasteBox from "@/components/PasteBox.vue";

import { Sorter } from "@/helpers/sorter";

const content = ref("");
const sortedArr = ref([]);
const skipHeader = ref(true);

const contentLines = computed(() => {
  const lines = arrayOfLines(content.value);
  if (skipHeader.value) {
    return lines.slice(1);
  }
  return lines;
});

const parsedLines = computed(() => {
  return contentLines.value
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const [item, reading, ...rest] = line.split("\t").map((x) => x.trim());
      return {
        item: item,
        reading: reading,
      };
    });
});

const reset = () => {
  sortedArr.value = [];
};

const executeSort = () => {
  reset();
  const sorter = new Sorter();
  parsedLines.value.forEach((x) => sorter.addData(x.item, x.reading));
  sortedArr.value = sorter.execute();
};
</script>

<template>
  <h2>並べ替え</h2>
  <div><img src="@/assets/Sort/sort.png" alt="" /></div>

  <label><input type="checkbox" v-model="skipHeader" />先頭行をスキップする</label>
  <PasteBox v-on:updateContent="content = $event.target.value" v-on:buttonClicked="executeSort" />

  <ul>
    <li><code>名寄せした索引項目</code>と<code>読み</code>の2列を貼り付けてください。</li>
    <li
      >内部で<code>読み</code>の情報を<code>配列読み</code>に変換して並べ替えます。
      <ul>
        <li>最優先は<code>配列読み</code>の情報。</li>
        <li><code>配列読み</code>が同じ場合は<code>読み</code>で昇順ソート。</li>
        <li><code>読み</code>も同じ場合は<code>項目</code>の文字コード昇順（同じ文字種がまとまります）。</li>
      </ul>
    </li>
    <li><strong>1列目が最終的な索引になります。</strong></li>
  </ul>

  <SortedTable :sortedArr="sortedArr" />

  <Normalize />
</template>

<style scoped>
.reading,
.normalized-reading {
  color: #ccc;
}
</style>
