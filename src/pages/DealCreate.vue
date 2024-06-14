<template>
    <div class="mx-3 my-3">
        <h1>거래 추가</h1>
        <form class="create" @submit.prevent="createSubmitHandler">
            <div class="row mb-3">
                <label for="date" class="col-sm-2 col-form-label">일자</label>
                <div class="col-sm-10" :style="datepickerStyles">
                    <Datepicker
                    v-model="trading.date"
                    :format="'dd-MM-yyyy'"                    
                    class="form-control" />
                </div>                
            </div>
            <div class="row mb-3">
                <label for="detail" class="col-sm-2 col-form-label">거래명</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="detail" placeholder="거래명을 입력하세요" required
                        v-model="trading.detail">
                </div>
            </div>
            <div class="row mb-3">
                <label for="category" class="col-sm-2 col-form-label">카테고리</label>
                <div class="col-sm-10">
                    <select class="form-control" id="category" v-model="trading.category" required>
                        <option value="">카테고리를 선택하세요</option>
                        <option value="월급">월급</option>
                        <option value="생필품">생필품</option>
                        <option value="식비">식비</option>
                        <option value="여행">여행</option>
                        <option value="의료">의료</option>
                    </select>
                </div>
            </div>
            <div class="row mb-3">
                <label for="tradingType" class="col-sm-2 col-form-label">거래 종류</label>
                <div class="col-sm-4">
                    <select class="form-select" id="tradingType" v-model="trading.tradingType" required>
                        <option disabled value="">거래 종류를 선택하세요</option>
                        <option value="Deposit">입금</option>
                        <option value="Withdrawal">출금</option>
                    </select>
                </div>
                <label for="expenses" class="col-sm-1 col-form-label"
                style="" >지출액</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" id="expenses" placeholder="지출액을 입력하세요" required
                        v-model="trading.expenses">
                </div>
            </div>
            <div class="row mb-4">
                <div class="d-grid justify-content-md-end">
                    <button type="submit" class="btn btn-dark float-right">추가하기</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Datepicker from 'vue3-datepicker';

export default {
    name: 'Create',
    components: {
        Datepicker
    },
    setup() {
        // const router = useRouter()

        let trading = reactive({
            id: 0,     //TODO: id의 마지막 id값 + 1 으로 변경
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
            '--vdp-highlight-color': '#ff4500',
            '--vdp-selected-bg-color': '#6394e',
            "--vdp-hover-color": "#ffffff",
            "--vdp-hover-bg-color": "#19a8e6",
            "--vdp-selected-bg-color": "#19a8e6",
        }

        // const cancelCreate = () => {
        //     router.push({ name: 'List' })
        // };

        const createSubmitHandler = async (e) => {
            const url = `http://localhost:3001/accountLogs`
            const today = new Date()
            const year = today.getFullYear()
            const month = String(today.getMonth() + 1).padStart(2, '0')
            const day = String(today.getDate()).padStart(2, '0')
            const dateString = `${year}-${month}-${day}`

            const payload = {
                id: 0,
                member_id: 0,
                deposit: trading.tradingType === 'Deposit' ? trading.expenses : 0,
                withdraw: trading.tradingType === 'Withdrawal' ? trading.expenses : 0,
                category: trading.category,
                contents: trading.detail,
                reg_date: dateString,
                balance: 0
            }

            try {
                // member의 balance와 id 체크하는 요청
                const response = await axios.get(url)
                const responseData = response.data

                // [id 체크]: 가장 마지막 log값 + 1
                const ids = responseData.map((data) => {
                    return data.id
                })
                const maxId = ids.length == 0 ? 0 : Math.max(...ids)
                payload.id = maxId + 1

                // [balance 체크]: 최신의 잔액값으로 갱신
                const memberLogs = responseData.filter(log => log.member_id === payload.member_id)
                if (memberLogs.length > 0) {
                    memberLogs.sort((a, b) => new Date(b.reg_date) - new Date(a.reg_date))
                    payload.balance = memberLogs[0].balance
                }

                // balance = 잔액 + 입출금액
                payload.balance += (payload.deposit - payload.withdraw)
                console.log("asdf")
                const url2 = `http://localhost:3002/accountLogs`
                await axios.post(url2, payload, { "Content-Type": "application/json" })
                alert("성공")
                // router.push({ name: 'List' })
            } catch (err) {
                alert(err)
                console.log("err 발생 입니다.")
            }
        }
        return { trading, createSubmitHandler, datepickerStyles }
    }
}
</script>
<style scoped>
.create {
    font-size: 1.25em;
}
</style>