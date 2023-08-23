<script setup>
import { onMounted } from "vue";

import SectionEnd from "@/components/SectionEnd.vue";
import FormatOld from "@/components/FormatOld.vue";
import ResolveChild from "@/components/ResolveChild.vue";
import Ungroup from "@/components/Ungroup/Ungroup.vue";

const emits = defineEmits(["updateState"]);
onMounted(() => {
  emits("updateState", { isRevision: true });
});
</script>

<template>
  <div class="reuse">
    <h1>旧版索引の再利用</h1>
    <FormatOld />
    <SectionEnd />
    <ResolveChild />
    <SectionEnd />
    <Ungroup />
    <SectionEnd />
  </div>
</template>
