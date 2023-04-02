<script setup>
import { computed } from "vue";

import SimpleList from "@/components/SimpleList.vue";
import IgnorableArea from "@/components/IgnorableArea.vue";

import { ReferenceChecker } from "@/helpers/referenceChecker";

const props = defineProps({
  result: String,
});

const lostFrom = computed(() => {
  const checker = new ReferenceChecker(props.result);
  return checker.findNecessaryRefs();
});
</script>

<template>
  <div v-if="lostFrom.length">
    <h3>見よ項目が足りません：</h3>

    <IgnorableArea>
      <table>
        <thead
          ><tr>
            <th>項目</th>
            <th>必要な見よ項目</th>
          </tr></thead
        >
        <tbody>
          <tr v-for="(lf, idx) in lostFrom" :key="idx">
            <td>{{ lf.problem }}</td>
            <td><SimpleList :arr="lf.require" /></td>
          </tr>
        </tbody>
      </table>
    </IgnorableArea>
  </div>
</template>

