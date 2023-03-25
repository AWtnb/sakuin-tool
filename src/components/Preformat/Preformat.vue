<script setup>
import { ref, computed } from "vue";

import beforePath from "@/assets/Preformat/before.png";
import afterPath from "@/assets/Preformat/after.png";
import BeforeAfter from "@/components/BeforeAfter.vue";

import { toHalfWidth, arrayOfLines } from "@/helpers/utils.js";

import PasteBox from "@/components/PasteBox.vue";
import FormattedTable from "@/components/Preformat/FormattedTable.vue";

const formatIndexTemplate = (lines) => {
  const stack = [];
  lines
    .filter((x) => x.trim())
    .forEach((line) => {
      const [nombre, name, referTo, ...rest] = line.split("\t").map((x) => x.trim());
      const nStr = String(toHalfWidth(nombre));
      if (String(referTo).length > 0) {
        stack.push({
          nombre: "",
          name: `${name}\u3000→${referTo}`,
        });
        stack.push({
          nombre: nStr,
          name: `${referTo}\uff08${name}\uff09`,
        });
      } else {
        if (String(name).length > 0) {
          stack.push({
            nombre: nStr,
            name: name,
          });
        }
      }
    });
  return stack;
};

const content = ref("");
const tableRows = ref([]);
const skipHeader = ref(true);

const contentLines = computed(() => {
  const lines = arrayOfLines(content.value);
  if (skipHeader.value) {
    return lines.slice(1);
  }
  return lines;
});

const resultStr = computed(() => {
  return tableRows.value.map((x) => `${x.name}\t${x.nombre}`).join("\n");
});

const reset = () => {
  tableRows.value = [];
};
const executeFormat = () => {
  reset();
  tableRows.value = formatIndexTemplate(contentLines.value);
};
</script>

<template>
  <h2>入力済テンプレートの整形</h2>

  <label><input type="checkbox" v-model="skipHeader" />先頭行をスキップする</label>
  <PasteBox v-on:updateContent="content = $event.target.value" v-on:buttonClicked="executeFormat" />

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

  <FormattedTable :lines="tableRows" :resultStr="resultStr" />

  <BeforeAfter :beforePath="beforePath" :afterPath="afterPath"/>

</template>
