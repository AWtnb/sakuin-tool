<template>
  <details>
    <summary>TIPS：条件付き書式の設定</summary>
    <img src="@/assets/Pickup/generate-index.png" />
    <p><code>index</code>列に条件付き書式で<code>偶数の場合に背景色変更</code>という設定をするとページの変わり目が見やすくなり便利です。</p>
    <ul>
      <li>ルールの種類：<code>数式を使用して、書式設定するセルを決定</code></li>
      <li>数式：<code>=MOD($B1,2)=0</code></li>
    </ul>
    <img src="@/assets/Pickup/generate-index-rule.png" />
  </details>
</template>

<script>

export default {
  name: "ExcelSetting",
};
</script>
