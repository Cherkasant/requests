<template>
  <app-loader v-if="loading"></app-loader>
  <app-page back title="Заявка" v-else-if="request">
    <p><strong>Имя владельца : </strong>{{ request.fio }}</p>
    <p><strong>Телефон : </strong>{{ request.phone }}</p>
    <p><strong>Сумма : </strong>{{ currency(request.amount) }}</p>
    <p><strong>Статус :
      <app-status :type="request.status"></app-status>
    </strong></p>

    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button class="btn danger" @click="remove">Удалить</button>
    <button class="btn " @click="update" v-if="hasChanges">Обновить</button>
  </app-page>
  <h3 v-else class="text-center text-white">
    Заявки с {{ id }} нет
  </h3>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import AppStatus from "@/components/ui/AppStatus";
import AppLoader from "@/components/ui/AppLoader";
import {currency} from "@/utils/currency-formatter";

export default {
  name: "RequestView",
  components: {AppPage, AppStatus, AppLoader},
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const loading = ref(true)
    const request = ref({})
    const status = ref()

    onMounted(async () => {
      loading.value = true
      request.value = await store.dispatch('request/loadSingleRequest', route.params.id)
      status.value = request.value?.status
      loading.value = false
    })

    const hasChanges = computed(() => request.value.status !== status.value)

    const remove = async () => {
      await store.dispatch('request/remove', route.params.id)
      router.push('/')
    }
    const update = async () => {
      const data = {...request.value, status: status.value, id: route.params.id}
      await store.dispatch('request/update', data)
      request.value.status = status.value
    }

    return {
      loading, request, id: route.params.id, currency, remove, update, status, hasChanges
    }
  }
}
</script>

<style scoped>

</style>