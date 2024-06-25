<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  maxRow: Number,
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
  if (buffer + props.maxRow <= to) {
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

const isFocused = ref(false);

const hasNombre = computed(() => 0 < counter.value);
</script>

<template>
  <tr :class="{ focused: isFocused }">
    <td class="nombre" :class="{ zeroitem: !hasNombre }">{{ nombre }}</td>
    <td class="ui"><input type="number" min="0" v-model="counter" @input="onInput" @keyup.right="toNext" @keyup.left="toPrevious" :tabindex="tabindex" @focus="isFocused = true" @blur="isFocused = false" /></td>
  </tr>
</template>

<style scoped>
.zeroitem {
  color: #afafaf;
}
.focused {
  background-color: #f0f04d;
}
input {
  border: 1px solid gray;
  text-align: right;
  width: 100%;
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
