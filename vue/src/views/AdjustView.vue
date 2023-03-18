<template>
  <div class="adjust">
    <h1>微調整</h1>
    <PlusMinus />
    <SectionEnd />
    <JaConv />
    <SectionEnd />
    <Romanize />
    <SectionEnd />
  </div>
</template>

<script>
import SectionEnd from "@/components/SectionEnd.vue";
import PlusMinus from "@/components/AdjustNombre/PlusMinus.vue";
import JaConv from "@/components/JaConv.vue";
import Romanize from "@/components/Romanize.vue";

export default {
  name: "AdjustView",
  components: {
    SectionEnd,
    PlusMinus,
    JaConv,
    Romanize,
  },
};
</script>
