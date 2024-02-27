<template>
  <div class="flex flex-col font-Roboto bg-main border-2 overflow-hidden">
    <Header />
    <Body />
    <RouterView />
  </div>
</template>

<script setup>
  import { RouterView } from "vue-router";
  import Header from "./components/Header.vue";
  import Body from "./components/Body.vue";
</script>

<style lang="scss" scoped></style>
