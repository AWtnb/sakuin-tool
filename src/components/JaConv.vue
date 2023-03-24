<script setup>
import { ref, computed } from "vue";

import { Util } from "@/helpers/utils.js";
import ResultBox from "@/components/ResultBox.vue";

const content = ref("");
const resultStr = computed(() => {
  return content.value.replace(/[\u30a1-\u30f4\u3041-\u3093]/g, (m) => {
    if (m.match(/[\u30a1-\u30f4]/)) {
      return Util.toHiragana(m);
    }
    return Util.toKatakana(m);
  });
});
</script>

<template>
  <h2>カタカナひらがな相互変換</h2>
  <textarea v-model="content"></textarea>
  <ResultBox :result="resultStr" />
</template>
