<script setup>
import IgnorableArea from "@/components/CheckRefs/IgnorableArea.vue";
const props = defineProps({
  lostTo: Array,
});
</script>

<template>
  <div v-if="lostTo.length">
    <h3>見よ項目があるのに参照先に括弧で付記されていないものがあります！</h3>
    <IgnorableArea>
      <table>
        <thead
          ><tr>
            <th>見よ項目</th>
            <th>ヌケ</th>
          </tr></thead
        >
        <tbody>
          <tr v-for="(lt, idx) in lostTo" :key="idx">
            <td>{{ lt.problem }}</td>
            <td>{{ lt.require }}</td>
          </tr>
        </tbody>
      </table>
    </IgnorableArea>
  </div>
</template>

