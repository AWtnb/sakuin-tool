<template>
  <div class="section-end">
    <button @click="toTop">▲TOP</button>
    <hr />
  </div>
</template>

<script>
export default {
  name: "SectionEnd",
  methods: {
    toTop: function () {
      window.scroll({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.section-end {
  text-align: right;
  margin-top: 3em;
}
hr {
  margin-top: 1em;
  margin-bottom: 4em;
}
button {
  padding: 0;
  margin: 0;
  background: none;
  font-size: 14px;
  font-weight: bold;
  color: #42b983;
  min-width: 0;
  width: fit-content;
}
</style>
