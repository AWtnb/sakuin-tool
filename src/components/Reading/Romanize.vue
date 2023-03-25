<script setup>
import { ref, computed } from "vue";

import { toKatakana } from "@/helpers/utils.js";
import ResultBox from "@/components/ResultBox.vue";

const romanMap = new Map();
[
  ["ア", "A"],
  ["イ", "I"],
  ["ウ", "U"],
  ["エ", "E"],
  ["オ", "O"],
  ["カ", "Ka"],
  ["キ", "Ki"],
  ["ク", "Ku"],
  ["ケ", "Ke"],
  ["コ", "Ko"],
  ["サ", "Sa"],
  ["シ", "Shi"],
  ["ス", "Su"],
  ["セ", "Se"],
  ["ソ", "So"],
  ["タ", "Ta"],
  ["チ", "Chi"],
  ["ツ", "Tsu"],
  ["テ", "Te"],
  ["ト", "To"],
  ["ナ", "Na"],
  ["ニ", "Ni"],
  ["ヌ", "Nu"],
  ["ネ", "Ne"],
  ["ノ", "No"],
  ["ハ", "Ha"],
  ["ヒ", "Hi"],
  ["フ", "Fu"],
  ["ヘ", "He"],
  ["ホ", "Ho"],
  ["マ", "Ma"],
  ["ミ", "Mi"],
  ["ム", "Mu"],
  ["メ", "Me"],
  ["モ", "Mo"],
  ["ヤ", "Ya"],
  ["ユ", "Yu"],
  ["ヨ", "Yo"],
  ["ラ", "Ra"],
  ["リ", "Ri"],
  ["ル", "Ru"],
  ["レ", "Re"],
  ["ロ", "Ro"],
  ["ワ", "Wa"],
  ["ヲ", "Wo"],
  ["ン", "N"],
  ["ガ", "Ga"],
  ["ギ", "Gi"],
  ["グ", "Gu"],
  ["ゲ", "Ge"],
  ["ゴ", "Go"],
  ["ザ", "Za"],
  ["ジ", "Ji"],
  ["ズ", "Zu"],
  ["ゼ", "Ze"],
  ["ゾ", "Zo"],
  ["ダ", "Da"],
  ["ヂ", "Di"],
  ["ヅ", "Zu"],
  ["デ", "De"],
  ["ド", "Do"],
  ["バ", "Ba"],
  ["ビ", "Bi"],
  ["ブ", "Bu"],
  ["ベ", "Be"],
  ["ボ", "Bo"],
  ["パ", "Pa"],
  ["ピ", "Pi"],
  ["プ", "Pu"],
  ["ペ", "Pe"],
  ["ポ", "Po"],
  ["ャ", "Lya"],
  ["ュ", "Lyu"],
  ["ョ", "Lyo"],
  ["ッ", "Ltu"],
].forEach((x) => romanMap.set(...x));

const romanize = (s) => {
  let converted = toKatakana(s);
  for (let k of romanMap.keys()) {
    const reg = new RegExp(k, "g");
    converted = converted.replace(reg, romanMap.get(k));
  }
  // サ行タ行の拗音処理 → 拗音処理 → 促音処理
  converted = converted
    .replace(/([CS]h|J)iLy(.)/g, "$1$2")
    .replace(/([A-Z])iL(y.)/g, "$1$2")
    .replace(/Ltu(.)/g, "$1$1");
  return converted.toLowerCase();
};

const content = ref("");
const resultStr = computed(() => {
  return romanize(content.value);
});
</script>

<template>
  <details>
    <summary>ローマ字に変換</summary>
    <ul>
      <li
        >ヘボン式ローマ字に従っています。
        <ul>
          <li>拗音は「ゃ」「ゅ」「ょ」にのみ対応しています。</li>
        </ul>
      </li>
      <li
        >変換できなかった文字はそのまま表示します。
        <ul>
          <li>長音（ー）ならびに「ぁ」「ぃ」「ぅ」「ぇ」「ぉ」には非対応です。</li>
          <li>日本語に登場する頻度の低い「ヴ」や、その他の表記が定まらないケースにも非対応です。</li>
        </ul>
      </li>
    </ul>
    <textarea v-model="content"></textarea>
    <ResultBox :result="resultStr" />
  </details>
</template>
