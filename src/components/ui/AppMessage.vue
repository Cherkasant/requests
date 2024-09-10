<template>
  <div v-if="message" :class="['alert',message.type]">
    <p class="alert-title" v-if="title">{{ title }}</p>
    <p>{{ message.value }}</p>
    <span class="alert-close" @click.prevent="close">x</span>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "AppMessage",
  setup() {
    const store = useStore()
    const TITLE_MAP = {
      primary: 'Успешно',
      danger: 'Ошибка',
      warning: 'Внимание!'
    }
    const message = computed(() => {
      return store.state.message
    })
    const title = computed(() => {
      return message.value ? TITLE_MAP[message.value.type] : null
    })
    return {
      message, title, close: () => store.commit('clearMessage')
    }
  }
}
</script>

<style scoped>

</style>