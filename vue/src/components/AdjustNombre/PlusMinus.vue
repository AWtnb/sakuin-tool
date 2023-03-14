<template>
  <h2>ノンブル加算減算</h2>
  <ul class="config">
    <li>開始 <input type="number" min="1" v-model="start" /></li>
    <li>終了 <input type="number" min="1" v-model="end" /></li>
    <li>増分 <input type="number" v-model="delta" /></li>
  </ul>

  <textarea v-model="content"></textarea>
  <button @click="executeAdjust">実行</button>

  <textarea placeholder="result" readonly v-model="resultStr"></textarea>
  <CopyButton :copyStr="resultStr" />

  <div v-if="diffArr.length" v-cloak>
    <h4>{{ message }}</h4>
    <ul>
      <li v-for="(diff, idx) in diffArr" :key="idx">
        <span>{{ diff.name }}&#12288;&#12288;</span>
        <AddressDiff :diff-details="diff.detail" />
      </li>
    </ul>
  </div>
  <div v-else>{{ message }}</div>
</template>

<script>
import AddressDiff from "@/components/AdjustNombre/AddressDiff.vue";
import CopyButton from "@/components/CopyButton.vue";

import { EntryLines } from "@/helpers/addressAdjuster.js";

export default {
  name: "PlusMinus",
  data: function () {
    return {
      content: "",
      start: 1,
      end: 999,
      delta: 1,
      adjustedArr: [],
      diffArr: [],
      message: "",
    };
  },
  components: {
    AddressDiff,
    CopyButton,
  },
  computed: {
    contentLines: function () {
      return this.content.split(/\n/).map((line) => String(line));
    },
    resultStr: function () {
      return this.adjustedArr
        .map((x) => {
          if (x.newNombres.length) {
            return `${x.name}\u3000\u3000${x.newNombres.join(", ")}`;
          }
          return x.name;
        })
        .join("\n");
    },
  },
  methods: {
    reset: function () {
      this.message = "";
      this.adjustedArr = [];
      this.diffArr = [];
    },
    executeAdjust: function () {
      this.reset();
      const eLines = new EntryLines(this.contentLines, this.start, this.end, this.delta);
      this.adjustedArr = eLines.adjust();
      this.adjustedArr
        .filter((x) => x.comparison.modified)
        .forEach((x) => {
          this.diffArr.push({
            name: x.name,
            detail: x.comparison.detail,
          });
        });
      if (this.diffArr.length) {
        this.message = this.diffArr.length + "件の変更があります。";
      } else {
        this.message = "修正箇所はありません。";
      }
    },
  },
};
</script>

<style scoped>
ul.config {
  display: flex;
  padding-left: 0;
}
ul.config li {
  margin-left: 1rem;
}
</style>
