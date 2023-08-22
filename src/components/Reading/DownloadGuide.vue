<template>
  <details>
    <summary>ダウンロード方法（初回のみ）</summary>
    <div><img src="@/assets/Reading/yomi_dl_release.png" alt="" /></div>
    <p><a href="https://github.com/AWtnb/flet-yomi/releases">リリースページ</a>の一番上に表示されている exe ファイルをクリックするとダウンロードが始まります。100MB を超える巨大なファイルなので、余裕のある回線をご利用ください。</p>

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
    <p>おそらく初回の起動時に、Windows からの警告が表示されます。有効化するには下記の操作をしてください。</p>

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
</template>

<script>
export default {
  name: "DownloadGuide",
};
</script>

<style scoped>
h3 {
  margin-top: 4rem;
  margin-bottom: 3rem;
}

ol {
  margin: 2rem auto;
}
</style>
