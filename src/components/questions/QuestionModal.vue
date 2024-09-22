<template>
  <form @submit="onSubmit">
    <div class="form-control">
      <label for="message">Введите новое сообщение</label>
      <input type="text" id="message" v-model="message" @blur="messageBlur" placeholder="Введите сообщение">
      <small v-if="messageError">{{ messageError }}</small>
    </div>
    <button class="btn primary" :disabled="isSubmitting">Отправить</button>
  </form>
</template>

<script>
import {useCommentForm} from "@/use/comment-form";
import {useStore} from "vuex";


export default {
  name: "QuestionModal",
  setup(_, {emit}) {
    const store = useStore()

    const submit = async (values) => {
      await store.dispatch('messages/create', values)
      emit('created')
    }
    return {...useCommentForm(submit)}
  }
}
</script>

<style scoped>

</style>