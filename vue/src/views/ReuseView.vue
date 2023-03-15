<template>
  <div class="reuse">
    <h1>旧版索引の再利用</h1>
    <FormatOld />
    <hr />
    <!-- <JaConv /> -->
    <hr />
    <!-- <Romanize /> -->
  </div>
</template>

<script>
import FormatOld from "@/components/FormatOld.vue";
// import JaConv from "@/components/JaConv.vue";
// import Romanize from "@/components/Romanize.vue";

export default {
  name: "ReuseView",
  components: {
    FormatOld,
    // JaConv,
    // Romanize,
  },
};
</script>
