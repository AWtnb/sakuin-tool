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

  <FormattedTable :lines="lines" :resultStr="resultStr" />

  <div><img src="@/assets/Preformat/preformat.png" alt="" /></div>
</template>

<script>
import { Util } from "@/helpers/utils.js";

const formatIndexTemplate = (lines) => {
  const stack = [];
  lines
    .filter((x) => x.trim())
    .forEach((line) => {
      const [nombre, name, referTo, ...rest] = line.split("\t").map((x) => x.trim());
      const nStr = String(Util.toHalfWidth(nombre));
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

import CopyButton from "@/components/CopyButton.vue";
import PasteBox from "@/components/PasteBox.vue";
import FormattedTable from "@/components/Preformat/FormattedTable.vue";

export default {
  name: "Preformat",
  data: function () {
    return {
      content: "",
      lines: [],
      skipHeader: true,
    };
  },
  components: {
    CopyButton,
    PasteBox,
    FormattedTable,
  },
  computed: {
    contentLines: function () {
      const lines = this.content.split(/\n/).map((line) => String(line));
      if (this.skipHeader) {
        return lines.slice(1);
      }
      return lines;
    },
    resultStr: function () {
      return this.lines.map((x) => `${x.name}\t${x.nombre}`).join("\n");
    },
  },
  methods: {
    reset: function () {
      this.lines = [];
    },
    executeFormat: function () {
      this.reset();
      formatIndexTemplate(this.contentLines).forEach((x) => {
        this.lines.push(x);
      });
    },
  },
};
</script>
