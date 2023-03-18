<template>
  <h1>索引ツール</h1>
  <p>索引の整形／再利用に便利なツール類です。</p>
  <details>
    <summary>注意事項</summary>
    <ul>
      <li>本ツールでの索引整形は一定の法則にしたがって機械的に一括処理しています。</li>
      <li>例外的なデータには対応できません。精度にも限界がありますので<strong>必ず目でも校正してください。</strong></li>
      <li>本ツールが外部にデータを送信することは一切ありません。</li>
    </ul>
  </details>
  <h2>手順</h2>
  <h3>新規に作成するとき</h3>

  <ol>
    <li><code>Prepare</code>メニューから索引を Excel に拾うための雛形を作る </li>
    <li>作成した Excel 上に索引を記入していく</li>
    <li
      ><code>Format</code>メニューで拾ったデータを整形する<ol>
        <li>項目ごとに名寄せする</li>
        <li>名寄せした状態に対して読み仮名を取得する</li>
        <li>配列読みで並べ替える<br />→<strong>ひとまず完成！</strong></li>
      </ol></li
    ><li
      ><code>Check</code>メニューで並べ替えたデータをチェックする<ul>
        <li>見よ項目のチェック</li>
        <li>子項目候補のチェック</li>
        <li>微調整時は<code>Adjust</code>メニュー</li>
      </ul></li
    ></ol
  >

  <h3>旧版データがあるとき：<code>Reuse</code>メニュー</h3>

  <ol>
    <li>データの事前整形</li>
    <li>子項目の復元</li
    ><li>名寄せの解除（「名開き」）</li>
  </ol>
</template>

<style scoped>
strong {
  color: #ff0062;
}
h3::before {
  content: "■";
}
</style>
