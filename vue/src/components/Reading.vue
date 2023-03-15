<template>
  <h2>よみがな取得</h2>

  <p>外部アプリを使用します。</p>
  <div><img src="https://github.com/AWtnb/flet_yomi/blob/master/images/demo.png?raw=true" alt="" /></div>
  <p><a href="https://github.com/AWtnb/flet_yomi">github.com/AWtnb/flet_yomi</a></p>

  <DownloadGuide />

  <h3>作業手順</h3>

  <h4>1. 名寄せした索引項目の読み情報を取得する</h4>
  <div><img src="@/assets/Reading/yomi_demo01.png" alt="" /></div>
  <p>名寄せが済んだ索引をテキストボックスに貼り付けて<code>GO!</code>のボタンをクリックすると読み情報が取得されます。</p>

  <ul>
    <li>結果は「元の文字」「読みがな」「解析の詳細」の3列です。</li>
    <li
      >オプションの意味：
      <ul>
        <li><code>Skip inside: () / []</code>：括弧内の文字（見よ元項目の情報など）を無視します。</li>
        <li><code>Skip nombles or reference (for book index)</code>：ノンブル情報（全角空白2個の後ろにある数字）、見よ先情報（<code>　→</code>の後ろにある文字）を無視します。</li>
      </ul>
    </li>
  </ul>

  <h4>2. 結果を Microsoft Excel に貼り付けてチェックする</h4>
  <div><img src="@/assets/Reading/yomi_demo02.png" alt="" /></div>
  <p><code>COPY!</code>ボタンで変換結果をコピーします。Excel を開いて貼り付けると楽にチェックできます。</p>

  <ul>
    <li>一番右の列で、どの単語をどう読んでいるのかがわかります。</li>
    <li><strong>この先使用するのは左の2列だけです。</strong>3列目を見ながら、変換にミスがあれば2列目を修正していきます。</li>
  </ul>

  <h4>3. 必要な列をコピーする</h4>
  <div><img src="@/assets/Reading/yomi_demo03.png" alt="" /></div>
  <p>読みがなのチェック・修正が終わったら、左2列をコピーして以降のステップ（並べ替え）に進んでください。</p>

  <ul>
    <li>配列読みは次の並べ替えのステップで自動生成します。</li>
  </ul>
</template>

<script>
import DownloadGuide from "@/components/DownloadGuide.vue";

export default {
  name: "Reading",
  components: {
    DownloadGuide,
  },
};
</script>
