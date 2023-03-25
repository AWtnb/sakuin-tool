<template>
    <div class="box">
        <img :src="beforePath" alt="beforeimg">
        <span class="arrow"></span>
        <img :src="afterPath" alt="afterimg">
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
    padding: 10px;
    align-items: center;
}
.arrow::before {
    content: "▶";
    font-size: 3em;
    font-weight: bold;
}
img {
    max-width: 45%;
    object-fit: scale-down;
}
</style>