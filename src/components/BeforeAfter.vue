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
  justify-content: space-evenly;
  align-items: flex-start;
  margin: 20px auto;
}
.arrow::before {
  display: block;
  content: "▶";
  font-size: 4em;
  font-weight: bold;
  padding-top: .5em;
}
img {
  max-width: 40%;
  object-fit: scale-down;
}
</style>
