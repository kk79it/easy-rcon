import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: "" as string,
    servers: [
      {
        host: "211.2.1.176",
        port: 5223,
        password: "e0oKo2nn2139QcdWhVb7",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAv0lEQVQ4y4WSyw0CMQxE3S8cqYMOOHFCNEAJ9ITYrCbSRG9HRhwsx58Zf+I63T7jfP9OuTy3JbIVk8i+vrbxeI+pHZeUk0jit2OSDtwSUNiJu6BvEtCwdrIB9stmZ4sg52W7JMjqsiudrkwSVnQRSzGBrRsszWUyNgm66kz4N2LllgkmAUfliJVH5E13BN1CKx3UeQc5yuGQfhFlnDs7dJABfhvJs7PqzjerJ5j7qATnCefhcNnrGzuwCZicOcLt9+sX7289b1EAAAAASUVORK5CYII=",
      },
      {
        host: "localhost",
        port: 25566,
        password: "e0oKo2nn2139QcdWhVb7",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA0UlEQVR42nWSsQ1CMQxEvQ4rINFR0SOBxAgpaRgA/Q3YhelAF+mi9+/nF1YS2zn7zq7v+/H7tEu31/XYbea7nw6ruM/SRYlM0HtZluEzIO+KycporsI3qzGHeSW01tpwsJukkl0MAAcV0GdyJ6AKpa/cVlZyq9SG9yFicpR4TKDipOmzMjnH525m/g6QTp5uOT8zNt2D5J68SaVyPORsYPtJxVrVjBcraHSkwDH3TUxnguyZu1pRkD1v541wpjHb0MokKkz+WWgDkDtgkfbm7wJ/9oUoq3qXqFkAAAAASUVORK5CYII=",
      },
    ] as { host: string; port: number; password: string; icon: string }[],
    logs: {} as {
      [key: string]: {
        date: string;
        type:
          | "primary"
          | "secondary"
          | "accent"
          | "error"
          | "info"
          | "success"
          | "warning";
        text: string;
      }[];
    },
  },
  mutations: {
    setAuthenticated(state, authenticated: string) {
      state.authenticated = authenticated;
    },
  },
  actions: {},
  modules: {},
});
