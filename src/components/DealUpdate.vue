<template>
    <div class="mx-3 my-3">
        <h1>내역 수정</h1>
        <form class="create" @submit.prevent="updateSubmitHandler">
            <div class="mb-3 mt-3">
                <label for="deatil" class="form-label display-7">거래명</label>
                <input type="text" class="form-control" id="deatil" placeholder="거래명을 입력하세요" required
                    v-model="trading.deatil">
            </div>
            <div class="mb-3 mt-3">
                <label for="category" class="col-sm-2 col-form-label">카테고리</label>
                <select class="form-control" id="category" v-model="trading.category" required>
                    <option value="">카테고리를 선택하세요</option>
                    <option value="월급">월급</option>
                    <option value="생필품">생필품</option>
                    <option value="식비">식비</option>
                    <option value="여행">여행</option>
                    <option value="의료">의료</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="date" class="form-label">날짜 선택</label>
                <div :style="datepickerStyles">
                    <Datepicker v-model="trading.date" :format="'dd-MM-yyyy'" class="form-control" />
                </div>
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
                <button class="btn btn-dark" type="submit">수정하기</button>
            </div>
        </form>
    </div>
</template>
<script>
import { reactive } from 'vue'
import Datepicker from 'vue3-datepicker';
import axios from 'axios'

export default {
    name: 'DealUpdate',
    components: {
        Datepicker
    },
    setup() {
        //TODO: Props로 받아오는 데이터로 수정 필요
        let trading = reactive({
            id: 0,
            date: new Date(),
            deatil: '',
            category: '',
            tradingType: '',
            expenses: '',
            balance: ''
        })

        const datepickerStyles = {
            '--vdp-bg-color': '#f0f8ff',
            '--vdp-text-color': '#000',
            '--vdp-highlight-color': '#ff4500'
        }

        // 거래 내역 업데이트(PUT)
        const updateSubmitHandler = async (e) => {
            const url = `http://localhost:3001/accountLogs`
            const logDate = trading.date
            const year = logDate.getFullYear()
            const month = String(logDate.getMonth() + 1).padStart(2, '0')
            const day = String(logDate.getDate()).padStart(2, '0')
            const dateString = `${year}-${month}-${day}`

            const payload = {
                id: 0,
                member_id: trading.id,
                deposit: trading.tradingType === 'Deposit' ? trading.expenses : 0,
                withdraw: trading.tradingType === 'Withdrawal' ? trading.expenses : 0,
                category: trading.category,
                contents: trading.detail,
                reg_date: dateString,
                balance: trading.balance,
            };

            // const data = trading
            // const dataJson = JSON.stringify(data)

            try {
                const response = await axios.get(url)
                const ids = response.data.map((accountLogs) => {
                    return accountLogs.id
                })

                // const maxId = ids.length == 0 ? 0 : Math.max(...ids)
                // trading.id = maxId + 1

                // await axios.put(url, data, {"Content-Type": "application/json"})
            } catch (err) {
                alert(err)
                console.log("err 발생 입니다.")
            }
        }

        return { trading, updateSubmitHandler, Datepicker, datepickerStyles }
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
    border-width: 0;
    position: relative;
    left: -8px;
}
</style>