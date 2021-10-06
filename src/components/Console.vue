<template>
  <div>
    <div v-for="log in logs" :key="log.date">
      {{ log.text }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";

export default Vue.extend({
  props: {
    id: String,
  },

  computed: {
    logs() {
      return store.state.logs[this.id as string];
    },
  },
});
</script>