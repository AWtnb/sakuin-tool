<script setup>
import { computed } from "vue";

import IgnorableArea from "@/components/IgnorableArea.vue";
import LineDiff from "@/components/LineDiff/LineDiff.vue";

import { Entry } from "@/helpers/entry.js";
import { AddressHandler } from "@/helpers/addressHandler.js";

import { arrayOfLines } from "@/helpers/utils";

const props = defineProps({
  result: String,
});

const grepInvalidAddress = (s) => {
  const lines = arrayOfLines(s);
  return lines
    .filter((x) => String(x).trim())
    .map((line) => {
      const entry = new Entry(line);
      const handler = new AddressHandler(entry.address);
      if (handler.unsorted() || handler.unHyphened()) {
        const prefix = entry.name + entry.separator;
        return {
          line: line,
          origial: prefix + entry.address,
          formatted: prefix + handler.formatAll(),
        };
      }
      return null;
    })
    .filter(Boolean);
};

const emits = defineEmits(["checkFinished"]);

const problems = computed(() => {
  const found = grepInvalidAddress(props.result);
  emits("checkFinished", {
    problem: "invalidAddress",
    count: found.length,
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
          <LineDiff :from="problem.origial" :to="problem.formatted" />
        </li>
      </ul>
    </IgnorableArea>
  </div>
</template>
