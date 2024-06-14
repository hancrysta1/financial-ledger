<template>
  <div class="login-container">
    <img src="../../src/assets/images/brocoli.png" alt="User Icon">
    <form @submit.prevent="loginHandler">
      <input type="text" v-model="id" placeholder="ID" required>
      <input type="password" v-model="password" placeholder="패스워드" required>
      <button type="submit">로그인</button>
    </form>
    <a href="#" @click="registerHandler">회원가입</a>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const id = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const router = useRouter();

    const loginHandler = async () => {
      try {
        const response = await axios.get('http://localhost:3001/members');
        const members = response.data;
        const member = members.find(m => m.member_id === parseInt(id.value) && m.password === password.value);

        if (member) {
          alert('로그인 성공');
          localStorage.setItem('loggedInUser', JSON.stringify(member));
          router.push({ name: 'Home' });
        } else {
          errorMessage.value = '잘못 입력하셨습니다. 다시 시도하세요.';
        }
      } catch (error) {
        console.error('Error fetching member data:', error);
        errorMessage.value = '서버 오류가 발생했습니다. 나중에 다시 시도하세요.';
      }
    };

    const registerHandler = () => {
      console.log("회원가입 버튼 클릭됨");
    };

    return {
      id,
      password,
      errorMessage,
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
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
