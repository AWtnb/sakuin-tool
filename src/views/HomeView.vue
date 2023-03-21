<template>
  <div class="home">
    <Home/>
    <SectionEnd />
  </div>
</template>

<script>
import SectionEnd from "@/components/SectionEnd.vue";
import Home from '@/components/Home/Home.vue'

export default {
  name: 'HomeView',
  components: {
    SectionEnd,
    Home
  }
}
</script>
