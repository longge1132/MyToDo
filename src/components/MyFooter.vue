<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{ doneNum }}</span>
      / 全部{{ total }}
    </span>
    <button class="btn btn-danger" @click="cleartodo">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: 'MyFooter',
  props: ['todos', 'clearall'],
  data() {
    return {
      name: 'jack',
    }
  },
  methods: {
    cleartodo() {
      this.$bus.$emit('openMsgs', null, 'all', '确认删除全部已完成任务？？')
    },
  },
  computed: {
    total() {
      return this.todos.length
    },
    doneNum() {
      return this.todos.reduce((sum, item) => {
        return sum + (item.done === true)
      }, 0)
    },
    isAll: {
      get() {
        return this.total === this.doneNum && this.total !== 0
      },
      set(value) {
        //第一种是 父给子组件传递一个函数， 子组件在props中接收， 然后this调用来触发。
        // this.checkall(value)
        // 第二种是自定义事件， 父组件上用@checkall 或 v-on绑定，  子组件emit触发， 或者用$ref 。$on 来绑定
        console.log('value :>> ', value)
        this.$bus.$emit('checkall', value)
      },
    },
  },
}
</script>

<style scoped>
/* footer 的样式*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  /* position: absolute; */
  width: 100%;
  border-top: 2px solid #ddd;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}
.todo-footer label input {
  position: relative;
  cursor: pointer;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
  /* margin-right: 30px; */
}
</style>
