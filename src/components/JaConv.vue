<template>
  <h2>カタカナひらがな相互変換</h2>
  <textarea v-model="content"></textarea>
  <ResultBox :result="resultStr" />
</template>

<script>
import { Util } from "@/helpers/utils.js";
import ResultBox from "@/components/ResultBox.vue";

export default {
  name: "JaConv",
  data: function () {
    return {
      content: "",
    };
  },
  components: {
    ResultBox,
  },
  computed: {
    resultStr: function () {
      return this.content.replace(/[\u30a1-\u30f4\u3041-\u3093]/g, (m) => {
        if (m.match(/[\u30a1-\u30f4]/)) {
          return Util.toHiragana(m);
        }
        return Util.toKatakana(m);
      });
    },
  },
};
</script>
