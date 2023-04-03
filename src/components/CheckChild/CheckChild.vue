<script setup>
import { ref, computed } from "vue";

import { arrayOfLines } from "@/helpers/utils.js";
import SimpleTextarea from "@/components/SimpleTextarea.vue";
import FoundTable from "@/components/CheckChild/FoundTable.vue";
import { CheckChild } from "@/helpers/checkChild.js";

const content = ref("");
const picked = ref("all");

const contentLines = computed(() => {
  return arrayOfLines(content.value);
});

const found = computed(() => {
  const checker = new CheckChild(contentLines.value, picked.value);
  return checker.findPossibles();
});
</script>

<template>
  <h2>子項目候補をチェックする</h2>

  <SimpleTextarea v-on:updateContent="content = $event.target.value" />

  <div>
    <label><input type="radio" value="tail" v-model="picked" />末尾一致</label>
    <label><input type="radio" value="head" v-model="picked" />先頭一致</label>
    <label><input type="radio" value="all" v-model="picked" />両方</label>
  </div>

  <FoundTable :found="found" />
</template>

