<template>
  <div class="adjust">
    <h1>微調整</h1>
    <PlusMinus />
    <SectionEnd />
  </div>
</template>

<script>
import SectionEnd from "@/components/SectionEnd.vue";
import PlusMinus from "@/components/PlusMinus/PlusMinus.vue";

export default {
  name: "AdjustView",
  components: {
    SectionEnd,
    PlusMinus,
  },
};
</script>
