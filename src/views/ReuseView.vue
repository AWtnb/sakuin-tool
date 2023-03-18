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

<script>
import SectionEnd from "@/components/SectionEnd.vue";
import FormatOld from "@/components/FormatOld.vue";
import ResolveChild from "@/components/ResolveChild.vue";
import Ungroup from "@/components/Ungroup/Ungroup.vue";

export default {
  name: "ReuseView",
  components: {
    SectionEnd,
    FormatOld,
    ResolveChild,
    Ungroup,
  },
};
</script>
