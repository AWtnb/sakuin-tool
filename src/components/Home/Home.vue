<template>
  <h1>索引ツール</h1>
  <p>索引の整形／再利用に便利なツール類です。</p>
  <details>
    <summary>注意事項</summary>
    <ul>
      <li>本ツールでの索引整形は一定の法則にしたがって機械的に一括処理しています。</li>
      <li>例外的なデータには対応できません。精度にも限界がありますので<strong>必ず目でも校正してください。</strong></li>
      <li>本ツールが外部にデータを送信することは一切ありません。安心してご利用ください。</li>
    </ul>
  </details>

  <Definition />

  <Steps />

</template>

<script>
import Definition from "./Definition.vue";
import Steps from "./Steps.vue";
export default {
  name: "Home",
  components: {
    Definition,
    Steps,
  },
};
</script>

<style scoped>
strong {
  color: #ff0062;
}
</style>
