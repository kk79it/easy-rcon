<template>
  <v-app>
    <system-bar></system-bar>
    <root-menu :absolute="true"></root-menu>
    <v-main>
      <v-container>
        オンラインサーバー一覧
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import SystemBar from "@/components/SystemBar.vue";
import RootMenu from "@/components/RootMenu.vue";

export default Vue.extend({
  name: "Chart",
  components: {
    SystemBar,
    RootMenu,
  },
});
</script>