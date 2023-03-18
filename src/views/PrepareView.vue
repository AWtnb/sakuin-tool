<template>
  <div class="pickup">
    <h1>事前準備</h1>
    <Pickup/>
    <SectionEnd />
    <Preformat/>
    <SectionEnd />
  </div>
</template>

<script>
import SectionEnd from "@/components/SectionEnd.vue";
import Pickup from '@/components/Pickup/Pickup.vue'
import Preformat from '@/components/Preformat/Preformat.vue'

export default {
  name: 'PrepareView',
  components: {
    SectionEnd,
    Pickup,
    Preformat
  }
}
</script>