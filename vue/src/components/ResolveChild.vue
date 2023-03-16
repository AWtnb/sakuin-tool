<template>
  <h2>子項目の復元</h2>
  <textarea v-model="content"></textarea>
  <button @click="executeFormat">実行</button>

  <ResultBox :result="resultStr" />
  <div><img src="@/assets/ResolveChild/resolveChild.png" alt="" /> </div>
</template>

<script>
import { Entry } from "@/helpers/entryHandler.js";

const resolveChildEntry = (lines) => {
  const stack = [];
  const parentStack = [];
  stack.push(lines[0]);
  parentStack.push(new Entry(lines[0]).basename);
  for (let i = 1; i < lines.length; i++) {
    const cur = new Entry(lines[i]);
    const basename = cur.basename;
    if (basename.startsWith("\u2015\u2015")) {
      const resolved = parentStack.at(-1) + basename.substring(2);
      stack.push(resolved + "\u3000\u3000" + cur.address);
    } else if (basename.endsWith("\u2015\u2015")) {
      const resolved = basename.substring(0, basename.length - 2) + parentStack.at(-1);
      stack.push(resolved + "\u3000\u3000" + cur.address);
    } else {
      stack.push(cur.rawStr);
      parentStack.push(basename);
    }
  }
  return stack;
};

import ResultBox from "@/components/ResultBox.vue";

export default {
  name: "ResolveChild",
  data: function () {
    return {
      content: "",
      fmtArr: [],
    };
  },
  components: {
    ResultBox,
  },
  computed: {
    contentLines: function () {
      return this.content.split(/\n/).map((line) => String(line));
    },
    pureLines: function () {
      return this.contentLines.filter((line) => line.trim()).map((line) => line.trim());
    },
    resultStr: function () {
      return this.fmtArr.join("\n");
    },
  },
  methods: {
    reset: function () {
      this.fmtArr = [];
    },
    executeFormat: function () {
      this.reset();
      resolveChildEntry(this.pureLines).forEach((x) => {
        this.fmtArr.push(x);
      });
    },
  },
};
</script>
