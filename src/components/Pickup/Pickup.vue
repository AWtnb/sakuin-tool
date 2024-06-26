<script setup>
import { reactive, ref, computed } from "vue";

import afterPath from "@/assets/Pickup/template-image.png";

import TemplateTable from "./TemplateTable.vue";
import ExcelSetting from "./ExcelSetting.vue";
import CountRow from "./CountRow.vue";

const minRow = ref(1);
const maxRow = ref(250);

const sequence = computed(() => {
  const stack = [];
  for (let i = minRow.value - 1; i < maxRow.value; i++) {
    stack.push(i);
  }
  return stack;
});

const countMap = reactive(new Map());

const setCount = (evt) => {
  countMap.set(evt.nombre, evt.counter);
};

const workTemplate = computed(() => {
  const stack = [];
  let id = 0;
  Array.from(countMap.keys())
    .sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (b < a) {
        return 1;
      }
      return 0;
    })
    .filter((key) => countMap.get(key) > 0)
    .forEach((key, idx) => {
      for (let i = 0; i < countMap.get(key); i++) {
        id += 1;
        stack.push({
          id: id,
          idx: idx + 1,
          nombre: key,
        });
      }
    });
  return stack;
});

const resultStr = computed(() => {
  const header = ["ID", "index", "ページ", "項目", "見よ先"].join("\t");
  const conc = [header].concat(workTemplate.value.map((x) => `${x.id}\t${x.idx}\t${x.nombre}\t\t`));
  return conc.join("\n");
});
</script>

<template>
  <h2>索引拾いのテンプレート生成</h2>

  <p><img :src="afterPath" /></p>
  <p>ゲラ上にマーカーを引いた項目を Excel に記入するためのテンプレートを作ります。<br />先にカウントしておくことで、入力作業に集中することができます。</p>

  <label>開始ページ<input type="number" min="1" v-model="minRow" :disabled="workTemplate.length" /></label>

  <label>終了ページ<input type="number" min="1" v-model="maxRow" :disabled="workTemplate.length" /></label>

  <div class="wrapper">
    <table class="only-header">
      <thead>
        <tr> <th>ページ</th> <th>個数</th> </tr>
      </thead>
    </table>
    <div class="main-content">
      <table>
        <tbody>
          <CountRow :nombreIdx="seq" :maxRow="maxRow" v-for="(seq, idx) in sequence" :key="idx" v-on:updateCounter="setCount" />
        </tbody>
      </table>
    </div>
  </div>

  <ul>
    <li>上下キーでカウントを増減させられます</li>
    <li>左右キーで入力欄を移動できます</li>
    <li>見よ項目があれば見よ先項目とのペアで1つとカウントします</li>
  </ul>

  <TemplateTable :rows="workTemplate" :resultStr="resultStr" />

  <ExcelSetting />
</template>

<style scoped>
img {
  max-width: 400px;
}
.wrapper {
  border: 2px solid #bdbdbd;
  border-radius: 4px;
}
.wrapper table {
  margin: 0;
}
.wrapper .only-header {
  background-color: #bdbdbd;
}
.wrapper .only-header th {
  text-align: center;
}
.wrapper .main-content {
  overflow: auto;
  height: 250px;
}
</style>
