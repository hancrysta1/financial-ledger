<template>
    <div class="mx-3 my-3">
        <h1>내역 수정</h1>
        <form class="create" @submit.prevent="updateSubmitHandler">
            <div class="mb-3 mt-3">
                <label for="deatil" class="form-label display-7">거래명</label>
                <input type="text" class="form-control" id="deatil" placeholder="거래명을 입력하세요" required
                        v-model="trading.deatil">
            </div>
            <div class="mb-3">
                <label for="category" class="form-label">카테고리</label>
                <input type="text" class="form-control" id="category" placeholder="카테고리를 입력하세요" required
                        v-model="trading.category">
            </div>
            <div class="mb-3">
                <label for="date" class="form-label">날짜 선택</label>
                <!-- <Datepicker v-model="trading.date" /> -->  <!-- TODO: <b-form-datepicker>로 변경 예정 -->
            </div>
            <div class="mb-3">
                <div class="d-flex ">
                    <select class="form-select form-select-sm" style="" v-model="trading.tradingType" required>
                        <option disabled value="">거래</option>
                        <option value="deposit">입금</option>
                        <option value="withdrawal">출금</option>
                    </select>
                </div>
                <input type="number" class="form-control mt-2" id="expenses" placeholder="1,000" required
                        v-model="trading.expenses">
            </div>
            <div class="mb-3">
                <label for="balance" class="form-label">잔액</label>
                <input type="number" class="form-control" id="balance" placeholder="1,000" required
                        v-model="trading.balance">
            </div>
            <div class="d-grid">
                <button class="btn btn-dark" type="submit">Button</button>    
            </div>
        </form>
    </div>
</template>
<script>
import { reactive } from 'vue'
// import axios from 'axios'
// import Datepicker from 'vue3-datepicker';    // 변경 예정

export default {
    name: 'DealUpdate', //주소록 추가
    // components: {
    //     Datepicker
    // },
    setup() {
        let trading = reactive({
            id: Date.now(),     //TODO: id의 마지막 id값 + 1 으로 변경
            deatil: '',
            category: '',
            date: new Date(),
            tradingType: '',
            expenses: '',
            balance: ''
        })

        // 거래 내역 업데이트(PUT)
        const updateSubmitHandler = async (e) => {
            const url = `http://localhost:3001/accountLogs`
            const data = trading
            const dataJson = JSON.stringify(data)

            try {
                // const response = await axios.get(url)
                // const ids = response.data.map((accountLogs) => {
                //     return accountLogs.id
                // })

                // const maxId = ids.length == 0 ? 0 : Math.max(...ids)
                // trading.id = maxId + 1

                // await axios.put(url, data, {"Content-Type": "application/json"})
            } catch(err) {
                alert(err)
                console.log("err 발생 입니다.")
            }
        }

        return { trading, updateSubmitHandler }
    }
}
</script>
<style scoped>
.form-label {
    font-size: 1.25em;
}
.form-select {
    font-size: 1.25em;
    width: auto;

}
</style>