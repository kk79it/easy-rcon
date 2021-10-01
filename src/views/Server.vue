<template>
  <v-app id="inspire">
    <v-system-bar app></v-system-bar>

    <v-navigation-drawer v-model="drawer" app width="306" floating hide-overlay>
      <v-layout fill-height>
        <v-navigation-drawer
          v-model="drawer"
          mini-variant
          width="56"
          color="grey lighten-3"
        >
          <v-list>
            <v-list-item v-for="item in items" :key="item.title" link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-navigation-drawer
          v-model="drawer"
          width="250"
          hide-overlay
          class="elevation-0"
        >
          <v-container class="grey lighten-5" height="128" width="100%">
            <div>Connect:</div>
            <v-btn block color="success" @click="start()">connect</v-btn>
          </v-container>

          <v-divider></v-divider>

          <v-list dense nav>
            <v-list-item v-for="n in 7" :key="n" link>
              <v-list-item-icon>
                <v-icon>mdi-twitter</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>n</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-navigation-drawer>

    <v-app-bar app clipped-right flat dense>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="users = !users">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app clipped right v-model="users">
      <v-list>
        <v-list-item v-for="n in 5" :key="n" link>
          <v-list-item-avatar>
            <v-img
              src="https://crafatar.com/avatars/39c5460334fc4c8d987ce22ff13a740e"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Tasla</v-list-item-title>
            <v-list-item-subtitle
              >39c5460334fc4c8d987ce22ff13a740e</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container></v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { ipcRenderer } from "electron";

export default Vue.extend({
  data: () => ({
    drawer: null,
    users: null,
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard" },
      { title: "Photos", icon: "mdi-image" },
      { title: "About", icon: "mdi-help-box" },
    ],
    rcon: null,
  }),
  methods: {
    async start() {
      ipcRenderer.send("test");
    },
  },
});
</script>