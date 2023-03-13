<template>
  <h2>索引拾いのテンプレート生成</h2>
  <textarea v-model="content"></textarea>
  <button @click="executeGenerate">実行</button>

  <div v-if="lines.length" v-cloak>
    <div class="limit-height">
      <table>
        <thead>
          <tr> <th>ID</th><th>index</th><th>ページ</th><th>項目</th><th>見よ先</th> </tr>
        </thead>
        <tbody>
          <tr v-for="(line, idx) in lines" :key="idx">
            <td>{{ line.id }}</td>
            <td>{{ line.pageIdx }}</td>
            <td>{{ line.page }}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <CopyButton :copyStr="resultStr" />
  </div>

  <div><img src="@/assets/Pickup/newtemplate.png" alt="" /></div>
  <ul>
    <li><code>個数</code>列：見よ項目がある場合、見よ先項目とのペアで1つとカウント</li>
  </ul>
  <details>
    <summary>TIPS：条件付き書式の設定</summary>
    <img src="@/assets/Pickup/generate-index.png" />
    <p><code>index</code>列に条件付き書式で<code>偶数の場合に背景色変更</code>という設定をするとページの変わり目が見やすくなり便利です。</p>
    <ul>
      <li>ルールの種類：<code>数式を使用して、書式設定するセルを決定</code></li>
      <li>数式：<code>=MOD($B1,2)=0</code></li>
    </ul>
    <img src="@/assets/Pickup/generate-index-rule.png" />
  </details>
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
