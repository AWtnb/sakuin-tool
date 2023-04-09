<script setup>
import { ref, computed } from "vue";

import { arrayOfLines } from "@/helpers/utils.js";
import AddressDiff from "@/components/PlusMinus/AddressDiff.vue";
import SimpleTextarea from "@/components/SimpleTextarea.vue";
import ResultBox from "@/components/ResultBox.vue";

import { AddressAdjuster } from "@/helpers/addressAdjuster.js";

const content = ref("");
const start = ref(1);
const end = ref(999);
const delta = ref(1);

const contentLines = computed(() => {
  return arrayOfLines(content.value);
});

const adjustedArr = computed(() => {
  const adjuster = new AddressAdjuster(start.value, end.value, delta.value);
  return adjuster.apply(contentLines.value);
});

const diffArr = computed(() => {
  return adjustedArr.value
    .filter((x) => x.comparison.modified)
    .map((x) => ({
      name: x.name,
      detail: x.comparison.detail,
    }));
});

const message = computed(() => {
  if (content.value.length < 1) {
    return "";
  }
  if (diffArr.value.length) {
    return diffArr.value.length + "件の変更があります。";
  }
  return "修正箇所はありません。";
});

const resultStr = computed(() => {
  return adjustedArr.value
    .map((x) => {
      if (x.newNombres.length) {
        return `${x.name}\u3000\u3000${x.newNombres.join(", ")}`;
      }
      return x.name;
    })
    .join("\n");
});
</script>

<template>
  <h2>ノンブル加算減算</h2>
  <ul class="config">
    <li>開始 <input type="number" min="1" v-model="start" /></li>
    <li>終了 <input type="number" min="1" v-model="end" /></li>
    <li>増分 <input type="number" v-model="delta" /></li>
  </ul>

  <SimpleTextarea v-on:update-content="content = $event.content" />

  <ResultBox :result="resultStr" />

  <div v-cloak>
    <h4>{{ message }}</h4>
    <ul v-if="diffArr.length">
      <li v-for="(diff, idx) in diffArr" :key="idx">
        <span>{{ diff.name }}&#12288;&#12288;</span>
        <AddressDiff :diff-details="diff.detail" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul.config {
  display: flex;
  padding-left: 0;
}
ul.config li {
  margin: auto 1rem;
}
li input {
  width: 100px;
}
</style>

