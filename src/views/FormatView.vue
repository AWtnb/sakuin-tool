<template>
  <div class="format">
    <h1>索引の整形</h1>
    <Group/>
    <SectionEnd />
    <Reading/>
    <SectionEnd />
    <Sort/>
    <SectionEnd />
  </div>
</template>

<script>
import SectionEnd from "@/components/SectionEnd.vue";
import Group from '@/components/Group.vue'
import Reading from '@/components/Reading/Reading.vue'
import Sort from '@/components/Sort/Sort.vue'

export default {
  name: 'FormatView',
  components: {
    SectionEnd,
    Group,
    Reading,
    Sort,
  }
}
</script>