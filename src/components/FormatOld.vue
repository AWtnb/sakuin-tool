<script setup>
import { ref, computed } from "vue";

import { arrayOfLines } from "@/helpers/utils.js";
import { OldIndexLine } from "@/helpers/oldIndexLine.js";
import SimpleTextarea from "@/components/SimpleTextarea.vue";
import ResultBox from "@/components/ResultBox.vue";

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

const content = ref("");

const contentLines = computed(() => {
  return arrayOfLines(content.value);
});

const fmtArr = computed(() => {
  return formatOldIndex(contentLines.value);
});

const resultStr = computed(() => {
  return fmtArr.value.map((x) => x.formatted).join("\n");
});

const modified = computed(() => {
  return fmtArr.value.filter((x) => x.formatted != x.original);
});

const message = computed(() => {
  if (content.value.length < 1) {
    return "";
  }
  if (modified.value.length > 0) {
    return modified.value.length + "箇所を修正しました！";
  }
  return "問題のある箇所は見当たりませんでした！";
});
</script>

<template>
  <h2>ゲラから抽出した索引データの整形</h2>
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
    <li>英数の前後に入る不要なスペースを除去します。</li>
  </ul>

  <SimpleTextarea v-on:update-content="content = $event.content" />

  <ResultBox :result="resultStr" />

  <div v-cloak>
    <h4>{{ message }}</h4>
    <ol v-if="modified.length"
      ><li v-for="(fmt, idx) in modified" :key="idx">
        <ul class="detail">
          <li class="original">{{ fmt.original }}</li>
          <li class="formatted">{{ fmt.formatted }}</li>
        </ul>
      </li></ol
    >
  </div>
</template>

<style scoped>
.detail {
  padding-left: 0;
}
.detail li {
  list-style: none;
}
.original {
  color: gray;
}
.formatted {
  color: red;
}
</style>

