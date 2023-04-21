<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  limit: Number,
  nombreIdx: Number,
});

const buffer = 1000;

const nombre = computed(() => Number(props.nombreIdx) + 1);
const tabindex = computed(() => Number(props.nombreIdx) + buffer);

const emits = defineEmits(["updateCounter"]);

const counter = ref(0);
const onInput = () => {
  emits("updateCounter", { nombre: nombre.value, counter: counter.value });
};

const toNext = (evt) => {
  const tabIdx = Number(evt.target.getAttribute("tabindex"));
  const to = tabIdx + 1;
  if (buffer + props.limit <= to) {
    return;
  }
  const elem = document.querySelector(`[tabindex="${to}"]`);
  if (elem) {
    elem.focus();
    elem.select();
  }
};
const toPrevious = (evt) => {
  const tabIdx = Number(evt.target.getAttribute("tabindex"));
  const to = tabIdx - 1;
  if (to < buffer) {
    return;
  }
  const elem = document.querySelector(`[tabindex="${to}"]`);
  if (elem) {
    elem.focus();
    elem.select();
  }
};
</script>

<template>
  <tr>
    <td class="nombre">{{ nombre }}</td>
    <td class="ui"><input type="number" min="0" v-model="counter" @input="onInput" @keyup.right="toNext" @keyup.left="toPrevious" :tabindex="tabindex" /></td>
  </tr>
</template>

<style scoped>
input {
  border: 1px solid gray;
  text-align: right;
}
.nombre {
  vertical-align: middle;
  text-align: center;
  font-weight: bold;
  font-size: 1.1em;
}
.ui {
  display: flex;
  justify-content: space-evenly;
}
</style>
