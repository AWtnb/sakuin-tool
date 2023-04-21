<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  nombreIdx: Number,
});

const nombre = computed(() => Number(props.nombreIdx) + 1);

const emits = defineEmits(["updateCounter"]);

const counter = ref(0);
const onInput = () => {
  emits("updateCounter", { nombre: nombre.value, counter: counter.value });
};
</script>

<template>
  <tr>
    <td class="nombre">{{ nombre }}</td>
    <td class="ui"><input type="number" min="0" v-model="counter" @input="onInput" /></td>
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
