<template>
  <div class="sidebar-content" v-for="(comment,index) in comments" :key="comment.id">
    <div class="question-title"><strong>Сообщение №{{ index + 1 }}:</strong>{{ comment.message }}</div>
  </div>
</template>

<script>
export default {
  name: "QuestionMessages",
  props: ['comments']
}
</script>

<style scoped>

</style>