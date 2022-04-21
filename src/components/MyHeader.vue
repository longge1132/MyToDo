<template>
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入待办事件"
      v-model="thing"
      @keyup.enter="addthing"
    />
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
export default {
  name: 'MyHeader',
  props: ['receiveTo'],
  data() {
    return {
      thing: '',
    }
  },
  methods: {
    addthing() {
      if (this.thing.trim().length === 0) return alert('请输入！')
      const todoObj = { id: nanoid(), thing: this.thing, done: false }
      this.$emit('receiveTo', todoObj)
      this.thing = ''
    },
  },
}
</script>

<style scoped>
/* header的样式 */
.todo-header > input {
  margin: 10px 10px;
  width: 560px;
  height: 34px;
  line-height: 34px;
  font-size: 16px;
  border: 2px solid #eee;
  outline: none;
  box-sizing: border-box;
}
.todo-header > input:focus {
  border-color: rgba(82, 168, 255, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 255, 0.6);
}
</style>
