<template>
  <div>
    <pre>{{ details }}</pre>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import Vue from "vue";

export default Vue.extend({
  props: {
    id: String,
  },

  computed: {
    details():
      | {
          host: string;
          port: number;
          password: string;
          icon: string;
        }
      | undefined {
      return store.state.servers.find(
        ({ host, port }) => `${host}:${port}` === this.id
      );
    },
  },
});
</script>