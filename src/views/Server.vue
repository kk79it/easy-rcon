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
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-image</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-help-box</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-navigation-drawer
          v-model="drawer"
          width="250"
          hide-overlay
          class="elevation-0"
        >
          <v-sheet color="grey lighten-5" height="128" width="100%"></v-sheet>

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
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="users = !users">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app clipped right v-model="users">
      <v-list>
        <v-list-item v-for="([name, uuid, icon], n) in players" :key="n" link>
          <v-list-item-avatar>
            <v-img :src="icon"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="name"></v-list-item-title>
            <v-list-item-subtitle v-text="uuid"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="fill-height">
        <v-row class="fill-height" align="end">
          <v-col>
            <v-alert
              v-for="([style, req, res, date], i) in messages"
              :key="i"
              :color="style.color"
              dense
              border="left"
              elevation="2"
              colored-border
              class="mx-4"
            >
              <code
                class="font-code"
                v-text="
                  `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]: ${req}`
                "
              ></code>

              <pre class="font-code mt-2 pa-1 rounded-sm" v-text="res"></pre>
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
      <v-footer app color="white" class="pt-0" inset>
        <v-container class="px-0 pt-0">
          <v-form @submit.prevent="send()">
            <v-text-field
              background-color="grey lighten-2"
              dense
              flat
              hide-details
              solo
              clearable
              append-icon="mdi-send"
              @click:append="send()"
              label="Send a command"
              v-model="command"
              :disabled="!authenticated"
            ></v-text-field>
          </v-form>
        </v-container>
      </v-footer>
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
    authenticated: false,
    command: "",
    messages: [] as any[],
    players: [] as any[],
  }),
  methods: {
    async start() {
      this.authenticated = await ipcRenderer.invoke("start", {
        host: "localhost",
        port: 25566,
        password: "2213",
      });
      if (this.authenticated) {
        this.messages.push([
          { color: "yellow" },
          "System",
          "Started Connection",
          new Date(),
        ]);
        await this.fetch();
      } else {
        this.messages.push([
          { color: "error" },
          "System",
          "Connection closed",
          new Date(),
        ]);
      }
    },

    async stop() {
      this.authenticated = await ipcRenderer.invoke("stop");
      if (!this.authenticated) {
        this.messages.push([
          { color: "red" },
          "System",
          "Connection closed",
          new Date(),
        ]);
      } else {
        this.messages.push([
          { color: "red" },
          "System",
          "Invaild connection closed",
          new Date(),
        ]);
        this.authenticated = false;
      }
    },

    async send() {
      if (!this.authenticated) return;
      let res = await ipcRenderer.invoke("send", this.command);
      this.messages.push([
        { color: "cyan" },
        this.command,
        res.message.replace(/§./g, ""),
        new Date(),
      ]);
      this.command = "";
    },

    async fetch() {
      let res = await ipcRenderer.invoke("send", "list");
      this.players = getPlayers(res.message);
    },
  },

  watch: {
    messages() {
      this.$vuetify.goTo(document.body.scrollHeight, { duration: 0 });
      console.log(document.body.scrollHeight);
    },
  },
});

function getPlayers(res: string): any[] {
  let players: any[] = [];
  if (!~res.indexOf(": ")) return players;
  res
    .split(": ")[1]
    .split(", ")
    .forEach(async (name: string) => {
      let uuid = await ipcRenderer.invoke("fetch", name);
      if (uuid) {
        players.push([name, uuid, `https://crafatar.com/avatars/${uuid}`]);
      }
    });
  return players;
}
</script>
