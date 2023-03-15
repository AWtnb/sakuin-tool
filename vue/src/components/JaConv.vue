<template>
  <h2>カタカナひらがな相互変換</h2>
  <textarea v-model="content"></textarea>
  <textarea placeholder="result" readonly v-model="resultStr"></textarea>
  <CopyButton :copyStr="resultStr" />
</template>

<script>
import { Util } from "@/helpers/utils.js";
import CopyButton from "@/components/CopyButton.vue";

export default {
  name: "Jaconv",
  data: function () {
    return {
      content: "",
    };
  },
  components: {
    CopyButton,
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
