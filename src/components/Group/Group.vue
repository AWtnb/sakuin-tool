<script setup>
import { ref, computed } from "vue";

import beforePath from "@/assets/Group/before.png";
import afterPath from "@/assets/Group/after.png";
import BeforeAfter from "@/components/BeforeAfter.vue";

import FindNecessaryRefs from "@/components/Group/FindNecessaryRefs.vue";

import { arrayOfLines } from "@/helpers/utils.js";
import { Grouper } from "@/helpers/grouper";
import SimpleTextarea from "@/components/SimpleTextarea.vue";
import ResultBox from "@/components/ResultBox.vue";

const content = ref("");
const contentLines = computed(() => {
  const lines = arrayOfLines(content.value);
  if (skipHeader.value) {
    return lines.slice(1);
  }
  return lines;
});

const isLeft = ref(false);
const isOrdered = ref(false);
const skipHeader = ref(true);

const groupedLines = computed(() => {
  const grouper = new Grouper(contentLines.value, isLeft.value);
  return grouper.getGroupedLines(isOrdered.value);
});

const resultStr = computed(() => {
  return groupedLines.value.join("\n");
});
</script>

<template>
  <h2>名寄せ</h2>

  <BeforeAfter :beforePath="beforePath" :afterPath="afterPath" />

  <p>ノンブルの<span style="color: red">並び</span>、<span style="color: blue">重複</span>、<span style="color: green">連続</span>を整理します。記号での装飾にも対応。</p>

  <label><input type="checkbox" v-model="skipHeader" />先頭行をスキップする</label>
  <label><input type="checkbox" v-model="isLeft" />ノンブルが左列</label>
  <label><input type="checkbox" v-model="isOrdered" />連続している項目のみ名寄せする</label>

  <SimpleTextarea v-on:updateContent="content = $event.target.value" />

  <ResultBox :result="resultStr" />

  <FindNecessaryRefs :result="resultStr" />
</template>

<style scoped>
label {
  display: block;
  width: fit-content;
}
</style>

