<template>
  <h2>よみがな取得</h2>

  <p>外部アプリを使用します。</p>
  <div><img src="https://github.com/AWtnb/flet_yomi/blob/master/images/demo.png?raw=true" alt="" /></div>
  <p><a href="https://github.com/AWtnb/flet_yomi">github.com/AWtnb/flet_yomi</a></p>

  <details>
    <summary>ダウンロード方法（初回のみ）</summary>
    <div><img src="@/assets/Reading/yomi_dl_release.png" alt="" /></div>
    <p><a href="https://github.com/AWtnb/flet_yomi/releases">リリースページ</a>の一番上に表示されている exe ファイルをクリックするとダウンロードが始まります。100MB を超える巨大なファイルなので、余裕のある回線をご利用ください。</p>

    <h3>ダウンロード後の流れ</h3>
    <p>個人開発のアプリなのでダウンロード時に警告が表示されます（下記は Microsoft Edge の例）。信頼していただければ、下記の手順で有効化してください。</p>
    <ol>
      <li
        >マウスを乗せると表示されるメニューから「保存」を選択。
        <div><img src="@/assets/Reading/yomi_dl01.png" alt="" /></div>
      </li>
      <li
        >あらためて警告が出るので「詳細表示」をクリック。
        <div><img src="@/assets/Reading/yomi_dl02.png" alt="" /></div>
      </li>
      <li
        >「保持する」をクリックするとダウンロードが正式に始まります。
        <div><img src="@/assets/Reading/yomi_dl03.png" alt="" /></div>
      </li>
      <li
        >ダウンロード先のフォルダを開くと <code>yomi.exe</code> というファイルがダウンロードされているはず。
        <div><img src="@/assets/Reading/yomi_dl04.png" alt="" /></div>
      </li>
      <li
        >アプリはこの exe 単体で動作します。適当なフォルダを作って移動させましょう。
        <div><img src="@/assets/Reading/yomi_dl05.png" alt="" /></div>
      </li>
    </ol>

    <h3>初回起動時</h3>
    <p>おそらく初回の起動時に、Windows からの警告が表示されます。同じく信頼していただけましたら、下記の手順で有効化してください。</p>

    <ol>
      <li
        >「PC が保護されました」という表示の場合は「詳細情報」をクリック。
        <div><img src="@/assets/Reading/yomi_dl06.png" alt="" /></div>
      </li>
      <li
        >表示される「実行」ボタンをクリックするとアプリが起動します。
        <div><img src="@/assets/Reading/yomi_dl07.png" alt="" /></div>
      </li>
    </ol>
  </details>

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
