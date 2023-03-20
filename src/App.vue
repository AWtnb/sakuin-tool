<template>
  <nav>
    <div class="ui">
      <span class="toggle">
        <input type="checkbox" v-model="isRevision" id="isRevision" />
        <label for="isRevision">改訂版</label>
      </span>
    </div>
    <div>
      <router-link to="/">Home</router-link> |
      <span v-if="isRevision">
        <router-link to="/reuse">Reuse</router-link>
      </span>
      <span v-else>
        <router-link to="/prepare">Prepare</router-link>
      </span>
      &#10145; <router-link to="/format">Format</router-link> &#10145; <router-link to="/check">Check</router-link> or <router-link to="/adjust">Adjust</router-link>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      isRevision: false,
    };
  },
};
</script>

<style scoped>
nav a {
  font-weight: bold;
  color: #6b8096;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.ui {
  border-bottom: 1px solid #ccc;
  margin-bottom: 4px;
}
.toggle {
  margin-right: 1em;
}
</style>
