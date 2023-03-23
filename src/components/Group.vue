<script setup>
import { ref, computed } from "vue";

import { Grouper } from "@/helpers/grouper";
import PasteBox from "@/components/PasteBox.vue";
import ResultBox from "@/components/ResultBox.vue";

const content = ref("");
const groupedLines = ref([]);
const isLeft = ref(false);
const isOrdered = ref(false);
const skipHeader = ref(true);

const contentLines = computed(() => {
  const lines = content.value.split(/\n/).map((line) => String(line));
  if (skipHeader.value) {
    return lines.slice(1);
  }
  return lines;
});
const resultStr = computed(() => {
  return groupedLines.value.join("\n");
});

const reset = () => {
  groupedLines.value = [];
};

const executeGrouping = () => {
  reset();
  const grouper = new Grouper(contentLines.value, isLeft.value);
  groupedLines.value = grouper.getGroupedLines(isOrdered.value);
};
</script>

<template>
  <h2>名寄せ</h2>
  <div
    ><img src="@/assets/Group/group.png" alt="" />
    <em>ノンブルの<span style="color: red">並び</span>、<span style="color: blue">重複</span>、<span style="color: green">連続</span>を整理。記号での装飾にも対応。</em>
  </div>

  <PasteBox v-on:updateContent="content = $event.target.value" v-on:buttonClicked="executeGrouping" />

  <label><input type="checkbox" v-model="skipHeader" />先頭行をスキップする</label>
  <label><input type="checkbox" v-model="isLeft" />ノンブルが左列</label>
  <label><input type="checkbox" v-model="isOrdered" />連続している項目のみ名寄せする</label>

  <ResultBox :result="resultStr" />
</template>

<style scoped>
label {
  display: block;
}
</style>
