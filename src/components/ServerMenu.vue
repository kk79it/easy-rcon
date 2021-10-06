<template>
  <v-navigation-drawer hide-overlay class="elevation-0" width="250" permanent>
    <v-sheet color="grey lighten-5" height="128" width="100%"></v-sheet>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in itemsTab" :key="item.text" :to="item.to" link>
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
          <template v-if="authenticated !== id">
            <v-col class="grow">
              <v-btn block color="success" @click="connect()">Connect</v-btn>
            </v-col>
          </template>
          <template v-else>
            <v-col class="grow">
              <v-btn block color="error" outlined @click="disconnect()"
                >Disconnect</v-btn
              >
            </v-col>
          </template>
        </v-row>
      </v-container>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import store from "@/store";
import { ipcRenderer, IpcRendererEvent } from "electron";
import { RconOptions } from "rcon-client/lib";
import Vue from "vue";

export default Vue.extend({
  props: {
    id: String,
  },

  methods: {
    connect() {
      let details = this.details;
      if (details) {
        ipcRenderer.send("connect", details);
      }
    },

    disconnect() {
      ipcRenderer.send("disconnect");
      store.commit("setAuthenticated", "");
    },
  },

  computed: {
    itemsTab(): any {
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

    details(): Serv | undefined {
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

    authenticated(): string {
      return store.state.authenticated;
    },
  },

  created() {
    ipcRenderer.on(
      "connection_already",
      (_event: IpcRendererEvent, options: RconOptions) => {
        console.log("connection_already");
        console.log(options);
        store.commit("setAuthenticated", `${options.host}:${options.port}`);
      }
    );
    ipcRenderer.on(
      "connection_error",
      (_event: IpcRendererEvent, options: any) => {
        console.log("connection_error");
        console.log(options);

        store.commit("setAuthenticated", "");
      }
    );
    ipcRenderer.on(
      "connection_success",
      (_event: IpcRendererEvent, options: RconOptions) => {
        console.log("connection_success");
        store.commit("setAuthenticated", `${options.host}:${options.port}`);
      }
    );
  },
});

interface Serv {
  host: string;
  port: number;
  password: string;
  icon: string;
}
</script>