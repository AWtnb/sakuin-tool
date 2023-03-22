<template>
  <h2>名開き</h2>

  <label><input type="checkbox" v-model="skipHeader" />先頭行をスキップする</label>
  <PasteBox v-on:updateContent="content = $event.target.value" v-on:buttonClicked="executeFormat" />

  <UngroupedTable :lines="ungroupedLines" :resultStr="resultStr" />

  <div><img src="@/assets/Ungroup/ungroup.png" alt="" /> </div>
</template>

<script>
import { Entry, AddressHandler } from "@/helpers/entryHandler.js";

const ungroupEntries = (lines) => {
  const stack = [];
  lines
    .filter((line) => line.trim())
    .map((line) => line.replace("\t", "\u3000\u3000"))
    .forEach((line) => {
      const entry = new Entry(line);
      if (entry.isReference) {
        stack.push({
          name: entry.name,
          nombre: "",
        });
      } else {
        new AddressHandler(entry.address).nombres.forEach((nombre) => {
          stack.push({
            name: entry.name,
            nombre: nombre.display.text,
          });
        });
      }
    });
  return stack;
};

import CopyButton from "@/components/CopyButton.vue";
import PasteBox from "@/components/PasteBox.vue";
import UngroupedTable from "@/components/Ungroup/UngroupedTable.vue";

export default {
  name: "Ungroup",
  data: function () {
    return {
      content: "",
      ungroupedLines: [],
      skipHeader: true,
    };
  },
  components: {
    CopyButton,
    PasteBox,
    UngroupedTable,
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
      return this.ungroupedLines.map((x) => `${x.name}\t${x.nombre}`.trimEnd()).join("\n");
    },
  },
  methods: {
    reset: function () {
      this.ungroupedLines = [];
    },
    executeFormat: function () {
      this.reset();
      ungroupEntries(this.contentLines).forEach((x, i) => {
        this.ungroupedLines.push(x);
      });
    },
  },
};
</script>
