<script setup>
import { ref, computed } from "vue";

import { toHiragana, toKatakana } from "@/helpers/utils.js";
import ResultBox from "@/components/ResultBox.vue";

const content = ref("");
const resultStr = computed(() => {
  return content.value.replace(/[\u30a1-\u30f4\u3041-\u3093]/g, (m) => {
    if (m.match(/[\u30a1-\u30f4]/)) {
      return toHiragana(m);
    }
    return toKatakana(m);
  });
});
</script>

<template>
  <details>
    <summary>カタカナひらがな相互変換</summary>
    <textarea v-model="content"></textarea>
    <ResultBox :result="resultStr" />
  </details>
</template>
