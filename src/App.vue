<template>
  <component :is="layoutComponent" v-if="layoutComponent"/>
</template>

<script>
import MainLayout from "@/layout/MainLayout";
import AuthLayout from "@/layout/AuthLayout";
import {useRoute} from "vue-router";
import {computed} from "vue";


export default {
  setup() {
    const route = useRoute()

    return {
      layoutComponent: computed(() =>
          route.meta.layout === 'auth' ? AuthLayout : MainLayout
      )
    }
  },
  components: {MainLayout, AuthLayout}
}
</script>

<style lang="scss">


</style>
