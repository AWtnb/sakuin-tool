<template>
  <nav>
    <ToggleRevision v-on:updateState="isRevision = $event.target.checked" />
    <div class="menu">
      <router-link to="/">Home</router-link> |
      <span v-if="isRevision">
        <router-link to="/reuse">Reuse</router-link>
      </span>
      <span v-else>
        <router-link to="/prepare">Prepare</router-link>
      </span>
      &#10145; <router-link to="/format">Format</router-link> &#10145; <router-link to="/check">Check</router-link> / <router-link to="/adjust">Adjust</router-link>
    </div>
  </nav>
  <router-view />
</template>

<script>
import ToggleRevision from "@/components/ToggleRevision.vue";

export default {
  name: "App",
  data: function () {
    return {
      isRevision: false,
    };
  },
  components: {
    ToggleRevision,
  },
};
</script>

<style scoped>
.menu {
  padding-bottom: 4px;
  border-bottom: #6b8096 double 4px;
}

nav a {
  font-weight: bold;
  color: #6b8096;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
