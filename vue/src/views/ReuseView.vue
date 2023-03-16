<template>
  <div class="reuse">
    <h1>旧版索引の再利用</h1>
    <FormatOld />
    <hr />
    <ResolveChild />
    <hr />
    <Ungroup />
  </div>
</template>

<script>
import FormatOld from "@/components/FormatOld.vue";
import ResolveChild from "@/components/ResolveChild.vue";
import Ungroup from "@/components/Ungroup.vue";

export default {
  name: "ReuseView",
  components: {
    FormatOld,
    ResolveChild,
    Ungroup,
  },
};
</script>
