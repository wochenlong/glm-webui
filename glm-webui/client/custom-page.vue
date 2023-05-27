<template>
  <div class="container">
    <div class="dialog">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <span class="username">{{ message.username }}：</span>
        <span class="content">{{ message.content }}</span>
      </div>
      <div class="input">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="请输入..."
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      newMessage: "",
      username: "用户",
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.messages.push({
          username: this.username,
          content: this.newMessage,
        });
        this.newMessage = "";
      }
    },
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.dialog {
  width: 100%;
  max-width: 400px;
  max-height: 500px;
  border: 1px solid #ccc;
  overflow-y: scroll;
  padding: 10px;
}

@media (min-width: 768px) {
  .dialog {
    width: 400px;
    height: 500px;
  }
}

.message {
  margin-bottom: 10px;
}

.username {
  font-weight: bold;
}

.input {
  margin-top: 10px;
}
</style>
