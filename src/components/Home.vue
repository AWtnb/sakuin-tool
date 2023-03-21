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

  <h2>「索引」の定義</h2>

  <div><img src="@/assets/Home/definition.png" alt="索引の定義" /></div>

  <ul>
    <li
      >項目が2文字の場合もスペースは入れない<ul>
        <li>参考：<a href="https://www.soumu.go.jp/menu_news/s-news/01toukatsu01_02000186.html">機械判読可能なデータ表記方法</a>（総務省）</li>
      </ul></li
    >
    <li
      >ノンブル：<ul>
        <li>項目との間は2倍アキ</li>
        <li>ノンブル間は半角カンマ＆半角アキ</li>
        <li>3つ以上連続する場合は<code>–</code>（enダーシ）でつなぐ</li>
      </ul></li
    >
    <li
      >見よ項目：
      <ul>
        <li>見よ先の指示は<code>　→</code>（1倍アキ＆右矢印）</li>
        <li>参照先の項目では<code>（）</code>（全角丸パーレン）内に見よ元項目を示す</li>
      </ul>
    </li>
    <li
      >子項目：
      <ul>
        <li>1字下げ（先頭に1倍アキ）</li>
        <li>省略部分は<code>――</code>（2倍ダーシ）</li>
      </ul>
    </li>
  </ul>

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
