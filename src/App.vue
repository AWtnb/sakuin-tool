<script setup>
import { ref } from "vue";
import HomeIcon from "@/components/HomeIcon.vue";
import ToggleRevision from "@/components/ToggleRevision.vue";
const isRevision = ref(false);

const listener = (evt) => {
  isRevision.value = evt.isRevision;
};
</script>

<template>
  <nav>
    <ToggleRevision v-on:update-state="listener" :state="isRevision" />
    <div class="menu">
      <router-link to="/"><HomeIcon /></router-link>
      <span class="detail">
        <span v-if="isRevision">
          <router-link to="/reuse">Reuse</router-link>
        </span>
        <span v-else>
          <router-link to="/prepare">Prepare</router-link>
        </span>
        → <router-link to="/format">Format</router-link> → <router-link to="/check">Check</router-link> | <router-link to="/adjust">Adjust</router-link>
      </span>
    </div>
  </nav>
  <router-view v-on:update-state="listener" class="component-content" />
</template>

<style scoped>
.menu {
  margin-top: 20px;
  padding-bottom: 4px;
  border-bottom: #6b8096 double 4px;
  display: flex;
  justify-content: space-between;
}

nav {
  position: sticky;
  top: 0;
  z-index: 999;
  background: white;
  padding: 8px 0;
}

nav a {
  font-weight: bold;
  color: #6b8096;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
