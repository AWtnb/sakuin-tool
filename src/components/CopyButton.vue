<template>
  <button @click="copy" :class="{ done: copied }">コピー</button>
</template>

<script>
export default {
  name: "CopyButton",
  props: {
    copyStr: {
      type: String,
    },
  },
  data: function () {
    return {
      copied: false,
    };
  },
  methods: {
    copy: function () {
      navigator.clipboard.writeText(String(this.copyStr).replace(/&amp;/g, "&"));
      this.copied = true;
    },
  },
  watch: {
    copyStr: function () {
      this.copied = false;
    },
  },
};
</script>

<style scoped>
button.done::after {
  content: "\2714";
  margin-left: 1em;
}
</style>
