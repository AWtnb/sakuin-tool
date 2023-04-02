<script setup>
import SectionEnd from "@/components/SectionEnd.vue";
import CheckRefs from "@/components/CheckRefs/CheckRefs.vue";
import CheckChild from "@/components/CheckChild/CheckChild.vue";
</script>

<template>
  <div class="check">
    <h1>索引のチェック</h1>
    <CheckRefs />
    <SectionEnd />
    <CheckChild />
    <SectionEnd />
  </div>
</template>
