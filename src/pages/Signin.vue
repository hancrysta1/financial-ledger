<template>
  <div class="login-container">
    <img src="../../src/assets/images/brocoli.png" alt="User Icon">
    <form @submit.prevent="loginHandler">
      <input type="text" v-model="id" placeholder="ID" required>
      <input type="password" v-model="password" placeholder="패스워드" required>
      <button type="submit">로그인</button>
    </form>
    <a href="#" @click="registerHandler">회원가입</a>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const id = ref('');
    const password = ref('');

    const loginHandler = () => {
      // 로그인 처리 로직
      console.log("ID:", id.value);
      console.log("Password:", password.value);
    };

    const registerHandler = () => {
      // 회원가입 페이지로 넘기기 
      console.log("회원가입 버튼 클릭됨");
    };

    return {
      id,
      password,
      loginHandler,
      registerHandler
    };
  }
};
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
}
.login-container {
  width: 400px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  margin: 0 auto;
} 
.login-container img {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}
.login-container input[type="text"],
.login-container input[type="password"] {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.login-container button {
  width: calc(100% - 20px);
  padding: 10px;
  background-color: rgb(255, 204, 0);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
}
.login-container a {
  display: block;
  margin-top: 20px;
  color: #777;
  text-decoration: none;
}
.login-container a:hover {
  text-decoration: underline;
}
</style>
