<script setup>
import SectionEnd from "@/components/SectionEnd.vue";
import CheckChild from "@/components/CheckChild/CheckChild.vue";
import PlusMinus from "@/components/PlusMinus/PlusMinus.vue";
import CheckNombre from "@/components/CheckNombre.vue";
</script>

<template>
  <div class="adjust">
    <h1>微調整</h1>
    <CheckChild />
    <SectionEnd />
    <PlusMinus />
    <SectionEnd />
    <CheckNombre />
    <SectionEnd />
  </div>
</template>
