<script setup>
import { computed } from "vue";

import IgnorableArea from "@/components/IgnorableArea.vue";
import { ReferenceChecker } from "@/helpers/referenceChecker";

const props = defineProps({
  result: String,
});

const emits = defineEmits(["checkFinished"]);

const missingBackLink = computed(() => {
  const checker = new ReferenceChecker(props.result);
  const found = checker.findMissingBackLink();
  emits("checkFinished", {
    problem: "missingBackLink",
    count: found.length
  });
  return found;
});
</script>

<template>
  <div v-if="missingBackLink.length">
    <h3>見よ先の括弧書きが足りません：</h3>
    <IgnorableArea>
      <table>
        <thead
          ><tr>
            <th>見よ項目</th>
            <th>必要な項目</th>
          </tr></thead
        >
        <tbody>
          <tr v-for="(lt, idx) in missingBackLink" :key="idx">
            <td>{{ lt.problem }}</td>
            <td>{{ lt.require }}</td>
          </tr>
        </tbody>
      </table>
    </IgnorableArea>
  </div>
</template>

