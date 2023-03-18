<template>
  <h3>見よ項目があるのに参照先に括弧で付記されていないものがあります！</h3>
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
</template>

<script>
export default {
  name: "RefLostTo",
  props: {
    lostTo: {
      type: Array,
      require: true,
    },
  },
};
</script>
