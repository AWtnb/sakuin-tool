<script setup>
import { ref, computed } from "vue";

import beforePath from "@/assets/Preformat/before.png";
import afterPath from "@/assets/Preformat/after.png";
import BeforeAfter from "@/components/BeforeAfter.vue";

import { toHalfWidth, arrayOfLines } from "@/helpers/utils.js";

import SimpleTextarea from "@/components/SimpleTextarea.vue";
import FormattedTable from "@/components/Preformat/FormattedTable.vue";

const formatIndexTemplate = (lines) => {
  const stack = [];
  lines
    .filter((x) => x.trim())
    .map((line) => line.split("\t"))
    .filter((elems) => elems.length > 2)
    .map((elems) => elems.map((elem) => elem.trim()))
    .forEach((elems) => {
      const nombre = toHalfWidth(elems[0]);
      const name = elems[1];
      const referTo = elems[2];
      if (nombre.length < 1 || name.length < 1) {
        return;
      }
      if (referTo.length < 1) {
        stack.push({
          nombre: nombre,
          name: name,
        });
        return;
      }
      stack.push({
        nombre: "",
        name: `${name}\u3000→${referTo}`,
      });
      stack.push({
        nombre: nombre,
        name: `${referTo}\uff08${name}\uff09`,
      });
    });
  return stack;
};

const content = ref("");
const skipHeader = ref(true);

const contentLines = computed(() => {
  const lines = arrayOfLines(content.value);
  if (skipHeader.value) {
    return lines.slice(1);
  }
  return lines;
});

const tableRows = computed(() => {
  return formatIndexTemplate(contentLines.value);
});

const resultStr = computed(() => {
  return tableRows.value.map((x) => `${x.name}\t${x.nombre}`).join("\n");
});
</script>

<template>
  <h2>入力済テンプレートの整形</h2>

  <BeforeAfter :beforePath="beforePath" :afterPath="afterPath" />

  <h3>整形内容</h3>
  <ul>
    <li>項目を左列に、ページを右列に配置</li>
    <li
      ><code>見よ先</code>が入力されている場合：
      <ul>
        <li><code>　→</code>でつないで見よ項目を作成</li>
        <li>ノンブルを削除</li>
        <li>代わりに同じノンブルで見よ先項目を作成</li>
      </ul>
    </li>
  </ul>

  <label><input type="checkbox" v-model="skipHeader" />先頭行をスキップする</label>
  <SimpleTextarea v-on:update-content="content = $event.content" />

  <FormattedTable :lines="tableRows" :resultStr="resultStr" />
</template>

