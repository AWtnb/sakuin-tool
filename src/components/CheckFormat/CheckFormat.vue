<script setup>
import { reactive, ref, computed } from "vue";

import SimpleTextarea from "@/components/SimpleTextarea.vue";

import FindMissingBackLink from "./FindMissingBackLink.vue";
import FindAdjacent from "./FindAdjacent.vue";
import CheckMissingRef from "./CheckMissingRef.vue";
import CheckConflict from "./CheckConflict.vue";
import CheckUngrouped from "./CheckUngrouped.vue";
import CheckAddress from "./CheckAddress.vue";

const content = ref("");

const problemMap = reactive(new Map());
const storeProblem = (evt) => {
  problemMap.set(evt.problem, evt.count);
};

const hasProblem = computed(() => {
  return (
    Array.from(problemMap.values()).reduce((total, val) => {
      return total + val;
    }, 0) > 0
  );
});

const msg = computed(() => {
  if (content.value.length < 1 || hasProblem.value) {
    return "";
  }
  return "問題ありません！";
});
</script>

<template>
  <SimpleTextarea v-on:update-content="content = $event.content" />

  <p>
    <strong>{{ msg }}</strong>
  </p>

  <CheckMissingRef :result="content" v-on:checkFinished="storeProblem" />
  <CheckUngrouped :result="content" v-on:checkFinished="storeProblem" />
  <CheckAddress :result="content" v-on:checkFinished="storeProblem" />
  <FindMissingBackLink :result="content" v-on:checkFinished="storeProblem" />
  <CheckConflict :result="content" v-on:checkFinished="storeProblem" />
  <FindAdjacent :result="content" v-on:checkFinished="storeProblem" />
</template>
