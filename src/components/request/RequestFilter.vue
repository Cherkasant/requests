<template>
  <div class="filter">
    <div class="form-control">
      <input type="text" placeholder="Введите имя" v-model="name">
    </div>
    <div class="form-control">
      <input type="text" placeholder="Введите телефон" v-model="phoneNumber">
    </div>
    <div class="form-control">
      <input type="number" placeholder="Введите сумму" v-model="amount">
    </div>
    <div class="form-control">
      <select v-model="status">
        <option disabled selected>Выберите статус</option>
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>
    <button class="btn warning" v-if="isActive" @click="reset">Очистить</button>
  </div>
</template>

<script>
import {computed, ref, watch} from 'vue'

export default {
  emits: ['update:modelValue'],
  name: "RequestFilter",
  props: ['modelValue'],
  setup(_, {emit}) {
    const name = ref()
    const status = ref()
    const amount = ref()
    const phoneNumber = ref()

    watch([name, status, amount, phoneNumber], values => {
      emit('update:modelValue', {
        name: values[0],
        status: values[1],
        amount: values[2],
        phoneNumber: values[3]
      })
    })

    const isActive = computed(() => name.value || status.value || amount.value || phoneNumber.value)

    const reset = () => {
      name.value = ''
      status.value = null
      amount.value = null
      phoneNumber.value = null
    }

    return {
      name, status, isActive, reset, amount, phoneNumber
    }

  }
}
</script>

<style scoped>

</style>