<script setup>
import DetailList from "@/components/CheckRefs/DetailList.vue";
import IgnorableArea from "@/components/CheckRefs/IgnorableArea.vue";

const props = defineProps({
  lostFrom: Array,
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
            <th>ヌケ</th>
          </tr></thead
        >
        <tbody>
          <tr v-for="(lf, idx) in lostFrom" :key="idx">
            <td>{{ lf.problem }}</td>
            <td><DetailList :details="lf.require" /></td>
          </tr>
        </tbody>
      </table>
    </IgnorableArea>
  </div>
</template>

