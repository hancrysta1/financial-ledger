<template>
    <div class="mx-3 my-3">
        <h1>거래 추가</h1>
        <form class="create" @submit.prevent="createSubmitHandler">
            <div class="row mb-3">
                <label for="date" class="col-sm-2 col-form-label">일자</label>
                <div class="col-sm-10">
                    <input type="date" id="date" name="date" min="2018-01-01" max="2024-12-31"
                    v-model="trading.date"/>
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
                    <input type="category" class="form-control" id="category" placeholder="카테고리를 입력하세요" required
                        v-model="trading.catrgory">
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
// import axios from 'axios'

export default {
    name: 'Create', //주소록 추가
    setup() {
        // const router = useRouter()

        let trading = reactive({
            id: Date.now(),     //id: 현재 날짜값: Date.now()
            date: '',
            detail: '',
            catrgory: '',
            tradingType: ''
        })

        // const cancelCreate = () => {
        //     router.push({ name: 'List' })
        // };

        const createSubmitHandler = async (e) => {
            const url = `http://localhost:3001/memo`
            const data = trading
            const dataJson = JSON.stringify(data)

            try {
                // const response = await axios.get(url)
                // const ids = response.data.map((data) => {
                //     return data.id
                // })

                // const maxId = ids.length == 0 ? 0 : Math.max(...ids)
                // trading.id = maxId + 1

                // await axios.post(url, data, { "Content-Type": "application/json" })
                // router.push({ name: 'List' })
            } catch (err) {
                alert(err)
                console.log("err 발생 입니다.")
            }
        }


        return { trading, createSubmitHandler }
    }
}
</script>
<style scoped>
.form-label {
    font-size: 1.25em;
}

</style>