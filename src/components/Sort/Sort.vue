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

<script>

import CopyButton from "@/components/CopyButton.vue";
import Normalize from "@/components/Sort/Normalize.vue";
import SortedTable from "@/components/Sort/SortedTable.vue";
import PasteBox from "@/components/PasteBox.vue";

import { Sorter } from "@/helpers/sorter";

export default {
  name: "Sort",
  data: function () {
    return {
      content: "",
      sortedArr: [],
      skipHeader: true,
    };
  },
  components: {
    CopyButton,
    Normalize,
    SortedTable,
    PasteBox,
  },
  computed: {
    contentLines: function () {
      const lines = this.content.split(/\n/).map((line) => String(line));
      if (this.skipHeader) {
        return lines.slice(1);
      }
      return lines;
    },
    parsedLines: function () {
      return this.contentLines
        .filter((line) => line.trim().length > 0)
        .map((line) => {
          const [item, reading, ...rest] = line.split("\t").map((x) => x.trim());
          return {
            item: item,
            reading: reading,
          };
        });
    },
  },
  methods: {
    reset: function () {
      this.sortedLines = [];
    },
    executeSort: function () {
      this.reset();
      const sorter = new Sorter();
      this.parsedLines.forEach((x) => sorter.addData(x.item, x.reading));
      sorter.execute().forEach((x) => {
        this.sortedArr.push(x);
      });
    },
  },
};
</script>

<style scoped>
.reading,
.normalized-reading {
  color: #ccc;
}
</style>
