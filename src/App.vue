<template>
  <div id="app">
    <div class="container">
      <div class="todo-wrap">
        <MyHeader @receiveTo="receiveTo"></MyHeader>
        <MyList :todothings="todothings"></MyList>
        <MyFooter :todos="todothings" ref="footer"></MyFooter>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue'
import MyList from './components/MyList.vue'
import MyFooter from './components/MyFooter.vue'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyList,
    MyFooter,
  },
  data() {
    return {
      todothings: JSON.parse(localStorage.getItem('todos')) || [],
    }
  },
  mounted() {
    this.$refs.footer.$on('checkall', this.checkAll)
    this.$refs.footer.$on('clearall', this.clearAllTodo)
    this.$bus.$on('deleteTodo', this.deleteTodo)
    this.$bus.$on('checkTodo', this.checkTodo)
  },
  beforeDestroy() {
    this.$bus.$off(['deleteTodo', 'checkTodo'])
    this.$off()
  },
  methods: {
    // 添加一个todo
    receiveTo(todo) {
      //将新的数据加入到数组中
      this.todothings.unshift(todo)
    },
    //选择状态的改变
    checkTodo(id) {
      this.todothings.forEach((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done
        }
      })
    },
    //删除一个待办项
    deleteTodo(id) {
      this.todothings = this.todothings.filter((todo) => {
        return todo.id !== id
      })
    },
    //全选or全不选
    checkAll(value) {
      this.todothings.forEach((todo) => {
        todo.done = value ? true : false
      })
    },
    clearAllTodo() {
      this.todothings = this.todothings.filter((todo) => {
        return !todo.done
      })
    },
  },
  watch: {
    todothings: {
      deep: true,
      handler(value) {
        localStorage.setItem('todos', JSON.stringify(value))
      },
    },
  },
}
</script>

<style>
.body {
  background-color: #fff;
}
.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border-color: #ccc;
  box-shadow: inset 0 1px rgba(155, 155, 155, 0.2),
    0 1px 2px rgba(155, 155, 155, 0.2);
  border-radius: 5px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px soild #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.container {
  width: 600px;
  /* height: 400px; */
  margin: 0 auto;
  background-color: #eee;
}

.todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
