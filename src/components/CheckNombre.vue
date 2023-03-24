<script setup>
import { ref, computed } from "vue";

import PasteBox from "@/components/PasteBox.vue";
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
const message = ref("");
const problems = ref([]);

const contentLines = computed(() => {
  return content.value.split(/\n/).map((line) => String(line));
});

const reset = () => {
  message.value = "";
  problems.value = [];
};

const executeCheck = () => {
  reset();
  problems.value = grepInvalidNombreLine(contentLines.value);
  if (!problems.value.length) {
    message.value = "問題は見当たりません！";
  } else {
    message.value = "修正の必要があります！";
  }
};
</script>

<template>
  <h2>ノンブルの並びをチェックする</h2>
  <PasteBox v-on:updateContent="content = $event.target.value" v-on:buttonClicked="executeCheck" />

  <p>※ノンブルに半角数字以外が含まれている場合は正しく判定できません。</p>

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
