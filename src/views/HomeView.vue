<template>
  <app-loader v-if="loading"/>
  <app-page title="Список заявок" v-else>
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <request-filter v-model="filter"></request-filter>
    <request-table :requests="requests"></request-table>
    <teleport to="body">
      <app-modal v-if="modal" title="Создать заявку" @close="modal=false">
        <request-modal @created="modal = false"></request-modal>
      </app-modal>
    </teleport>
  </app-page>

</template>

<script>


import AppPage from "@/components/ui/AppPage";
import RequestTable from "@/components/request/RequestTable";
import {computed, onMounted, ref} from "vue";
import AppModal from "@/components/ui/AppModal";
import RequestModal from "@/components/request/RequestModal";
import {useStore} from "vuex";
import AppLoader from "@/components/ui/AppLoader";
import RequestFilter from "@/components/request/RequestFilter";

export default {
  emits: ['close', 'created'],
  name: 'HomeView',
  components: {AppPage, RequestTable, AppModal, RequestModal, AppLoader, RequestFilter},
  setup() {
    const store = useStore()
    const modal = ref(false)
    const filter = ref({})
    const requests = computed(() => {
      return store.getters['request/requests'].filter(request => {
        if (filter.value.name) {
          return request.fio.includes(filter.value.name)
        }
        return request
      }).filter(request => {
        if (filter.value.status) {
          return filter.value.status === request.status
        }
        return request
      }).filter(request => {
        if (filter.value.amount) {
          return filter.value.amount > request.amount
        }
        return request
      }).filter(request => {
        if (filter.value.phoneNumber) {
          return request.phone.includes(filter.value.phoneNumber)
        }
        return request
      })
    })
    const loading = ref(false)

    onMounted(async () => {
      loading.value = true
      await store.dispatch('request/loadRequests')
      loading.value = false
    })


    return {
      modal,
      close: () => modal.value = false,
      requests,
      loading, filter
    }
  }
}
</script>
