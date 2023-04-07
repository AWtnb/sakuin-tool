<script setup>
import { ref, computed, watch } from "vue";
import SimpleList from "@/components/SimpleList.vue";

const props = defineProps({
  determined: Boolean,
  refItem: Object,
});

const isApply = ref(false);

const isBlur = computed(() => {
  return props.determined || isApply.value;
});

const emits = defineEmits(["acceptToggled"]);

const onChange = () => {
  emits("acceptToggled", {
    refItems: props.refItem.require,
    isChecked: isApply.value,
  });
};

watch(
  () => props.refItem,
  () => {
    isApply.value = false;
  }
);
</script>

<template>
  <tr :class="{ blur: isBlur }">
    <td>{{ refItem.problem }}</td>
    <td class="required"><SimpleList :arr="refItem.require" /></td>
    <td><input type="checkbox" v-model="isApply" v-on:change="onChange" :disabled="determined" /> </td>
  </tr>
</template>

<style scoped>
.blur {
  color: #aaa;
}
.required {
  color: #fa2448;
}
td {
  vertical-align: middle;
}
</style>

