<template>
  <div class="profile-container" v-if="member">
    <img src="../assets/images/profile.png" alt="User Icon">
    <div class="profile-details">
      <div class="profile-item">
        <span class="label">ID</span>
        <span class="value">{{ member.member_id }}</span>
      </div>
      <div class="profile-item">
        <span class="label">사용자명</span>
        <span class="value">{{ member.member_name }}</span>
      </div>
      <div class="profile-item">
        <span class="label">패스워드</span>
        <span class="value">{{ maskedPassword }}</span> <!-- 패스워드 마스킹 처리 -->
      </div>
      <div class="profile-item">
        <span class="label">휴대폰 번호</span>
        <span class="value">{{ member.phone_no }}</span>
      </div>
      <div class="profile-item">
        <span class="label">직장정보</span>
        <span class="value">{{ member.status }}</span>
      </div>
    </div>
    <button @click="handleEdit">수정</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const member = ref(null);
    const maskedPassword = ref('');

    const fetchMemberData = async () => {
      try {
        const memberId = 1; // 테스트를 위해 id값이 1인 멤버값 출력하도록 설정, 추후에 변경 예정
        const response = await axios.get(`http://localhost:3001/members/${memberId}`);
        member.value = response.data;
        if (member.value && member.value.password) {
          maskedPassword.value = '●'.repeat(member.value.password.length); // 패스워드 마스킹
        }
      } catch (error) {
        console.error('Error fetching member data:', error);
      }
    };

    const handleEdit = () => {
      // 수정 버튼 클릭 시 처리 로직을 여기에 추가하세요
      console.log("수정 버튼 클릭됨");
    };

    onMounted(fetchMemberData);

    return {
      member,
      maskedPassword,
      handleEdit
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
