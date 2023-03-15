<template>
  <div class="adjust">
    <h1>微調整</h1>
    <PlusMinus />
    <hr>
    <JaConv />
  </div>
</template>

<script>
import PlusMinus from "@/components/AdjustNombre/PlusMinus.vue";
import JaConv from "@/components/JaConv.vue";
// import CheckNombre from "@/components/CheckNombre.vue";

export default {
  name: "AdjustView",
  components: {
    PlusMinus,
    JaConv,
    // CheckNombre,
  },
};
</script>
