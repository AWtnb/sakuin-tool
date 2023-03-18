<template>
  <h3>参照元として括弧書きされているのに見よ項目がないものがあります！</h3>
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
</template>

<script>
import DetailList from '@/components/CheckRefs/DetailList.vue';

export default {
  name: "RefLostFrom",
  props: {
    lostFrom: {
      type: Array,
      require: true,
    },
  },
  components: {
    DetailList
  }
};
</script>
