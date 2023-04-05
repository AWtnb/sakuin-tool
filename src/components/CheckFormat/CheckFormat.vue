<script setup>
import { ref, computed } from "vue";

import SimpleTextarea from "@/components/SimpleTextarea.vue";

import FindMissingRefferdFrom from "@/components/CheckFormat/FindMissingRefferdFrom.vue";
import FindAdjacent from "@/components/CheckFormat/FindAdjacent.vue";
import CheckConflict from "@/components/CheckFormat/CheckConflict.vue";
import CheckUngrouped from "@/components/CheckFormat/CheckUngrouped.vue";
import CheckAddress from "@/components/CheckFormat/CheckAddress.vue";

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

  <SimpleTextarea v-on:update-content="content = $event.target.value" />

  <p><strong>{{ msg }}</strong></p>

  <CheckAddress :result="content" v-on:checkFinished="addressProblem = $event" />
  <FindMissingRefferdFrom :result="content" v-on:checkFinished="referenceMissingProblem = $event" />
  <CheckUngrouped :result="content" v-on:checkFinished="groupProblem = $event" />
  <FindAdjacent :result="content" v-on:checkFinished="adjacentProblem = $event" />
  <CheckConflict :result="content" v-on:checkFinished="referenceConflictProblem = $event" />
</template>

