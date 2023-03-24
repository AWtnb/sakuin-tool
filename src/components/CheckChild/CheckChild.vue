<script setup>
import { ref, computed } from "vue";

import PasteBox from "@/components/PasteBox.vue";
import FoundTable from "@/components/CheckChild/FoundTable.vue";
import { CheckChild } from "@/helpers/checkChild.js";

const content = ref("");
const picked = ref("all");
const found = ref([]);

const contentLines = computed(() => {
  return content.value.split(/\n/).map((line) => String(line));
});

const reset = () => {
  found.value = [];
};

const executeCheck = () => {
  reset();
  const checker = new CheckChild(contentLines.value, picked.value);
  found.value = checker.findPossibles();
};
</script>

<template>
  <h2>子項目候補をチェックする</h2>
  <PasteBox v-on:updateContent="content = $event.target.value" v-on:buttonClicked="executeCheck" />

  <div>
    <label><input type="radio" value="tail" v-model="picked" />末尾一致</label>
    <label><input type="radio" value="head" v-model="picked" />先頭一致</label>
    <label><input type="radio" value="all" v-model="picked" />両方</label>
  </div>

  <FoundTable :found="found" />
</template>
