<template>
  <div
    class="container"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div class="title">ChatGlm</div>
    <div class="dialog">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <span class="username">{{ message.username }}</span>
        <span class="content">{{ message.content }}</span>
      </div>
      <div class="input">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="请输入..."
          :style="inputStyle"
        />
      </div>
    </div>
    <div class="buttons">
      <button @click="clearMessages">D</button>
      <button @click="changeFontColor">A</button>
      <button @click="increaseFontSize">+</button>
      <button @click="decreaseFontSize">-</button>
      <!-- 添加清理聊天记录按钮 -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      messages: [],
      newMessage: "",
      username: "用户",
      backgroundImage: "https://picsum.photos/800/600",
      fontSize: 16,
      fontColor: "white",
    };
  },

  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        let messageContent = this.newMessage;
        if (messageContent === "每日一句") {
          axios
            .get("https://v.api.aa1.cn/api/yiyan/index.php")
            .then((response) => {
              let dailySentence = response.data.replace(/<\/?p>/g, "");
              this.messages.push({
                username: "ChatGlm",
                content: dailySentence,
              });
            });
        } else {
          this.messages.push({
            username:
              this.username.trim() === "" ? "匿名用户" : this.username.trim(),
            content: messageContent,
          });
        }
        this.newMessage = "";

        // 将新消息滚动到底部
        this.$nextTick(() => {
          let messageList = this.$el.querySelector(".message-list");
          messageList.scrollTop = messageList.scrollHeight;
        });
      }
    },

    increaseFontSize() {
      this.fontSize++;
    },

    decreaseFontSize() {
      this.fontSize--;
    },

    changeFontColor() {
      this.fontColor = this.fontColor === "white" ? "black" : "white";
    },

    clearMessages() {
      this.messages = [];
    },
  },

  computed: {
    inputStyle() {
      return {
        fontSize: `${this.fontSize}px`,
        color: this.fontColor,
      };
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
  position: relative;
  width: 100%;
}
.dialog {
  width: 150%;
  max-width: 800px;
  max-height: 1000px;
  border: 1px solid #ccc;
  overflow-y: scroll;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  margin-top: 20px;
}
@media (min-width: 768px) {
  .dialog {
    width: 100%; /* 在屏幕宽度大于等于768px时，将宽度设置为100% */
    height: 500px;
  }
}
.message {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.username {
  font-weight: bold;
  margin-right: 5px;
}
.content {
  margin-left: 5px;
}
.input {
  margin-top: 20px;
  width: 100%; /* 将输入框的宽度设置为100% */
}
.input {
  margin-top: 20px;
  width: 100%;
}

.input button:hover {
  background-color: #0062cc;
}
.buttons {
  position: absolute;
  top: 10px;
  right: 10px;
}
.buttons button {
  background-color: #ccc;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-left: 5px;
  border-radius: 50%;
}
.title {
  font-size: 24px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  max-width: calc(100% - 20px); /* 设置最大宽度为对话框宽度减去两侧的边距 */
}
</style>
