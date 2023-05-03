<script setup>
import { computed } from "vue";

import IgnorableArea from "@/components/IgnorableArea.vue";
import SimpleList from "@/components/SimpleList.vue";
import { ReferenceChecker } from "@/helpers/referenceChecker";

const props = defineProps({
  result: String,
});

const emits = defineEmits(["checkFinished"]);

const missingRefs = computed(() => {
  const checker = new ReferenceChecker(props.result);
  const found = checker.findMissingRefs();
  emits("checkFinished", {
    problem: "missingRef",
    count: found.length,
  });
  return found;
});
</script>

<template>
  <div v-if="missingRefs.length">
    <h3>見よ項目が足りません：</h3>
    <IgnorableArea>
      <table>
        <thead
          ><tr>
            <th>括弧のある項目</th>
            <th>必要な見よ項目</th>
          </tr></thead
        ><tbody>
          <tr v-for="(item, idx) in missingRefs" :key="idx">
            <td>{{ item.problem }}</td>
            <td><SimpleList :arr="item.require" /></td>
          </tr>
        </tbody>
      </table>
    </IgnorableArea>
  </div>
</template>
