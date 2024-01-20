<script setup>
import { ref, computed } from "vue";

import { normalizeReading } from "@/helpers/utils";
import ResultBox from "@/components/ResultBox.vue";

const content = ref("");
const removeNoise = ref(true);

const resultStr = computed(() => {
  return normalizeReading(content.value, removeNoise.value);
});
</script>

<template>
  <details>
    <summary>排列読みへの変換だけ必要な場合はこちら</summary>
    <label><input type="checkbox" v-model="removeNoise" />カタカナ・数字・アルファベット以外を削除する</label>
    <textarea placeholder="paste here!" v-model="content"></textarea>
    <ResultBox :result="resultStr" />
  </details>
</template>
