<template>
  <h2>手順</h2>
  <h3>新規に作成するとき</h3>

  <ol>
    <li><code>Prepare</code>メニューから索引を Excel に拾うための雛形を作る </li>
    <li>作成した Excel 上に索引を記入していく</li>
    <li
      ><code>Format</code>メニューで拾ったデータを整形する<ol>
        <li>項目ごとに名寄せする</li>
        <li>名寄せした状態に対して読み仮名を取得する</li>
        <li>配列読みで並べ替える→<strong>ひとまず完成！</strong></li>
      </ol></li
    ><li>微調整時は<code>Adjust</code>メニュー</li></ol
  >

  <h3>旧版データがあるとき：<code>Reuse</code>メニュー</h3>

  <ol>
    <li>データの事前整形</li>
    <li>子項目の復元</li
    ><li>名寄せの解除（「名開き」）</li>
  </ol>
</template>

<script>
export default {
  name: "Steps",
};
</script>

<style scoped>
strong {
  color: #ff0062;
}
</style>

