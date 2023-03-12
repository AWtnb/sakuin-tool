<template>
  <h2>入力済テンプレートの整形</h2>
  <textarea v-model="content"></textarea>
  <button @click="executeFormat">実行</button>
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

  <div v-if="lines.length" v-cloak>
    <div class="limit-height">
      <table>
        <thead>
          <tr> <th>項目</th><th>ノンブル</th> </tr>
        </thead>
        <tbody
          ><tr v-for="(item, idx) in lines" :key="idx">
            <td>{{ item.name }}</td>
            <td>{{ item.nombre }}</td>
          </tr></tbody
        >
      </table>
    </div>
    <CopyButton :copyStr="resultStr" />
  </div>

  <div><img src="/src/assets/Preformat/preformat.png" alt="" /></div>
</template>

<script>
import { Util } from "/src/helpers/utils.js";

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

import CopyButton from "/src/components/CopyButton.vue";

export default {
  name: "Preformat",
  props: {
    msg: String,
  },
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
