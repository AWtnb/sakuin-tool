<template>
  <h2>ノンブルの並びをチェックする</h2>
  <PasteBox v-on:updateContent="content = $event.target.value" v-on:buttonClicked="executeCheck" />

  <p><strong>ノンブルに半角数字以外が含まれている場合は正しく判定できません。</strong></p>

  <strong class="warning" v-if="message">{{ message }}</strong>
  <ul v-if="problems.length">
    <li v-for="(problem, idx) in problems" :key="idx">
      <span>{{ problem.line }}</span>
      <span v-for="(p, idx) in problem.detail" :key="idx">
        <span :style="{ color: p.color }">←{{ p.text }}</span>
      </span>
    </li>
  </ul>
</template>

<script>
import PasteBox from "@/components/PasteBox.vue";
import { AddressChecker } from "@/helpers/addressChecker.js";

const grepInvalidNombreLine = (lines) => {
  return lines
    .filter((x) => String(x).trim())
    .map((line) => {
      const checker = new AddressChecker(line);
      checker.checkSort();
      checker.checkHyphen();
      if (checker.problems.length > 0) {
        return {
          line: line,
          detail: checker.problems,
        };
      }
      return null;
    })
    .filter(Boolean);
};

export default {
  name: "CheckNomble",
  data: function () {
    return {
      content: "",
      message: "",
      problems: [],
    };
  },
  components: {
    PasteBox,
  },
  computed: {
    contentLines: function () {
      return this.content.split(/\n/).map((line) => String(line));
    },
  },
  methods: {
    reset: function () {
      this.message = "";
      this.problems = [];
    },
    executeCheck: function () {
      this.reset();
      grepInvalidNombreLine(this.contentLines).forEach((x) => {
        this.problems.push(x);
      });
      if (!this.problems.length) {
        this.message = "問題は見当たりません！";
      } else {
        this.message = "修正の必要があります！";
      }
    },
  },
};
</script>

<style scoped>
strong.warning {
  color: red;
}
</style>
