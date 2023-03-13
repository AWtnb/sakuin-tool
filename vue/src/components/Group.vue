<template>
  <h2>名寄せ</h2>
  <textarea v-model="content"></textarea>
  <button @click="executeGrouping">実行</button>

  <div>
    <input type="checkbox" id="isLeft" v-model="isLeft" />
    <label for="isLeft">ノンブルが左列</label>
  </div>
  <div>
    <input type="checkbox" id="isOrdered" v-model="isOrdered" />
    <label for="isOrdered">連続している項目のみ名寄せする</label>
  </div>

  <div class="ui">
    <textarea placeholder="result" readonly v-model="resultStr"></textarea>
    <CopyButton :copyStr="resultStr" />
  </div>

  <div
    ><img src="@/assets/Group/group.png" alt="" />
    <em>ノンブルの<span style="color: red">並び</span>、<span style="color: blue">重複</span>、<span style="color: green">連続</span>を整理。記号での装飾にも対応。</em>
  </div>
</template>

<script>
import { Grouper } from "@/helpers/grouper";
import CopyButton from "@/components/CopyButton.vue";

export default {
  name: "Group",
  data: function () {
    return {
      content: "",
      lines: [],
      isLeft: false,
      isOrdered: false,
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
