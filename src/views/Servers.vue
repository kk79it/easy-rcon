<template>
  <v-app id="inspire">
    <v-system-bar app></v-system-bar>

    <v-navigation-drawer
      floating
      hide-overlay
      app
      width="314"
      v-model="drawer.menu"
    >
      <v-layout fill-height>
        <v-navigation-drawer
          v-model="drawer.menu"
          color="grey lighten-3"
          width="64"
        >
          <router-link
            exact-active-class="selected"
            to="/servers"
            class="d-block ma-2"
          >
            <v-avatar>
              <v-img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA5UlEQVQ4y3WSsRKBQQyE79U0HkCp0ypUXgCVB1BQ01Kb0RqlR2L2Zr7MXkQR/9nNbTbJtdX9+jm8X2WI2z4fP7gwcdP9+tMEzG/nDngIm2yWIQTm51LAz7PjbhBYXE6dJ0cFml/SV0kkSgC7VV4IAJLsCS4ABx8tVP0xA7nI1RluF9DB+6JXquvrolSPLVTD8d5xQg4zihaUiCKD88lnEYSGd4CAX85tVVsZHHj1PDCse4FYIwIk5FXiRBwC4MND8gp5WH7BBWILXsUduQPn/Z00CHryXePKece7A/0oRCqq//9wxRe+g6xtVQyUhgAAAABJRU5ErkJggg=="
              ></v-img>
            </v-avatar>
          </router-link>
          <v-divider></v-divider>
          <template v-for="elem in servers">
            <router-link
              active-class="selected"
              :key="elem.id"
              :to="`/servers/${elem.id}`"
              class="d-block ma-2"
            >
              <v-avatar>
                <v-img :src="elem.icon"></v-img>
              </v-avatar>
            </router-link>
          </template>
        </v-navigation-drawer>
        <v-navigation-drawer
          v-model="drawer.menu"
          hide-overlay
          class="elevation-0"
          width="250"
        >
          <v-sheet color="grey lighten-5" height="128" width="100%"></v-sheet>

          <v-divider></v-divider>

          <v-list dense nav>
            <v-list-item
              v-for="item in itemsTab"
              :key="item.text"
              :to="item.to"
              link
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <template v-slot:append>
            <v-divider></v-divider>

            <v-container class="grey lighten-5" height="128" width="100%">
              <v-row>
                <v-col class="shrink">
                  <v-btn block color="secondary" @click="fetch()" outlined>
                    <v-icon>mdi-cog</v-icon>
                  </v-btn>
                </v-col>
                <template v-if="!authenticated">
                  <v-col class="grow">
                    <v-btn block color="success" @click="start()"
                      >Connect</v-btn
                    >
                  </v-col>
                </template>
                <template v-else>
                  <v-col class="grow">
                    <v-btn block color="error" outlined @click="stop()"
                      >Disconnect</v-btn
                    >
                  </v-col>
                </template>
              </v-row>
            </v-container>
          </template>
        </v-navigation-drawer>
      </v-layout>
    </v-navigation-drawer>

    <v-app-bar app clipped-right flat dense>
      <v-app-bar-nav-icon
        @click="drawer.menu = !drawer.menu"
      ></v-app-bar-nav-icon>

      <v-toolbar-title v-text="$route.path"></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="drawer.users = !drawer.users">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app clipped right v-model="drawer.users">
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
import store from "@/store";
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    drawer: {
      menu: null,
      users: null,
    },
    authenticated: false,
  }),

  props: {
    id: String,
  },

  computed: {
    itemsTab() {
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

    servers(): Server[] {
      return store.state.servers;
    },
  },
});

interface Server {
  id: string;
  host: string;
  port: number;
  password: string;
  icon: string;
}
</script>

<style scoped>
.selected {
  border-left: 8px white solid;
  margin-left: 0px !important;
}
</style>