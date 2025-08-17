<template>
  <span :class="['badge',className]">{{ text }}</span>
</template>

<script>
import {computed} from "vue";

export default {
  name: "AppStatus",
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['active', 'cancelled', 'done', 'pending'].includes(value)
      }
    }
  },
  setup(props) {

    const classesMap = {
      active: 'primary',
      cancelled: 'danger',
      done: 'primary',
      pending: 'warning'
    }

    const textMap = {
      active: 'Активен',
      cancelled: 'Отменен',
      done: 'Завершен',
      pending: 'Выполняется'
    }

    const className = computed(() => classesMap[props.type])
    const text = computed(() => textMap[props.type])

    return {
      className,
      text
    }
  }
}
</script>

<style scoped>

</style>