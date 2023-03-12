<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/vue.svg">
    <!-- <HelloWorld msg="Vite + Vue"/> -->
    <Home/>
  </div>
</template>

<script>
// import HelloWorld from '/src/components/HelloWorld.vue'
import Home from '/src/components/Home.vue'

export default {
  name: 'HomeView',
  components: {
    Home
  }
}
</script>
