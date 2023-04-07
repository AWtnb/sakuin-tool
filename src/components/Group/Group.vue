<script setup>
import { ref, computed, watch } from "vue";

import beforePath from "@/assets/Group/before.png";
import afterPath from "@/assets/Group/after.png";
import BeforeAfter from "@/components/BeforeAfter.vue";

import FindMissingRefs from "@/components/Group/FindMissingRefs.vue";

import { arrayOfLines } from "@/helpers/utils.js";
import { Grouper } from "@/helpers/grouper";
import SimpleTextarea from "@/components/SimpleTextarea.vue";
import ResultBox from "@/components/ResultBox.vue";
import { ReferenceChecker } from "@/helpers/referenceChecker";

const content = ref("");
const contentLines = computed(() => {
  const lines = arrayOfLines(content.value);
  if (skipHeader.value) {
    return lines.slice(1);
  }
  return lines;
});

const isLeft = ref(false);
const isOrdered = ref(false);
const skipHeader = ref(true);

const groupedStr = computed(() => {
  const grouper = new Grouper(contentLines.value, isLeft.value);
  return grouper.getGroupedLines(isOrdered.value).join("\n");
});

const missingRefs = computed(() => {
  const checker = new ReferenceChecker(groupedStr.value);
  return checker.findMissingRefs();
});

const possibleRefs = computed(() => {
  return missingRefs.value.map((x) => x.require).flat();
});

const acceptAllSuggestion = ref(false);

const onAcceptAllToggled = (evt) => {
  acceptAllSuggestion.value = evt.isChecked;
};

const userSelection = ref([]);

const onAcceptToggled = (evt) => {
  evt.refItems.forEach((x) => {
    if (evt.isChecked) {
      userSelection.value.push(x);
    } else {
      const found = userSelection.value.indexOf(x);
      userSelection.value.splice(found, 1);
    }
  });
};

const additionalEntries = computed(() => {
  if (acceptAllSuggestion.value) {
    return possibleRefs.value;
  }
  if (userSelection.value.length) {
    return userSelection.value;
  }
  return [];
});

const resultStr = computed(() => {
  if (additionalEntries.value.length < 1) {
    return groupedStr.value;
  }
  return groupedStr.value + "\n" + additionalEntries.value.join("\n");
});

watch(
  () => groupedStr.value,
  () => {
    userSelection.value = [];
    acceptAllSuggestion.value = false;
  }
);
</script>

<template>
  <h2>名寄せ</h2>

  <BeforeAfter :beforePath="beforePath" :afterPath="afterPath" />

  <p>ノンブルの<span style="color: red">並び</span>、<span style="color: blue">重複</span>、<span style="color: green">連続</span>を整理します。記号での装飾にも対応。</p>

  <label><input type="checkbox" v-model="skipHeader" />先頭行をスキップする</label>
  <label><input type="checkbox" v-model="isLeft" />ノンブルが左列</label>
  <label><input type="checkbox" v-model="isOrdered" />連続している項目のみ名寄せする</label>

  <SimpleTextarea v-on:update-content="content = $event.content" />

  <ResultBox :result="resultStr" />

  <FindMissingRefs :missingRefs="missingRefs" v-on:acceptAllToggled="onAcceptAllToggled" v-on:acceptToggled="onAcceptToggled" />
</template>

<style scoped>
label {
  display: block;
  width: fit-content;
}
</style>

