<script setup>
import { ref, computed } from "vue";

import { arrayOfLines } from "@/helpers/utils.js";
import SimpleTextarea from "@/components/SimpleTextarea.vue";
import { AddressChecker } from "@/helpers/addressChecker.js";

const grepInvalidNombreLine = (lines) => {
  return lines
    .filter((x) => String(x).trim())
    .map((line) => {
      const checker = new AddressChecker(line);
      checker.checkSort();
      checker.checkHyphen();
      if (checker.problems.length > 0) {
        return {
          line: line,
          detail: checker.problems,
        };
      }
      return null;
    })
    .filter(Boolean);
};

const content = ref("");

const contentLines = computed(() => {
  return arrayOfLines(content.value);
});

const message = computed(() => {
  if (content.value.length < 1) {
    return "";
  }
  if (problems.value.length) {
    return "修正の必要があります！";
  }
  return "問題は見当たりません！";
});

const problems = computed(() => {
  return grepInvalidNombreLine(contentLines.value);
});
</script>

<template>
  <h2>ノンブルの並びをチェックする</h2>
  <SimpleTextarea v-on:updateContent="content = $event.target.value" />

  <strong class="warning" v-if="message">{{ message }}</strong>
  <ul v-if="problems.length">
    <li v-for="(problem, idx) in problems" :key="idx">
      <span>{{ problem.line }}</span>
      <span v-for="(p, idx) in problem.detail" :key="idx">
        <span :style="{ color: p.color }">←{{ p.text }}</span>
      </span>
    </li>
  </ul>
</template>

<style scoped>
strong.warning {
  color: red;
}
</style>

