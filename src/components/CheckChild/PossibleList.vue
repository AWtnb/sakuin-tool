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

<script setup lang="ts">
import type { ChildCandidate } from "@/helpers/checkChild";

defineProps<{ children: ChildCandidate[] }>();
</script>
