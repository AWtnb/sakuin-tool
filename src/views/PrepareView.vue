<script setup>
import { onMounted } from "vue";

import SectionEnd from "@/components/SectionEnd.vue";
import Pickup from "@/components/Pickup/Pickup.vue";
import Preformat from "@/components/Preformat/Preformat.vue";

const emits = defineEmits(["updateState"]);
onMounted(() => {
  emits("updateState", { isRevision: false });
});
</script>

<template>
  <div class="pickup">
    <h1>事前準備</h1>
    <Pickup />
    <SectionEnd />
    <Preformat />
    <SectionEnd />
  </div>
</template>
