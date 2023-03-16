<template>
  <h2>子項目候補をチェックする</h2>
  <PasteBox v-on:updateContent="content = $event.target.value" v-on:buttonClicked="executeCheck" />

  <div> <input type="radio" id="search-tail" value="tail" v-model="picked" /><label for="search-tail">末尾一致</label> <input type="radio" id="search-head" value="head" v-model="picked" /><label for="search-head">先頭一致</label> <input type="radio" id="search-all" value="all" v-model="picked" /><label for="search-all">両方</label> </div>

  <div v-if="found.length">
    <div class="limit-height" v-cloak>
      <table>
        <thead
          ><tr><th>項目</th><th>子項目候補</th></tr>
        </thead>
        <tbody>
          <tr v-for="(fd, idx) in found" :key="idx">
            <td>{{ fd.parent }}</td>
            <td
              ><ul>
                <li v-for="(c, idx) in fd.children" :key="idx">
                  <span
                    ><mark v-if="c.pre.length">{{ c.pre }}</mark
                    >{{ c.rest }}<mark v-if="c.post.length">{{ c.post }}</mark></span
                  >
                </li>
              </ul></td
            >
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PasteBox from "@/components/PasteBox.vue";
import { CheckChild } from "@/helpers/checkChild.js";

export default {
  name: "CheckChild",
  data: function () {
    return {
      content: "",
      picked: "all",
      found: [],
    };
  },
  components: {
    PasteBox,
  },
  computed: {
    contentLines: function () {
      return this.content.split(/\n/).map((line) => String(line));
    },
  },
  methods: {
    reset: function () {
      this.found = [];
    },
    executeCheck: function () {
      this.reset();
      const checker = new CheckChild(this.contentLines, this.picked);
      checker.findPossibles().forEach((x) => {
        this.found.push(x);
      });
    },
  },
};
</script>
