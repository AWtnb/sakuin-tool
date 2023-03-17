<template>
  <h2>子項目候補をチェックする</h2>
  <PasteBox v-on:updateContent="content = $event.target.value" v-on:buttonClicked="executeCheck" />

  <div> <input type="radio" id="search-tail" value="tail" v-model="picked" /><label for="search-tail">末尾一致</label> <input type="radio" id="search-head" value="head" v-model="picked" /><label for="search-head">先頭一致</label> <input type="radio" id="search-all" value="all" v-model="picked" /><label for="search-all">両方</label> </div>

  <FoundTable :found="found" />
</template>

<script>
import PasteBox from "@/components/PasteBox.vue";
import FoundTable from "@/components/CheckChild/FoundTable.vue";
import { CheckChild } from "@/helpers/checkChild.js";

export default {
  name: "CheckChild",
  data: function () {
    return {
      content: "",
      picked: "all",
      found: [],
    };
  },
  components: {
    PasteBox,
    FoundTable,
  },
  computed: {
    contentLines: function () {
      return this.content.split(/\n/).map((line) => String(line));
    },
  },
  methods: {
    reset: function () {
      this.found = [];
    },
    executeCheck: function () {
      this.reset();
      const checker = new CheckChild(this.contentLines, this.picked);
      checker.findPossibles().forEach((x) => {
        this.found.push(x);
      });
    },
  },
};
</script>
