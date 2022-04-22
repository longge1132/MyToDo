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
  props: ['receiveTo', 'time'],
  data() {
    return {
      thing: '',
    }
  },
  methods: {
    addthing() {
      if (this.thing.trim().length === 0)
        return this.inputTips('输入不能为空哦！')
      if (this.thing.trim().length > 10)
        return this.inputTips('输入不能超过10个字符！')
      const todoObj = {
        id: nanoid(),
        thing: this.thing.trim(),
        done: false,
        level: 2,
        time: this.time,
        remark: '',
      }
      this.$emit('receiveTo', todoObj)
      this.thing = ''
    },
    inputTips(msg) {
      this.$bus.$emit('openMsgs', null, 'tip', msg)
    },
  },
}
</script>

<style scoped>
/* header的样式 */
.todo-header {
  width: 100%;
  padding: 2 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #666;
}
.todo-header > input {
  margin: 10px 0;
  width: 100%;
  height: 40px;
  line-height: 34px;
  font-size: 16px;
  border: 2px solid #eee;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
}
.todo-header > input:focus {
  border-color: rgba(82, 168, 255, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 255, 0.6);
}
</style>
