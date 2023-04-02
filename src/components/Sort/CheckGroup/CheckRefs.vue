<script setup>
import { ref, computed } from "vue";

import { arrayOfLines } from "@/helpers/utils.js";
import { ReferenceChecker } from "@/helpers/referenceChecker";
import { GroupChecker } from "@/helpers/groupChecker";

import PasteBox from "@/components/PasteBox.vue";
import RefLostTo from "@/components/CheckRefs/RefLostTo.vue";
import RefLostFrom from "@/components/CheckRefs/RefLostFrom.vue";
import RefDuplicate from "@/components/CheckRefs/RefDuplicate.vue";
import RefAdjacent from "@/components/CheckRefs/RefAdjacent.vue";

const content = ref("");
const lostTo = ref([]);
const lostFrom = ref([]);
const adjacent = ref([]);
const ungrouped = ref([]);
const conflicts = ref([]);
const message = ref("");

const contentLines = computed(() => {
  return arrayOfLines(content.value);
});

const isPerfect = computed(() => {
  return lostTo.value.length + lostFrom.value.length + adjacent.value.length + ungrouped.value.length + conflicts.value.length == 0;
});

const reset = () => {
  lostTo.value = [];
  lostFrom.value = [];
  adjacent.value = [];
  ungrouped.value = [];
  conflicts.value = [];
  message.value = "";
};

const executeCheck = () => {
  reset();

  const refChecker = new ReferenceChecker(contentLines.value);
  lostTo.value = refChecker.goalLostReference();
  lostFrom.value = refChecker.findNecessaryRefs();
  adjacent.value = refChecker.findAdjacent();

  const groupChecker = new GroupChecker(contentLines.value);
  ungrouped.value = groupChecker.getUngrouped();
  conflicts.value = groupChecker.getConflicting();

  if (isPerfect.value) {
    message.value = "問題は見当たりません！ 完璧かもしれません！";
  }
};
</script>

<template>
  <h2>見よ項目の対応チェック</h2>
  <PasteBox v-on:updateContent="content = $event.target.value" v-on:buttonClicked="executeCheck" />

  <div>
    <RefLostTo :lostTo="lostTo" />
    <RefLostFrom :lostFrom="lostFrom" />
    <RefDuplicate :duplicateRefs="ungrouped" msg="名寄せが不十分です：" />
    <RefDuplicate :duplicateRefs="conflicts" msg="見よ項目が本項目として残っています：" />
    <RefAdjacent :adjacentRefs="adjacent" />
    <div v-if="isPerfect" v-cloak>{{ message }}</div>
  </div>
</template>
