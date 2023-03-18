<template>
  <span v-for="(dtl, idx) in diffDetails" :key="idx">
    <del style="color: #bbb">{{ dtl.before }}</del>
    <span :style="{ color: dtl.color }">{{ dtl.text }}</span>
    <span v-if="!dtl.isEnd">, </span>
  </span>
</template>

<script>
export default {
  name: "AddressDiff",
  props: {
    diffDetails: {
      type: Array,
      require: true,
    },
  },
};
</script>
