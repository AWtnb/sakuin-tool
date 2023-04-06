<script setup>
import { computed, ref, watch } from "vue";

import RefTableRow from "@/components/Group/RefTableRow.vue";

import { ReferenceChecker } from "@/helpers/referenceChecker";

const props = defineProps({
  checkTarget: String,
});

const missingRefs = computed(() => {
  const checker = new ReferenceChecker(props.checkTarget);
  return checker.findMissingRefs();
});

const acceptAllSuggestion = ref(false);

const possibleRefs = computed(() => {
  return missingRefs.value.map((x) => x.require).flat();
});

const emits = defineEmits(["toggleAcceptAll", "selectAcceptable"]);

const onChange = () => {
  emits("toggleAcceptAll", {
    refItems: possibleRefs.value,
    isChecked: acceptAllSuggestion.value,
  });
};

watch(
  () => props.checkTarget,
  () => {
    if (missingRefs.value.length) {
      acceptAllSuggestion.value = false;
    }
  }
);
</script>

<template>
  <div v-if="missingRefs.length">
    <h3>見よ項目が足りません：</h3>
    <label> <input type="checkbox" v-model="acceptAllSuggestion" v-on:change="onChange" />まとめて追加する </label>
    <table>
      <thead
        ><tr>
          <th>括弧のある項目</th>
          <th>必要な見よ項目</th>
          <th>追加する</th>
        </tr></thead
      >
      <tbody>
        <RefTableRow v-for="(itm, idx) in missingRefs" :key="idx" :determined="acceptAllSuggestion" :refItem="itm" />
      </tbody>
    </table>
  </div>
</template>

<style scoped>
h3 {
  margin-top: 0;
}
</style>

