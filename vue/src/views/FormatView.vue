<template>
  <div class="format">
    <h1>索引の整形</h1>
    <Group/>
    <hr>
    <Reading/>
    <hr>
    <Sort/>
  </div>
</template>

<script>
import Group from '@/components/Group.vue'
import Reading from '@/components/Reading.vue'
import Sort from '@/components/Sort.vue'

export default {
  name: 'FormatView',
  components: {
    Group,
    Reading,
    Sort,
  }
}
</script>