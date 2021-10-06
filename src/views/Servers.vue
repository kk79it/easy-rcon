<template>
  <v-app id="inspire">
    <system-bar></system-bar>

    <v-navigation-drawer permanent floating hide-overlay app width="314">
      <v-layout fill-height>
        <root-menu></root-menu>
        <server-menu :id="key"></server-menu>
      </v-layout>
    </v-navigation-drawer>

    <v-app-bar app clipped-right flat dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title v-text="key"></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer permanent app clipped right>
      <v-list>
        <!-- <v-list-item v-for="([name, uuid, icon], n) in players" :key="n" link>
        <v-list-item-avatar>
          <v-img :src="icon"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="name"></v-list-item-title>
          <v-list-item-subtitle v-text="uuid"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item> -->
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import RootMenu from "@/components/RootMenu.vue";
import ServerMenu from "@/components/ServerMenu.vue";
import SystemBar from "@/components/SystemBar.vue";

export default Vue.extend({
  data: () => ({
    authenticated: false,
  }),

  props: {
    id: String,
  },

  computed: {
    itemsTab(): { text: string; icon: string; to: string }[] {
      return [
        {
          text: "Console",
          icon: "mdi-apps",
          to: `/servers/${this.id}/console`,
        },
        {
          text: "Settings",
          icon: "mdi-instagram",
          to: `/servers/${this.id}/settings`,
        },
      ];
    },

    details(): Server | undefined {
      return store.state.servers.find(
        ({ host, port }) => `${host}:${port}` === this.id
      );
    },

    key(): string | undefined {
      if (this.details) {
        return `${this.details.host}:${this.details.port}`;
      }
      return undefined;
    },
  },

  components: {
    RootMenu,
    ServerMenu,
    SystemBar,
  },
});

interface Server {
  host: string;
  port: number;
  password: string;
  icon: string;
}
</script>
