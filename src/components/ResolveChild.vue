<script setup>
import { ref, computed } from "vue";

import beforePath from "@/assets/ResolveChild/before.png";
import afterPath from "@/assets/ResolveChild/after.png";
import BeforeAfter from "@/components/BeforeAfter.vue";

import { arrayOfLines } from "@/helpers/utils.js";
import { Entry } from "@/helpers/entry.js";
import SimpleTextarea from "@/components/SimpleTextarea.vue";
import ResultBox from "@/components/ResultBox.vue";

const resolveChildEntry = (lines) => {
  if (lines.length < 1) {
    return [];
  }
  const stack = [];
  const parentStack = [];
  stack.push(lines[0]);
  parentStack.push(new Entry(lines[0]).basename);
  for (let i = 1; i < lines.length; i++) {
    const cur = new Entry(lines[i]);
    const basename = cur.basename;
    if (basename.startsWith("\u2015\u2015")) {
      const resolved = parentStack.at(-1) + basename.substring(2);
      stack.push(resolved + "\u3000\u3000" + cur.address);
    } else if (basename.endsWith("\u2015\u2015")) {
      const resolved = basename.substring(0, basename.length - 2) + parentStack.at(-1);
      stack.push(resolved + "\u3000\u3000" + cur.address);
    } else {
      stack.push(cur.rawStr);
      parentStack.push(basename);
    }
  }
  return stack;
};

const content = ref("");

const contentLines = computed(() => {
  return arrayOfLines(content.value);
});

const pureLines = computed(() => {
  return contentLines.value.map((line) => line.trim()).filter((line) => line.length);
});

const fmtArr = computed(() => {
  return resolveChildEntry(pureLines.value);
});

const resultStr = computed(() => {
  return fmtArr.value.join("\n");
});
</script>

<template>
  <h2>子項目の復元</h2>

  <BeforeAfter :beforePath="beforePath" :afterPath="afterPath" />

  <SimpleTextarea v-on:update-content="content = $event.target.value" />

  <ResultBox :result="resultStr" />
</template>

