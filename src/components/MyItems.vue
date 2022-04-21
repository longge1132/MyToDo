<template>
  <li>
    <label>
      <input
        type="checkbox"
        :checked="todo.done"
        @change="changeDone(todo.id)"
      />
      <span ref="tetle" :class="computedClass">
        {{ todo.thing }}
      </span>
    </label>

    <button class="btn btn-danger" @click="deleteTo(todo.id)">删除</button>
    <button class="btn btn-mark" @click="markTo(todo.id)">标记</button>
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
      // this.deleteTodo(id)
      //利用全局事件总线来触发
      this.$bus.$emit('openMsgs', id, 'single', '确认删除此任务？')
    },
    markTo(id) {
      this.$bus.$emit('openMsgs', id, 'mark', null)
    },
  },
  watch: {
    todo: {
      deep: true,
      handler() {
        this.$refs.tetle.className = this.todo.done ? 'isDone' : ''
      },
    },
  },
  computed: {
    computedClass() {
      let classlist = this.todo.done ? 'isDone ' : ''
      switch (this.todo.level) {
        case 1:
          classlist += 'level1'
          break
        case 3:
          classlist += 'level3'
          break
        default:
          classlist += 'level2'
          break
      }
      return classlist
    },
  },
}
</script>

<style scoped>
li {
  list-style: none;
  height: 42px;
  line-height: 42px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li span {
  font-family: 'Times New Roman', Times, serif;
  font-weight: bolder;
  font-size: 20px;
  color: rgb(57, 144, 194);
}

.isDone {
  text-decoration: line-through;
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

/* li:last-child {
  border-bottom: none;
} */
li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
.btn-mark {
  background-color: lightblue;
  border: 2px solid lightskyblue;
  margin: 3px 7px;
  color: white;
}
.btn-mark:hover {
  background-color: lightskyblue;
}
.level1 {
  color: rgb(219, 94, 94);
}
.level2 {
  color: rgb(57, 144, 194);
}
.level3 {
  color: rgb(161, 157, 157);
}
</style>
