<script setup>
import { ref, computed } from "vue";

import SimpleTextarea from "@/components/SimpleTextarea.vue";

import FindMissingBackLink from "./FindMissingBackLink.vue";
import FindAdjacent from "./FindAdjacent.vue";
import CheckConflict from "./CheckConflict.vue";
import CheckUngrouped from "./CheckUngrouped.vue";
import CheckAddress from "./CheckAddress.vue";

const content = ref("");

const addressProblem = ref(0);
const referenceMissingProblem = ref(0);
const groupProblem = ref(0);
const adjacentProblem = ref(0);
const referenceConflictProblem = ref(0);

const msg = computed(() => {
  if (content.value.length > 0 && addressProblem.value + referenceMissingProblem.value + groupProblem.value + adjacentProblem.value + referenceConflictProblem.value == 0) {
    return "問題ありません！"
  }
  return "";
})

</script>

<template>
  <h2>体裁チェック</h2>

  <SimpleTextarea v-on:update-content="content = $event.content" />

  <p><strong>{{ msg }}</strong></p>

  <CheckUngrouped :result="content" v-on:checkFinished="groupProblem = $event" />
  <CheckAddress :result="content" v-on:checkFinished="addressProblem = $event" />
  <FindMissingBackLink :result="content" v-on:checkFinished="referenceMissingProblem = $event" />
  <CheckConflict :result="content" v-on:checkFinished="referenceConflictProblem = $event" />
  <FindAdjacent :result="content" v-on:checkFinished="adjacentProblem = $event" />
</template>

