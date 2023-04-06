<script setup>
import { ref, computed } from "vue";
import SimpleList from "@/components/SimpleList.vue";

const props = defineProps({
  determined: Boolean,
  refItem: Object,
});

const isApply = ref(false);

const isBlur = computed(() => {
  return props.determined || isApply.value;
});

const emits = defineEmits(["toggleAccept"]);

const onChange = () => {
  emits("toggleAccept", {
    refItems: props.refItem.require,
    isChecked: isApply.value,
  });
};
</script>

<template>
  <tr :class="{ blur: isBlur }">
    <td>{{ refItem.problem }}</td>
    <td><SimpleList :arr="refItem.require" /></td>
    <td><input type="checkbox" v-model="isApply" v-on:change="onChange" :disabled="determined" /> </td>
  </tr>
</template>

<style scoped>
.blur {
  color: #aaa;
}
td {
  vertical-align: middle;
}
</style>

