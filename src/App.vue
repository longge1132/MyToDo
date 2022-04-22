<template>
  <div ref="app" class="bg3" id="app">
    <div class="container">
      <div class="todo-wrap">
        <MyHeader @receiveTo="receiveTo" :time="nowtime"></MyHeader>
        <MyList :todothings="todothings" :displayModes="displayMode"></MyList>
        <MyFooter :todos="todothings" ref="footer"></MyFooter>
      </div>
    </div>
    <div v-show="deleteSure" class="dilog">
      <UserMessage :todos="todothings" />
    </div>
    <div class="timeNow">
      <span>Time：{{ nowtime }}</span>
    </div>
    <div class="menu">
      <i @click="checkDisplay" class="iconfont icon-fangkuai"></i>
      <i @click="checkBG" class="iconfont icon-xingzhuang-tupian"></i>
    </div>
  </div>
</template>

<script>
import './assets/iconfont.css'
import MyHeader from './components/MyHeader.vue'
import MyList from './components/MyList.vue'
import MyFooter from './components/MyFooter.vue'
import UserMessage from './components/dialog/UserMessage.vue'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyList,
    MyFooter,
    UserMessage,
  },
  data() {
    return {
      todothings: JSON.parse(localStorage.getItem('todos')) || [],
      deleteSure: true,
      nowtime: '',
      displayMode: false,
      bg: 3,
    }
  },
  mounted() {
    this.$bus.$on('checkall', this.checkAll)
    this.$bus.$on('clearall', this.clearAllTodo)
    this.$bus.$on('deleteTodo', this.deleteTodo)
    this.$bus.$on('checkTodo', this.checkTodo)
    this.$bus.$on('changeTodoMark', this.changeTodo)
    this.$bus.$on('changeMark', this.changeMark)
    this.startTime()
  },
  beforeDestroy() {
    // this.$bus.$off(['deleteTodo', 'checkTodo'])
    this.$bus.$off()
  },
  methods: {
    //切换列表的显示格式
    checkDisplay() {
      this.displayMode = !this.displayMode
    },
    //改变背景图案
    checkBG() {
      // console.log('this.$ref.app :>> ', this.$refs.app.className)
      this.bg++
      if (this.bg > 3) {
        this.bg = 1
      }
      this.$refs.app.className = 'bg' + this.bg
    },
    // 添加一个todo
    receiveTo(todo) {
      //将新的数据加入到数组中
      this.todothings.unshift(todo)
      this.sortTodo()
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
    //改变一个选项的标记
    changeTodo(id, level) {
      this.todothings.forEach((todo) => {
        if (todo.id === id) {
          todo.level = level
        }
      })
      this.sortTodo()
    },
    //全选or全不选
    checkAll(value) {
      // console.log('checkout :>> ')
      this.todothings.forEach((todo) => {
        todo.done = value ? true : false
      })
    },
    clearAllTodo() {
      this.todothings = this.todothings.filter((todo) => {
        return !todo.done
      })
    },
    changeMark(id, value) {
      this.todothings.forEach((todo) => {
        if (todo.id === id) {
          todo.remark = value
        }
      })
    },
    checkTime(i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    },
    //按照重要程度排序
    sortTodo() {
      this.todothings.sort((a, b) => {
        return parseInt(a.level) - parseInt(b.level)
      })
    },
    //记录时间
    startTime() {
      let today = new Date()
      let h = today.getHours()
      let m = today.getMinutes()
      let s = today.getSeconds() // 在小于10的数字钱前加一个‘0’
      m = this.checkTime(m)
      s = this.checkTime(s)
      this.nowtime = h + ':' + m + ':' + s
      setTimeout(() => {
        this.startTime()
      }, 500)
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
body {
  background-color: black;
}

.menu {
  position: relative;
  width: 30px;
  left: 620px;
  display: flex;
  flex-direction: column;
}

.iconfont {
  font-size: 30px;
  margin: 5px 0;
}

.iconfont:hover {
  cursor: pointer;
  color: azure;
}

#app {
  width: 1200px;
  height: 750px;
  background-color: black;
  background-size: 100% 100%;
  margin: auto;
  position: relative;
}
.bg1 {
  background: url('./assets/zp1.jpg') no-repeat 0 0 transparent;
}
.bg2 {
  background: url('./assets/zp2.jpg') no-repeat 0 0 transparent;
}
.bg3 {
  background: url('./assets/beijing1.png') no-repeat 0 0 transparent;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-top: 2px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border-color: lightcoral;
  /* box-shadow: inset 0 1px rgba(155, 155, 155, 0.2),
    0 1px 2px rgba(155, 155, 155, 0.2); */
  border-radius: 5px;
  box-sizing: border-box;
}

.btn-danger {
  color: #fff;
  background-color: rgb(223, 85, 61);
  border: 2px soild #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.container {
  width: 550px;
  height: 100%;
  float: right;
  /* margin: 0 auto; */
  background-color: transparent;
  border: 1px solid rgba(129, 177, 226, 0.2);
  box-sizing: border-box;
  padding: 10px;
}

.todo-wrap {
  padding: 10px;
  border: 2px solid rgba(131, 203, 228, 0.6);
  border-radius: 5px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.timeNow {
  /* background-color: aqua; */
  font-size: 50px;
  color: rgba(246, 249, 250, 0.6);
  position: fixed;
  top: 20px;
  left: 30%;
  transform: translateX(-50%);
}
/* 确认的消息框 */
/* .dilog {
  display: none;
} */
</style>
