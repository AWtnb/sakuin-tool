<script setup>
import { ref, computed } from "vue";

import { Util } from "@/helpers/utils";
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
      const nItem = Util.toHalfWidth(counter);
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
  const lines = content.value.split(/\n/).map((line) => String(line));
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

  <label><input type="checkbox" v-model="skipHeader" />先頭行をスキップする</label>
  <PasteBox v-on:updateContent="content = $event.target.value" v-on:buttonClicked="executeGenerate" />

  <TemplateTable :lines="tableRows" :resultStr="resultStr" />

  <div><img src="@/assets/Pickup/newtemplate.png" alt="" /></div>

  <p><code>個数</code>列は見よ項目がある場合、見よ先項目とのペアで1つとカウントします。</p>

  <ExcelSetting />
</template>
