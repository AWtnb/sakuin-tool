<template>
  <div class="adjust">
    <h1>微調整</h1>
    <PlusMinus />
  </div>
</template>

<script>
import PlusMinus from "@/components/AdjustNombre/PlusMinus.vue";
// import CheckChild from "@/components/CheckChild.vue";
// import CheckNombre from "@/components/CheckNombre.vue";

export default {
  name: "AdjustView",
  components: {
    PlusMinus,
    // CheckChild,
    // CheckNombre,
  },
};
</script>
