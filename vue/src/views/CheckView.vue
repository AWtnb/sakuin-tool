<template>
  <div class="check">
    <h1>索引のチェック</h1>
    <CheckRefs />
    <SectionEnd />
    <CheckChild />
    <SectionEnd />
    <CheckNombre />
    <SectionEnd />
  </div>
</template>

<script>
import SectionEnd from "@/components/SectionEnd.vue";
import CheckRefs from "@/components/CheckRefs/CheckRefs.vue";
import CheckChild from "@/components/CheckChild/CheckChild.vue";
import CheckNombre from "@/components/CheckNombre.vue";

export default {
  name: "CheckView",
  components: {
    SectionEnd,
    CheckRefs,
    CheckChild,
    CheckNombre,
  },
};
</script>
