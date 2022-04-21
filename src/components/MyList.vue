<template>
  <ul class="todo-list">
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
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0;
}

.to-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 2px;
}
</style>
