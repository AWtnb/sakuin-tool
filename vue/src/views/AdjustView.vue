<template>
  <div class="adjust">
    <h1>微調整</h1>
    <PlusMinus />
    <hr />
    <JaConv />
    <hr />
    <Romanize />
  </div>
</template>

<script>
import PlusMinus from "@/components/AdjustNombre/PlusMinus.vue";
import JaConv from "@/components/JaConv.vue";
import Romanize from "@/components/Romanize.vue";

export default {
  name: "AdjustView",
  components: {
    PlusMinus,
    JaConv,
    Romanize,
  },
};
</script>
