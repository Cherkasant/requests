<template>
  <div class="sidebar" v-if="sidebar">
    <span class="sidebar-close" @click.prevent="close">x</span>
    <QuestionMessages :comments="comments"></QuestionMessages>
    <button class="btn primary" @click="modal = true">Add message</button>
  </div>
  <teleport to="body">
    <app-modal v-if="modal" title="Создать сообщение" @close="modal = false">
      <question-modal @created="modal = false"></question-modal>
    </app-modal>
  </teleport>
</template>

<script>
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import AppModal from "@/components/ui/AppModal";
import QuestionModal from "@/components/questions/QuestionModal";
import QuestionMessages from "@/components/questions/QuestionMessages";

export default {
  emits: ['created'
  ],
  name: "TheSidebar",
  setup() {
    const store = useStore()

    onMounted(async () => {
      await store.dispatch('messages/loadComments')
    })


    const comments = computed(() => {
      return store.getters['messages/comments']
    })
    console.log(comments)


    const modal = ref(false)
    const sidebar = computed(() => {
      return store.state.sidebar
    })
    return {
      modal,
      sidebar,
      close: () => store.commit('closeSidebar'),
      comments
    }
  },
  components: {AppModal, QuestionModal, QuestionMessages}
}
</script>

<style scoped>

</style>