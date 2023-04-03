<script setup>
import { ref } from "vue";

import SimpleTextarea from "@/components/SimpleTextarea.vue";

import FindNecessarySrc from "@/components/CheckFormat/FindNecessarySrc.vue";
import FindAdjacent from "@/components/CheckFormat/FindAdjacent.vue";
import CheckConflict from "@/components/CheckFormat/CheckConflict.vue";
import CheckUngrouped from "@/components/CheckFormat/CheckUngrouped.vue";
import CheckAddress from "@/components/CheckFormat/CheckAddress.vue";

const content = ref("");

</script>

<template>
  <h2>体裁チェック</h2>

  <SimpleTextarea v-on:updateContent="content = $event.target.value" />
  <CheckAddress :result="content" />
  <FindNecessarySrc :result="content" />
  <CheckUngrouped :result="content" />
  <FindAdjacent :result="content" />
  <CheckConflict :result="content" />
</template>

