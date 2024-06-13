<template>
  <div class="profile-container" v-if="member">
    <img src="../assets/images/profile.png" alt="User Icon">
    <div class="profile-details">
      <div class="profile-item">
        <span class="label">ID</span>
        <span class="value id">{{ member.member_id }}</span>
      </div>
      <div class="profile-item">
        <span class="label">사용자명</span>
        <input type="text" v-model="member.member_name" class="value">
      </div>
      <div class="profile-item">
        <span class="label">패스워드</span>
        <input type="password" v-model="passwordInput" class="value"> 
      </div>
      <div class="profile-item">
        <span class="label">휴대폰 번호</span>
        <input type="text" v-model="member.phone_no" class="value">
      </div>
      <div class="profile-item">
        <span class="label">이메일</span>
        <input type="text" v-model="member.email" class="value">
      </div>
      <div class="profile-item">
        <span class="label">직장정보</span>
        <select v-model="member.status" class="value">
          <option value="Employee">Employee</option>
          <option value="Freelancer">Freelancer</option>
          <option value="Student">Student</option>
          <option value="Job seeker">Job seeker</option>
        </select>
      </div>
    </div>
    <button @click="handleSave">저장</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const member = ref(null);
    const passwordInput = ref(''); // 패스워드 입력 필드

    onMounted(() => {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (loggedInUser) {
        member.value = loggedInUser;
        passwordInput.value = '●'.repeat(loggedInUser.password.length);
      }
    });

    const handleSave = async () => {
      try {
        const updatedMember = { ...member.value };
        
        // Check if password is changed and update accordingly
        if (passwordInput.value !== '●'.repeat(member.value.password.length)) {
          updatedMember.password = passwordInput.value; // 변경된 패스워드 적용
        } else {
          updatedMember.password = member.value.password; // 기존 패스워드 유지
        }
        
        await axios.put(`http://localhost:3001/members/${updatedMember.member_id}`, updatedMember);
        localStorage.setItem('loggedInUser', JSON.stringify(updatedMember)); // 로컬 스토리지 업데이트
        alert('회원 정보가 성공적으로 업데이트되었습니다.');
      } catch (error) {
        console.error('Error updating member data:', error);
      }
    };

    return {
      member,
      passwordInput,
      handleSave
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

.profile-container {
  width: 400px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  margin:0 auto;
}

.profile-container img {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}

.profile-details {
  text-align: left;
  margin-bottom: 20px;
}

.profile-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
  margin-right: 10px;
}

.value {
  color: #555;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  max-width: 200px; /* 최대 너비 설정 */
}

.value.id {
  border: none;
}

button {
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #444;
}
</style>
