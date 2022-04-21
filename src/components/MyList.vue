<template>
  <ul class="todo-list">
    <p v-show="!todothings.length">空空如也</p>
    <MyItems v-for="item in todothings" :key="item.id" :todo="item"></MyItems>
  </ul>
</template>

<script>
import MyItems from './MyItems.vue'

export default {
  name: 'MyList',
  components: { MyItems },
  props: ['todothings'],
  methods: {},
}
</script>

<style scoped>
/* list的样式 */
.todo-list {
  margin-left: 0;
  border: 1px solid rgb(169, 215, 245);
  border-radius: 2px;
  padding: 0;
  height: 81%;
  overflow: auto;
}

.todo-list p {
  font-size: 30px;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: whitesmoke;
}
</style>
