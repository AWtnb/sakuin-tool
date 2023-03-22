<template>
  <div class="box">
    <textarea :value="result" placeholder="result" readonly></textarea>
    <CopyButton :copyStr="result" />
  </div>
</template>

<script>
import CopyButton from "@/components/CopyButton.vue";

export default {
  name: "ResultBox",
  props: {
    result: {
      type: String,
    },
  },
  components: {
    CopyButton,
  },
};
</script>

<style scoped>
.box {
  margin: 6px auto;
}
</style>