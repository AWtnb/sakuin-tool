<template>
  <div>
    <input type="checkbox" id="removeNoise" v-model="removeNoise" />
    <label for="removeNoise">カタカナ・数字・アルファベット以外を削除する</label>
  </div>
  <textarea placeholder="paste here!" v-model="content"></textarea>
  <textarea placeholder="result" readonly v-model="resultStr"></textarea>
  <copyButton :copyStr="resultStr" />
</template>

<script>
import { normalizeReading } from "@/helpers/utils";
import CopyButton from "@/components/CopyButton.vue";

export default {
  name: "Normalize",
  data: function () {
    return {
      content: "",
      removeNoise: true,
    };
  },
  components: {
    CopyButton,
  },
  computed: {
    resultStr: function () {
      return normalizeReading(this.content, this.removeNoise);
    },
  },
};
</script>
