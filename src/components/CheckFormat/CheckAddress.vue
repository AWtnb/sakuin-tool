<script setup>
import { computed } from "vue";

import IgnorableArea from "@/components/IgnorableArea.vue";
import LineDiff from "@/components/LineDiff/LineDiff.vue";

import { Entry } from "@/helpers/entry.js";
import { AddressHandler } from "@/helpers/addressHandler.js";

import { arrayOfLines } from "@/helpers/utils";

const props = defineProps({
  result: String,
});

const grepInvalidAddress = (s) => {
  const lines = arrayOfLines(s);
  return lines
    .filter((x) => String(x).trim())
    .map((line) => {
      const entry = new Entry(line);
      const handler = new AddressHandler(entry.address);
      if (handler.unsorted() || handler.unHyphened()) {
        const prefix = entry.name + entry.separator;
        return {
          line: line,
          origial: prefix + entry.address,
          formatted: prefix + handler.formatAll(),
        };
      }
      return null;
    })
    .filter(Boolean);
};

const emits = defineEmits(["checkFinished"]);

const problems = computed(() => {
  const found = grepInvalidAddress(props.result);
  emits("checkFinished", {
    problem: "invalidAddress",
    count: found.length,
  });
  return found;
});
</script>

<template>
  <div v-if="problems.length">
    <h3>ノンブルに修正提案があります：</h3>
    <IgnorableArea>
      <ul class="note">
        <li><del>青の箇所</del>を削除して、<ins>赤の箇所</ins>を追記すると正しいノンブル形式になります。</li>
        <li>マウスを使って、<del>青の箇所</del>を飛ばして文字選択できます（文字選択を無効化しています）。</li>
      </ul>
      <ul>
        <li v-for="(problem, idx) in problems" :key="idx">
          <LineDiff :from="problem.origial" :to="problem.formatted" />
        </li>
      </ul>
    </IgnorableArea>
  </div>
</template>

<style scoped>
ul.note {
  font-size: 0.8em;
  border: 1px solid gray;
  border-radius: 4px;
  max-width: 90%;
  margin: 8px auto;
  padding-left: 1.5em;
}
ul.note li {
  list-style: circle;
}

ins {
  border-radius: 4px;
  background: #ffbebe;
  border: 1px solid tomato;
  text-decoration: none;
}
del {
  background: #a4e5ff;
  border: 1px solid #05374b;
  color: #929292;
  text-decoration: none;
}
</style>
