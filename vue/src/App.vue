<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/prepare">Prepare</router-link> |
    <router-link to="/format">Format</router-link> |
    <router-link to="/check">Check</router-link> |
    <router-link to="/adjust">Adjust</router-link> |
    <router-link to="/reuse">Reuse</router-link>
  </nav>
  <router-view/>
  <ToTop/>
</template>

<script>
import ToTop from "@/components/ToTop.vue";

export default {
  name: "App",
  components: {
    ToTop,
  },
};
</script>