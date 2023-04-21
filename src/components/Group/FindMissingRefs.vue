<script setup>
import { ref, watch } from "vue";

import RefTableRow from "./RefTableRow.vue";

const props = defineProps({
  missingRefs: Array,
});

const acceptAllSuggestion = ref(false);

const emits = defineEmits(["acceptAllToggled", "acceptToggled"]);

const onAcceptAllToggled = () => {
  emits("acceptAllToggled", {
    isChecked: acceptAllSuggestion.value,
  });
};

const onAcceptToggled = (evt, idx) => {
  emits("acceptToggled", {
    isChecked: evt.isChecked,
    idx: idx
  });
};

watch(
  () => props.missingRefs,
  () => {
    if (props.missingRefs.length) {
      acceptAllSuggestion.value = false;
    }
  }
);
</script>

<template>
  <div v-if="missingRefs.length">
    <h3>見よ項目が足りません：</h3>
    <label> <input type="checkbox" v-model="acceptAllSuggestion" v-on:change="onAcceptAllToggled" />まとめて追加する </label>
    <table>
      <thead
        ><tr>
          <th>括弧のある項目</th>
          <th>必要な見よ項目</th>
          <th>追加する</th>
        </tr></thead
      >
      <tbody>
        <RefTableRow v-for="(itm, idx) in missingRefs" :key="idx" :determined="acceptAllSuggestion" :refItem="itm" v-on:acceptToggled="onAcceptToggled($event, idx)" />
      </tbody>
    </table>
  </div>
</template>

<style scoped>
h3 {
  margin-top: 0;
}
</style>

