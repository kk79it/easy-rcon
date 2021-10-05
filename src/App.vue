<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/servers">Servers</router-link>
    <router-link to="/servers/31425342">Servers/31425342</router-link>
    <router-link to="/servers/sakana_oniku/console"
      >Servers/31425342/console</router-link
    >
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@500&display=swap");

.font-code {
  font-family: "Source Code Pro", monospace;
}

::-webkit-scrollbar {
  display: none;
}
</style>
