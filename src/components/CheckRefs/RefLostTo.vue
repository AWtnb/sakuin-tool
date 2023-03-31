<script setup>
import { ref } from "vue";

const props = defineProps({
  lostTo: Array,
});

const isIgnorable = ref(false);

</script>

<template>
  <div v-if="lostTo.length">
    <h3>見よ項目があるのに参照先に括弧で付記されていないものがあります！</h3>
    <label><input type="checkbox" v-model="isIgnorable" />無視する</label>
    <div v-if="!isIgnorable">
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
    </div>
  </div>
</template>

