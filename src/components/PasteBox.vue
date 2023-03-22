<template>
  <div class="box">
    <textarea @input="onInput" placeholder="paste here!"></textarea>
    <button @click="onClick">実行！</button>
  </div>
</template>

<script>
export default {
  name: "PasteBox",
  emits: ["updateContent", "buttonClicked"],
  methods: {
    onInput: function(evt) {
      this.$emit("updateContent", evt);
    },
    onClick: function() {
      this.$emit("buttonClicked");
    }
  },
};
</script>

<style scoped>
.box {
  margin: 6px auto;
}
</style>