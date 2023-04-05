<script setup>
import { ref } from "vue";
const emits = defineEmits(["updateState"]);
const isRevision = ref(false);
const onChange = () => {
  emits("updateState", { isRevision: isRevision.value });
};
</script>

<template>
  <span class="revision-label">改訂版：</span>
  <label class="switch__label">
    <input type="checkbox" class="switch__input" v-on:change="onChange" v-model="isRevision" />
    <span class="switch__content"></span>
    <span class="switch__circle"></span>
  </label>
</template>

<style scoped>
.revision-label {
  font-size: 0.95em;
}

/* https://sdesignlabo.com/web/togglebutton/ */
.switch__label {
  width: 50px;
  position: relative;
  display: inline-block;
}
.switch__content {
  display: block;
  cursor: pointer;
  position: relative;
  border-radius: 30px;
  height: 31px;
  overflow: hidden;
}
.switch__content:before {
  content: "";
  display: block;
  position: absolute;
  width: calc(100% - 3px);
  height: calc(100% - 3px);
  top: 0;
  left: 0;
  border: 1.5px solid #e5e5ea;
  border-radius: 30px;
  background-color: #fff;
}
.switch__content:after {
  content: "";
  display: block;
  position: absolute;
  background-color: transparent;
  width: 0;
  height: 0;
  top: 50%;
  left: 50%;
  border-radius: 30px;
  -webkit-transition: all 0.25s;
  -moz-transition: all 0.25s;
  -ms-transition: all 0.25s;
  -o-transition: all 0.25s;
  transition: all 0.25s;
}
.switch__input {
  display: none;
}
.switch__circle {
  display: block;
  top: 2px;
  left: 2px;
  position: absolute;
  -webkit-box-shadow: 0 2px 6px #999;
  box-shadow: 0 2px 6px #999;
  width: 27px;
  height: 27px;
  -webkit-border-radius: 20px;
  border-radius: 20px;
  background-color: #fff;
  -webkit-transition: all 0.25s;
  -moz-transition: all 0.25s;
  -ms-transition: all 0.25s;
  -o-transition: all 0.25s;
  transition: all 0.25s;
}
.switch__input:checked ~ .switch__circle {
  left: 21px;
}
.switch__input:checked ~ .switch__content:after {
  background-color: #42b983;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

