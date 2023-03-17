<template>
  <ul>
    <li v-for="(c, idx) in children" :key="idx">
      <span
        ><mark v-if="c.pre.length">{{ c.pre }}</mark
        >{{ c.rest }}<mark v-if="c.post.length">{{ c.post }}</mark></span
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: "PossibleList",
  props: {
    children: Array,
  },
};
</script>
