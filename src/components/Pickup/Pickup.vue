<script setup>
import { ref, computed } from "vue";

import beforePath from "@/assets/Pickup/NewTemplate/before.png";
import afterPath from "@/assets/Pickup/NewTemplate/after.png";

import { toHalfWidth, arrayOfLines } from "@/helpers/utils";
import BeforeAfter from "@/components/BeforeAfter.vue";
import PasteBox from "@/components/PasteBox.vue";
import TemplateTable from "@/components/Pickup/TemplateTable.vue";
import ExcelSetting from "@/components/Pickup/ExcelSetting.vue";

const generateTemplate = (lines) => {
  const stack = [];
  let pageIdx = 0;
  lines
    .filter((line) => line)
    .forEach((line) => {
      const [page, counter, ...rest] = line.split("\t");
      const nItem = toHalfWidth(counter);
      if (Number(nItem) > 0) {
        pageIdx += 1;
        for (let i = 0; i < Number(nItem); i++) {
          stack.push({
            id: String(stack.length + 1),
            pageIdx: String(pageIdx),
            page: String(page),
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
  const conc = ["ID\tindex\tページ\t項目\t見よ先"].concat(tableRows.value.map((x) => `${x.id}\t${x.pageIdx}\t${x.page}\t\t`));
  return conc.join("\n");
});

const reset = () => {
  tableRows.value = [];
};

const executeGenerate = () => {
  reset();
  tableRows.value = generateTemplate(contentLines.value);
};
</script>

<template>
  <h2>索引拾いのテンプレート生成</h2>

  <BeforeAfter :beforePath="beforePath" :afterPath="afterPath" />

  <p>※<code>個数</code>列は見よ項目がある場合、見よ先項目とのペアで1つとカウントします。</p>

  <label><input type="checkbox" v-model="skipHeader" />先頭行をスキップする</label>
  <PasteBox v-on:updateContent="content = $event.target.value" v-on:buttonClicked="executeGenerate" />
  <TemplateTable :lines="tableRows" :resultStr="resultStr" />

  <ExcelSetting />
</template>
