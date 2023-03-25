<script setup>
import { ref, computed } from "vue";

import { arrayOfLines } from "@/helpers/utils.js";
import { Entry, AddressHandler } from "@/helpers/entryHandler.js";

import PasteBox from "@/components/PasteBox.vue";
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
      } else {
        new AddressHandler(entry.address).nombres.forEach((nombre) => {
          stack.push({
            name: entry.name,
            nombre: nombre.display.text,
          });
        });
      }
    });
  return stack;
};

const content = ref("");
const ungroupedLines = ref([]);

const contentLines = computed(() => {
  return arrayOfLines(content.value);
});

const resultStr = computed(() => {
  return ungroupedLines.value.map((x) => `${x.name}\t${x.nombre}`.trimEnd()).join("\n");
});

const reset = () => {
  ungroupedLines.value = [];
};
const executeFormat = () => {
  reset();
  ungroupedLines.value = ungroupEntries(contentLines.value);
};
</script>

<template>
  <h2>名開き</h2>

  <PasteBox v-on:updateContent="content = $event.target.value" v-on:buttonClicked="executeFormat" />

  <UngroupedTable :lines="ungroupedLines" :resultStr="resultStr" />

  <div><img src="@/assets/Ungroup/ungroup.png" alt="" /> </div>
</template>
