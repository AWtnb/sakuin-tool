<template>
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
</template>

<script>
export default {
  name: "Definition",
};
</script>
