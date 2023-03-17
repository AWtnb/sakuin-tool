<template>
  <h2>索引拾いのテンプレート生成</h2>
  <PasteBox v-on:updateContent="content = $event.target.value" v-on:buttonClicked="executeGenerate" />

  <TemplateTable :lines="lines" :resultStr="resultStr"/>

  <div><img src="@/assets/Pickup/newtemplate.png" alt="" /></div>

  <p><code>個数</code>列は見よ項目がある場合、見よ先項目とのペアで1つとカウントします。</p>

  <ExcelSetting />
</template>

<script>
import { Util } from "@/helpers/utils";

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

import CopyButton from "@/components/CopyButton.vue";
import PasteBox from "@/components/PasteBox.vue";
import TemplateTable from "@/components/Pickup/TemplateTable.vue";
import ExcelSetting from "@/components/Pickup/ExcelSetting.vue";

export default {
  name: "Pickup",
  data: function () {
    return {
      content: "",
      lines: [],
    };
  },
  components: {
    CopyButton,
    PasteBox,
    TemplateTable,
    ExcelSetting,
  },
  computed: {
    contentLines: function () {
      return this.content.split(/\n/).map((line) => String(line));
    },
    resultStr: function () {
      const conc = ["ID\tindex\tページ\t項目\t見よ先"].concat(this.lines.map((x) => `${x.id}\t${x.pageIdx}\t${x.page}\t\t`));
      return conc.join("\n");
    },
  },
  methods: {
    reset: function () {
      this.lines = [];
    },
    executeGenerate: function () {
      this.reset();
      generateTemplate(this.contentLines).forEach((x) => {
        this.lines.push(x);
      });
    },
  },
};
</script>
