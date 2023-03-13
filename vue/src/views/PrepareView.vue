<template>
  <div class="pickup">
    <h1>事前準備</h1>
    <Pickup/>
    <hr>
    <Preformat/>
  </div>
</template>

<script>
import Pickup from '/src/components/Pickup.vue'
import Preformat from '/src/components/Preformat.vue'

export default {
  name: 'PrepareView',
  components: {
    Pickup,
    Preformat
  }
}
</script>