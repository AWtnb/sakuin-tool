<template>
  <h2>ゲラから抽出した索引データの整形</h2>
  <PasteBox v-on:updateContent="content = $event.target.value" v-on:buttonClicked="executeFormat" />

  <ul>
    <li
      ><strong>ゲラからテキストを抽出すると長い行が折り返されて改行になっていることがあります。</strong
      ><ul>
        <li>そうした箇所は先に手動で整形してください。</li>
      </ul></li
    >
    <li>見よ項目の矢印の前のアキを1倍モノに統一します。</li>
    <li>連続するノンブルを示すダーシの種類を<code>&ndash;</code>（enダーシ）に統一します。</li>
    <li>子項目のダーシの種類を<code>&horbar;&horbar;</code>（2倍ダーシ）に統一します。</li>
  </ul>

  <ResultBox :result="resultStr" />

  <div v-cloak>
    <h4>{{ message }}</h4>
    <ol v-if="modified.length"
      ><li v-for="(fmt, idx) in modified" :key="idx">
        <ul>
          <li class="original">{{ fmt.original }}</li>
          <li class="formatted">{{ fmt.formatted }}</li>
        </ul>
      </li></ol
    >
  </div>
</template>

<script>
import { OldIndexLine } from "@/helpers/oldIndexLine.js";

const formatOldIndex = (lines) => {
  return lines
    .map((line) => String(line).trimEnd().replace(/\t/, "\u3000\u3000"))
    .map((line) => {
      const fmt = new OldIndexLine(line).getFormattedLine();
      return {
        formatted: fmt,
        original: line,
      };
    });
};

import PasteBox from "@/components/PasteBox.vue";
import ResultBox from "@/components/ResultBox.vue";

export default {
  name: "FormatOld",
  data: function () {
    return {
      content: "",
      fmtArr: [],
      message: "",
    };
  },
  components: {
    PasteBox,
    ResultBox,
  },
  computed: {
    contentLines: function () {
      return this.content.split(/\n/).map((line) => String(line));
    },
    resultStr: function () {
      return this.fmtArr.map((x) => x.formatted).join("\n");
    },
    modified: function () {
      return this.fmtArr.filter((x) => x.formatted != x.original);
    },
  },
  methods: {
    reset: function () {
      this.fmtArr = [];
    },
    executeFormat: function () {
      this.reset();
      formatOldIndex(this.contentLines).forEach((x) => {
        this.fmtArr.push(x);
      });
      if (this.modified.length > 0) {
        this.message = this.modified.length + "箇所を修正しました！";
      } else {
        this.message = "問題のある箇所は見当たりませんでした！";
      }
    },
  },
};
</script>

<style scoped>
.original {
  color: gray;
}
.formatted {
  color: red;
}
</style>
