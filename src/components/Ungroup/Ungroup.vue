<script setup>
import { ref, computed } from "vue";

import beforePath from "@/assets/Ungroup/before.png";
import afterPath from "@/assets/Ungroup/after.png";
import BeforeAfter from "@/components/BeforeAfter.vue";

import { arrayOfLines } from "@/helpers/utils.js";
import { AddressHandler } from "@/helpers/addressHandler.js";
import { Entry } from "@/helpers/entry.js";

import SimpleTextarea from "@/components/SimpleTextarea.vue";
import UngroupedTable from "@/components/Ungroup/UngroupedTable.vue";

const ungroupEntries = (lines) => {
  const stack = [];
  lines
    .filter((line) => line.trim())
    .map((line) => line.replace("\t", "\u3000\u3000"))
    .forEach((line) => {
      const entry = new Entry(line);
      if (entry.isReference) {
        stack.push({
          name: entry.name,
          nombre: "",
        });
        return;
      }
      new AddressHandler(entry.address).nombres.forEach((nombre) => {
        const n = (nombre.hyphenated)? String(nombre.intValue) : nombre.getText()
        stack.push({
          name: entry.name,
          nombre: n,
        });
      });
    });
  return stack;
};

const content = ref("");

const contentLines = computed(() => {
  return arrayOfLines(content.value);
});

const ungroupedLines = computed(() => {
  return ungroupEntries(contentLines.value);
});

const resultStr = computed(() => {
  return ungroupedLines.value.map((x) => `${x.name}\t${x.nombre}`.trimEnd()).join("\n");
});
</script>

<template>
  <h2>名開き</h2>

  <BeforeAfter :beforePath="beforePath" :afterPath="afterPath" />

  <p>※項目とノンブルが Excel 上で2列に分かれていても大丈夫です。</p>

  <SimpleTextarea v-on:update-content="content = $event.content" />

  <UngroupedTable :lines="ungroupedLines" :resultStr="resultStr" />
</template>

