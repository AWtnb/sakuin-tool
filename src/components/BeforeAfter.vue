<template>
  <div class="box">
    <img :src="beforePath" alt="beforeimg" />
    <div class="arrow"></div>
    <img :src="afterPath" alt="afterimg" />
  </div>
</template>

<script>
export default {
  name: "BeforeAfter",
  props: {
    beforePath: {
      type: String,
    },
    afterPath: {
      type: String,
    },
  },
};
</script>

<style scoped>
.box {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  align-items: flex-start;
}
.arrow::before {
  display: block;
  content: "▶";
  font-size: 4em;
  font-weight: bold;
  padding-top: 1em;
}
img {
  max-width: 45%;
  object-fit: scale-down;
}
</style>
