<template>
  <v-navigation-drawer
    :app="absolute"
    color="grey lighten-3"
    width="64"
    permanent
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
        :to="`/servers/${elem.host}:${elem.port}`"
        class="d-block ma-2"
      >
        <v-avatar>
          <v-img :src="elem.icon"></v-img>
        </v-avatar>
      </router-link>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";

export default Vue.extend({
  props: {
    absolute: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    servers() {
      return store.state.servers;
    },
  },
});
</script>

<style scoped>
.selected {
  border-left: 8px white solid;
  margin-left: 0px !important;
}
</style>