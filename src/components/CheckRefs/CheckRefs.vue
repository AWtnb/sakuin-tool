<template>
  <h2>見よ項目の対応チェック</h2>
  <PasteBox v-on:updateContent="content = $event.target.value" v-on:buttonClicked="executeCheck" />

  <div>
    <div v-if="lostTo.length">
      <RefLostTo :lostTo="lostTo"/>
    </div>
    <div v-if="lostFrom.length">
      <RefLostFrom :lostFrom="lostFrom"/>
    </div>
    <div v-if="ungrouped.length">
      <RefDuplicate :duplicateRefs="ungrouped" msg="見よ項目から参照されている項目の名寄せが不十分です！"/>
    </div>
    <div v-if="conflicts.length">
      <RefDuplicate :duplicateRefs="conflicts" msg="見よ項目が本項目として残っています！"/>
    </div>
    <div v-if="adjacent.length">
      <RefAdjacent :adjacentRefs="adjacent"/>
    </div>
    <div v-if="isPerfect" v-cloak>{{ message }}</div>
  </div>
</template>

<script>
import { ReferenceChecker } from "@/helpers/referenceChecker";
import { GroupChecker } from "@/helpers/groupChecker";

import PasteBox from "@/components/PasteBox.vue";
import RefLostTo from "@/components/CheckRefs/RefLostTo.vue";
import RefLostFrom from "@/components/CheckRefs/RefLostFrom.vue";
import RefDuplicate from "@/components/CheckRefs/RefDuplicate.vue";
import RefAdjacent from "@/components/CheckRefs/RefAdjacent.vue";

export default {
  name: "CheckRefs",
  data: function () {
    return {
      content: "",
      lostTo: [],
      lostFrom: [],
      adjacent: [],
      ungrouped: [],
      conflicts: [],
      message: "",
    };
  },
  components: {
    PasteBox,
    RefLostTo,
    RefLostFrom,
    RefDuplicate,
    RefAdjacent,
  },
  computed: {
    contentLines: function () {
      return this.content.split(/\n/).map((line) => String(line));
    },
    isPerfect: function () {
      return this.lostTo.length + this.lostFrom.length + this.adjacent.length + this.ungrouped.length + this.conflicts.length == 0;
    },
  },
  methods: {
    reset: function () {
      this.lostTo = [];
      this.lostFrom = [];
      this.adjacent = [];
      this.ungrouped = [];
      this.conflicts = [];
      this.message = "";
    },
    executeCheck: function () {
      this.reset();
      const refChecker = new ReferenceChecker(this.contentLines);
      refChecker.goalLostReference().forEach((x) => {
        this.lostTo.push(x);
      });
      refChecker.requiredFromReference().forEach((x) => {
        this.lostFrom.push(x);
      });
      refChecker.findAdjacent().forEach((x) => {
        this.adjacent.push(x);
      });
      const groupChecker = new GroupChecker(this.contentLines);
      groupChecker.getUngrouped().forEach((x) => {
        this.ungrouped.push(x);
      });
      groupChecker.getConflicting().forEach((x) => {
        this.conflicts.push(x);
      });
      if (this.isPerfect) {
        this.message = "問題は見当たりません！ 完璧かもしれません！";
      }
    },
  },
};
</script>
