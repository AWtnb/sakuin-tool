<template>
  <h2>名寄せ</h2>
  <div
    ><img src="@/assets/Group/group.png" alt="" />
    <em>ノンブルの<span style="color: red">並び</span>、<span style="color: blue">重複</span>、<span style="color: green">連続</span>を整理。記号での装飾にも対応。</em>
  </div>

  <PasteBox v-on:updateContent="content = $event.target.value" v-on:buttonClicked="executeGrouping" />

  <label><input type="checkbox" v-model="skipHeader" />先頭行をスキップする</label>
  <label><input type="checkbox" v-model="isLeft" />ノンブルが左列</label>
  <label><input type="checkbox" v-model="isOrdered" />連続している項目のみ名寄せする</label>

  <ResultBox :result="resultStr" />
</template>

<script>
import { Grouper } from "@/helpers/grouper";
import PasteBox from "@/components/PasteBox.vue";
import ResultBox from "@/components/ResultBox.vue";

export default {
  name: "Group",
  data: function () {
    return {
      content: "",
      lines: [],
      isLeft: false,
      isOrdered: false,
      skipHeader: true,
    };
  },
  components: {
    PasteBox,
    ResultBox,
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
      return this.lines.join("\n");
    },
  },
  methods: {
    reset: function () {
      this.lines = [];
    },
    executeGrouping: function () {
      this.reset();
      const grouper = new Grouper(this.contentLines, this.isLeft);
      grouper.getGroupedLines(this.isOrdered).forEach((x) => {
        this.lines.push(x);
      });
    },
  },
};
</script>

<style scoped>
label {
  display: block;
}
</style>