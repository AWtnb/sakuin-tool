<script setup>
import { computed } from "vue";

import IgnorableArea from "@/components/IgnorableArea.vue";

import { AddressChecker } from "@/helpers/addressChecker.js";
import { arrayOfLines } from "@/helpers/utils";

const props = defineProps({
  result: String,
});

const grepInvalidNombreLine = (s) => {
  const lines = arrayOfLines(s);
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

const emits = defineEmits(["checkFinished"]);

const problems = computed(() => {
  const found = grepInvalidNombreLine(props.result);
  emits("checkFinished", {
    problem: "invalidAddress",
    count: found.length
  });
  return found;
});
</script>

<template>
  <div v-if="problems.length">
    <h3>ノンブルの並びに問題があります：</h3>
    <IgnorableArea>
      <ul>
        <li v-for="(problem, idx) in problems" :key="idx">
          <span>{{ problem.line }}</span>
          <span v-for="(p, idx) in problem.detail" :key="idx">
            <span :style="{ color: p.color }">←{{ p.text }}</span>
          </span>
        </li>
      </ul>
    </IgnorableArea>
  </div>
</template>

<style scoped>
strong.warning {
  color: red;
}
</style>

