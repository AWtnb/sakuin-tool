<template>
  <div class="check">
    <h1>索引のチェック</h1>
    <CheckRefs/>
    <hr>
  </div>
</template>

<script>
import CheckRefs from '@/components/CheckRefs.vue'

export default {
  name: 'CheckView',
  components: {
    CheckRefs,
  }
}
</script>