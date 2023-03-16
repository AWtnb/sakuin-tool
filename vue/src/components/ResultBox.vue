<template>
  <textarea :value="result" placeholder="result"></textarea>
  <CopyButton :copyStr="result" />
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
