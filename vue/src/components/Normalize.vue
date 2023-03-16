<template>
  <details>
    <summary>配列読みへの変換だけ必要な場合はこちら</summary>
    <div>
      <input type="checkbox" id="removeNoise" v-model="removeNoise" />
      <label for="removeNoise">カタカナ・数字・アルファベット以外を削除する</label>
    </div>
    <textarea placeholder="paste here!" v-model="content"></textarea>
    <ResultBox :result="resultStr" />
  </details>
</template>

<script>
import { normalizeReading } from "@/helpers/utils";
import ResultBox from "@/components/ResultBox.vue";

export default {
  name: "Normalize",
  data: function () {
    return {
      content: "",
      removeNoise: true,
    };
  },
  components: {
    ResultBox,
  },
  computed: {
    resultStr: function () {
      return normalizeReading(this.content, this.removeNoise);
    },
  },
};
</script>
