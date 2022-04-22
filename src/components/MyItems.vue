<template>
  <li :class="displayMo">
    <label>
      <input
        type="checkbox"
        :checked="todo.done"
        @change="changeDone(todo.id)"
      />
      <span ref="tetle" :class="computedClass">
        {{ todo.thing }}
        <i :class="levelClass">{{ Tolevel }}</i>
      </span>
    </label>
    <div class="moretext">
      <p>
        记录时间:
        <span>{{ todo.time }}</span>
      </p>
      <p>备注：</p>
      <textarea
        cols="16"
        rows="2"
        :placeholder="todo.remark"
        @change="changeRemark(todo.id, $event)"
      ></textarea>
    </div>
    <div class="btn-w">
      <button class="btn btn-mark" @click="deleteTo(todo.id)">
        删除
      </button>
      <button class="btn btn-mark" @click="markTo(todo.id)">标记</button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'MyItems',
  props: ['todo', 'mode'],
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
    changeRemark(id, e) {
      this.$bus.$emit('changeMark', id, e.target.value)
      // console.log('level :>> ', this.computedClass)
    },
  },
  // watch: {
  //   todo: {
  //     deep: true,
  //     handler() {
  //       this.$refs.tetle.className = this.todo.done ? 'isDone' : ''
  //     },
  //   },
  // },
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
    displayMo() {
      return this.mode === 'block' ? 'li-flex' : 'li-list'
    },
    Tolevel() {
      switch (this.todo.level) {
        case 1:
          return '必须完成 #_#'
        case 2:
          return '尽力去做 ^_^'
        default:
          return '下次一定 *_<'
      }
    },
    levelClass() {
      switch (this.todo.level) {
        case 1:
          return 'level1'
        case 2:
          return 'level2'
        default:
          return 'level3'
      }
    },
  },
}
</script>

<style lang="less" scoped>
.li-list {
  list-style: none;
  height: 42px;
  line-height: 42px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
  label {
    float: left;
  }
  button {
    float: right;
    display: none;
  }
  .moretext {
    display: none;
  }
  i {
    right: 30%;
  }
  span {
    font-family: 'Times New Roman', Times, serif;
    font-weight: bolder;
    font-size: 20px;
    // color: rgb(57, 144, 194);
  }
}

.clearfix::after {
  content: '';
  display: block;
  clear: both;
}

.moretext {
  text-align: center;
  p {
    font-size: 14px;
    height: 18px;
    line-height: 18px;
    text-align: left;
  }
}

li:hover button {
  display: block;
}

.li-flex {
  list-style: none;
  height: 180px;
  /* line-height: 42px; */
  /* width: 140px; */
  padding: 4px;
  margin: 1px 2px;
  border: 2px solid #ddd;
  display: flex;
  flex-flow: column wrap;
  flex: 0 1 30%;
  .btn-w {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
  }
  button {
    display: block;
  }
  .moretext {
    margin: 2px 5px;
    display: block;
    p {
      margin: 12px 3px 5px 3px;
      color: rgb(192, 88, 105);
      span {
        display: inline-block;
        color: lightskyblue;
      }
    }
    textarea {
      background: #f8f8f8;
      border: 1px solid lightblue;
      outline: none;
      cursor: text;
      font-family: 'arial';
      padding: 1px;
    }
  }
  input {
    margin-left: 10px;
  }
  span {
    display: block;
    text-align: center;
    margin-top: 5px;
    font-family: 'Times New Roman', Times, serif;
    font-weight: bolder;
    font-size: 14px;
    margin: 10px 0;
  }
  label {
    height: 30px;
    position: relative;
  }
  i {
    right: 20px;
    bottom: 10px;
    font-size: 10px;
    border: 1px solid #666;
  }
}

i {
  position: absolute;
  font-size: 8px;
  color: rgb(230, 115, 115);
  font-style: normal;
  font-weight: 400;
  display: inline-block;
}

li label {
  cursor: pointer;
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

li::before {
  content: initial;
}

/* li:last-child {
  border-bottom: none;
} */
li:hover {
  background-color: #ddd;
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
  color: rgb(140, 177, 92);
}
</style>
