<template>
  <div v-if="found.length">
    <div class="limit-height" v-cloak>
      <table>
        <thead
          ><tr><th>項目</th><th>子項目候補</th></tr>
        </thead>
        <tbody>
          <tr v-for="(fd, idx) in found" :key="idx">
            <td>{{ fd.parent }}</td>
            <td>
              <PossibleList :children="fd.children" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PossibleList from "@/components/CheckChild/PossibleList.vue";
export default {
  name: "FoundTable",
  components: {
    PossibleList,
  },
  props: {
    found: Array,
  },
};
</script>
