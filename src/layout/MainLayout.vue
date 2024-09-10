<template>
  <TheNavBar></TheNavBar>
  <the-sidebar></the-sidebar>
  <div class="container with-nav">
    <AppMessage></AppMessage>
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavBar from "@/components/TheNavBar";
import AppMessage from "@/components/ui/AppMessage";
import TheSidebar from "@/components/TheSidebar";

export default {
  name: "MainLayout",
  components: {
    TheNavBar, AppMessage, TheSidebar
  }
}
</script>

<style scoped>

</style>