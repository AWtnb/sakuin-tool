<template>
  <h2>並べ替え</h2>
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

  <SortedTable :lines="sortedLines" :resultStr="resultStr" />

  <Normalize />

  <div><img src="@/assets/Sort/sort.png" alt="" /></div>
</template>

<script>
import { normalizeReading } from "@/helpers/utils";

const comparer = (a, b) => {
  const aLower = String(a).toLowerCase();
  const bLower = String(b).toLowerCase();
  if (aLower > bLower) return 1;
  if (aLower < bLower) return -1;
  return 0;
};

export class Sorter {
  constructor() {
    this.parsedLines = [];
  }

  addData(item, reading) {
    this.parsedLines.push({
      item: item,
      reading: reading,
      normalized: normalizeReading(reading, true),
    });
  }

  execute() {
    return this.parsedLines
      .sort((a, b) => {
        return comparer(a.item, b.item);
      })
      .sort((a, b) => {
        return comparer(a.reading, b.reading);
      })
      .sort((a, b) => {
        return comparer(a.normalized, b.normalized);
      });
  }
}

import CopyButton from "@/components/CopyButton.vue";
import Normalize from "@/components/Sort/Normalize.vue";
import SortedTable from "@/components/Sort/SortedTable.vue";
import PasteBox from "@/components/PasteBox.vue";

export default {
  name: "Sort",
  data: function () {
    return {
      content: "",
      sortedLines: [],
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
      return this.content.split(/\n/).map((line) => String(line));
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
    resultStr: function () {
      return this.sortedLines.map((x) => `${x.item}\t${x.reading}\t${x.normalized}`).join("\n");
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
        this.sortedLines.push(x);
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
