<template>
  <v-navigation-drawer hide-overlay class="elevation-0" width="250">
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
          <template v-if="!authenticated">
            <v-col class="grow">
              <v-btn block color="success" @click="start()">Connect</v-btn>
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
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
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
  },
});
</script>