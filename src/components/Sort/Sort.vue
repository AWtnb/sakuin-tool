<script setup>
import { ref, computed } from "vue";

import beforePath from "@/assets/Sort/before.png";
import afterPath from "@/assets/Sort/after.png";
import BeforeAfter from "@/components/BeforeAfter.vue";

import { arrayOfLines } from "@/helpers/utils.js";
import Normalize from "@/components/Sort/Normalize.vue";
import SortedTable from "@/components/Sort/SortResult.vue";
import SimpleTextarea from "@/components/SimpleTextarea.vue";

import { Sorter } from "@/helpers/sorter";

const content = ref("");
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
      const elems = line.split("\t");
      if (elems.length < 2) {
        return null;
      }
      const item = elems[0].trim();
      const reading = elems[1].trim();
      if (item.length < 1 || reading.length < 1) {
        return null;
      }
      return {
        item: item,
        reading: reading,
      };
    }).filter(Boolean);
});

const sortedArr = computed(() => {
  const sorter = new Sorter();
  parsedLines.value.forEach((x) => sorter.addData(x.item, x.reading));
  return sorter.execute();
});
</script>

<template>
  <h2>並べ替え</h2>

  <Normalize />

  <BeforeAfter :beforePath="beforePath" :afterPath="afterPath" />

  <p><code>読み</code>の情報を<code>配列読み</code>に変換して並べ替えます。<strong>1列目が最終的な索引になります。</strong></p>
  <ul>
    <li>最優先は<code>配列読み</code>の情報。</li>
    <li><code>配列読み</code>が同じ場合は<code>読み</code>で昇順ソート。</li>
    <li><code>読み</code>も同じ場合は<code>項目</code>の文字コード昇順（同じ文字種がまとまります）。</li>
  </ul>

  <label><input type="checkbox" v-model="skipHeader" />先頭行をスキップする</label>

  <SimpleTextarea v-on:updateContent="content = $event.target.value" />

  <SortedTable :sortedArr="sortedArr" />
</template>

<style scoped>
.reading,
.normalized-reading {
  color: #ccc;
}
</style>

