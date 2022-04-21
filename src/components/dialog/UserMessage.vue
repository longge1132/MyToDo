<template>
  <div v-show="openMsg" @click="colseMsg2" class="message">
    <div v-show="openMsgDelete" class="modal-content">
      <span @click="colseMsg" class="close">&times;</span>
      <p>{{ msg }}</p>
      <div class="btn-wrap">
        <button class="sureBtn" @click="colseMsg">取消</button>
        <button class="sureBtn" @click="deleteMsg">删除</button>
      </div>
    </div>
    <div v-show="openMsgMark" style="height: 160px;" class="modal-content">
      <span @click="colseMsg" class="close">&times;</span>
      <p style="font-size: 12px;">您认为这件事：</p>
      <div class="choose-btn" @click="checkActive" ref="choosebtn">
        <button class="mark-btn choose1">必须完成！</button>
        <button class="mark-btn choose2">争取完成~</button>
        <button class="mark-btn choose3">下次一定？</button>
      </div>
      <div class="btn-wrap">
        <button class="sureBtn" @click="colseMsg">取消</button>
        <button class="sureBtn" @click="changeMark">确认</button>
      </div>
    </div>
    <div v-show="openMsgTips" class="modal-content">
      <span @click="colseMsg" class="close">&times;</span>
      <p>{{ msg }}</p>
      <div class="btn-wrap">
        <button class="sureBtn" @click="colseMsg">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserMessage',
  data() {
    return {
      //控制弹出窗口的数据
      openMsg: false,
      openMsgDelete: false,
      openMsgMark: false,
      openMsgTips: false,
      msg: '',
      todoId: '',
      type: '',
      //选择choose mark
      active: 2,
    }
  },
  mounted() {
    this.$bus.$on('openMsgs', this.openMsgs)
  },
  methods: {
    //绑定事件， 打开弹框
    openMsgs(id, type, msg) {
      this.openMsg = true
      this.todoId = id
      this.type = type
      this.msg = msg
      if (type === 'all' || type === 'single') {
        this.openMsgDelete = true
      } else if (type === 'mark') {
        this.openMsgMark = true
      } else {
        this.openMsgTips = true
      }
    },
    colseMsg() {
      this.openMsg = false
      this.todoId = ''
      this.type = ''
      this.msg = 'msg'
      this.openMsgDelete = false
      this.openMsgMark = false
      this.openMsgTips = false
    },
    //点击空白处， 也同样关闭窗口
    colseMsg2(e) {
      if (e.target.className === 'message') {
        this.colseMsg()
      }
    },
    deleteMsg() {
      if (this.type === 'all') {
        this.$bus.$emit('clearall')
      } else if (this.type === 'single') {
        this.$bus.$emit('deleteTodo', this.todoId)
      }

      this.colseMsg()
    },
    checkActive(e) {
      // console.log('this.$refs.choosebtn :>> ', this.$refs.choosebtn.children)
      // console.log('e.target :>> ', e.target)
      for (let btn of this.$refs.choosebtn.children) {
        btn.className = btn.className.split(' ').slice(0, 2).join(' ')
      }
      e.target.className = e.target.className + ' active'
      this.active = parseInt(e.target.className.split('choose')[1][0])
      // console.log('this.active :>> ', this.active)
    },
    changeMark() {
      this.$bus.$emit('changeTodoMark', this.todoId, this.active)
      this.colseMsg()
    },
  },
}
</script>

<style scoped>
.message {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  height: 130px;
  width: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: aliceblue;
  padding: 20px;
  border: 1px solid gray;
}

.modal-content p {
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
}
.close {
  font-size: 30px;
  float: right;
  margin-top: -20px;
  margin-right: -10px;
  color: #aaa;
  font-weight: bolder;
}

.close:hover,
.close:focus {
  cursor: pointer;
  color: black;
  text-decoration: none;
}

.btn-wrap {
  margin-top: 20px;
}
.sureBtn {
  float: right;
  padding: 4px 12px;
  margin: 20px 6px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
}
.choose-btn {
  display: flex;
  justify-content: space-between;
}
.mark-btn {
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  background-color: lightblue;
  border: 2px solid lightskyblue;
  text-align: center;
  vertical-align: middle;
  color: white;
  border-radius: 3px;
  cursor: pointer;
}

.choose1 {
  background-color: tomato;
  border: 2px solid rgb(245, 70, 39);
}
.choose1:hover {
  background-color: rgb(245, 70, 39);
}

.choose2 {
  background-color: lightblue;
  border: 2px solid lightskyblue;
}
.choose2:hover {
  background-color: lightskyblue;
}

.choose3 {
  background-color: lightgray;
  border: 2px solid gray;
}
.choose3:hover {
  background-color: gray;
}

.active {
  border: 3px solid green;
  color: aliceblue;
}
</style>
