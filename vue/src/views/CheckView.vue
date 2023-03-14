<template>
  <div class="check">
    <h1>索引のチェック</h1>
    <CheckRefs/>
    <hr>
    <CheckChild/>
  </div>
</template>

<script>
import CheckRefs from '@/components/CheckRefs/CheckRefs.vue'
import CheckChild from '@/components/CheckChild.vue'

export default {
  name: 'CheckView',
  components: {
    CheckRefs,
    CheckChild,
  }
}
</script>