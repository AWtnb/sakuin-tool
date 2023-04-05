<script setup>
import { computed, ref, watch } from "vue";

import SimpleList from "@/components/SimpleList.vue";

import { ReferenceChecker } from "@/helpers/referenceChecker";

const props = defineProps({
  checkTarget: String,
});

const missingRefs = computed(() => {
  const checker = new ReferenceChecker(props.checkTarget);
  return checker.findMissingRefs();
});

const applySuggestion = ref(false);

const isBlur = computed(() => {
  return applySuggestion.value;
});

const possibleRefs = computed(() => {
  return missingRefs.value.map((x) => x.require).flat();
});

const emits = defineEmits(["updateUserChoice"]);

const onChange = () => {
  emits("updateUserChoice", {
    refItems: possibleRefs.value,
    isChecked: applySuggestion.value,
  });
};

watch(
  () => props.checkTarget,
  () => {
    if (missingRefs.value.length) {
      applySuggestion.value = false;
    }
  }
);
</script>

<template>
  <div v-if="missingRefs.length">
    <h3>見よ項目が足りません：</h3>
    <label> <input type="checkbox" v-model="applySuggestion" v-on:change="onChange" />追加する </label>
    <table>
      <thead
        ><tr>
          <th>項目</th>
          <th>必要な見よ項目</th>
        </tr></thead
      >
      <tbody>
        <tr v-for="(lf, idx) in missingRefs" :key="idx" :class="{ blur: isBlur }">
          <td>{{ lf.problem }}</td>
          <td><SimpleList :arr="lf.require" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
h3 {
  margin-top: 0;
}
.blur {
  color: #aaa;
}
</style>

