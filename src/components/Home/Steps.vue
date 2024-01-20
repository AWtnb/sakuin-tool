<template>
  <h2>手順</h2>
  <h3>新規に作成するとき</h3>

  <ol>
    <li><router-link to="/prepare">Prepare</router-link>メニューから索引を Excel に拾うための雛形を作る </li>
    <li>作成した Excel 上に索引を記入していく</li>
    <li
      ><router-link to="/format">Format</router-link>メニューで拾ったデータを整形する<ol>
        <li>項目ごとに名寄せする</li>
        <li>名寄せした状態に対して読み仮名を取得する</li>
        <li>排列読みで並べ替える→<strong>ひとまず完成！</strong></li>
      </ol></li
    ><li>微調整時は<router-link to="/adjust">Adjust</router-link>メニュー</li></ol
  >

  <h3>旧版データがあるとき：<router-link to="/reuse">Reuse</router-link>メニュー</h3>

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
a {
  color: #42b983;
  font-weight: bold;
}
</style>
