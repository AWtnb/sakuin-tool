<template>
  <h2>名開き</h2>
  <PasteBox v-on:updateContent="content = $event.target.value" v-on:buttonClicked="executeFormat" />

  <div class="limit-height" v-if="released.length" v-cloak>
    <table>
      <thead>
        <tr><th>項目</th><th>ノンブル</th></tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in released" :key="idx">
          <td>{{ item.name }}</td>
          <td>{{ item.nombre }}</td>
        </tr>
      </tbody>
    </table>
    <CopyButton :copyStr="resultStr" />
  </div>

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

export default {
  name: "Ungroup",
  data: function () {
    return {
      content: "",
      released: [],
    };
  },
  components: {
    CopyButton,
    PasteBox
  },
  computed: {
    contentLines: function () {
      return this.content.split(/\n/).map((line) => String(line));
    },
    resultStr: function () {
      return this.released.map((x) => `${x.name}\t${x.nombre}`.trimEnd()).join("\n");
    },
  },
  methods: {
    reset: function () {
      this.released = [];
    },
    executeFormat: function () {
      this.reset();
      ungroupEntries(this.contentLines).forEach((x, i) => {
        this.released.push(x);
      });
    },
  },
};
</script>
