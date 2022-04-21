<template>
  <li>
    <label>
      <input
        type="checkbox"
        :checked="todo.done"
        @change="changeDone(todo.id)"
      />
      <span>{{ todo.thing }}</span>
    </label>
    <button class="btn btn-danger" @click="deleteTo(todo.id)">删除</button>
  </li>
</template>

<script>
export default {
  name: 'MyItems',
  props: ['todo'],
  data() {
    return {}
  },
  methods: {
    changeDone(id) {
      this.$bus.$emit('checkTodo', id)
    },
    deleteTo(id) {
      if (confirm('确认删除？')) {
        // this.deleteTodo(id)
        //利用全局事件总线来触发
        this.$bus.$emit('deleteTodo', id)
      }
    },
  },
}
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
  cursor: pointer;
}

li button {
  float: right;
  display: none;
}

li::before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>
