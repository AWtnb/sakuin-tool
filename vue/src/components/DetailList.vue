<template>
  <ul>
    <li v-for="(d, idx) in details" :key="idx">{{ d }}</li>
  </ul>
</template>

<script>
export default {
  name: "DetailList",
  props: {
    details: {
      type: Array,
      require: true,
    },
  },
};
</script>
