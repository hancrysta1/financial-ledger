<template>
    <section class="ftco-section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md mb-5">
                    <form>
                        <fieldset>
                            <legend>거래내역</legend>
                            <div class="row gx-2 align-items-end">
                                <div class="col-4 col-sm-2">
                                    <label for="startDate" class="form-label">시작일</label>
                                    <input id="startDate" class="form-control" v-model="inputDate.from_date"
                                    type="date" placeholder="시작일을 선택하세요." />
                                    <span id="startDateSelected"></span>
                                </div>
                                <div class="col-4 col-sm-2">
                                    <label for="endDate" class="form-label">종료일</label>
                                    <input id="endDate" class="form-control" v-model="inputDate.to_date"
                                     type="date" placeholder="종료일을 선택하세요." />
                                    <span id="endDateSelected"></span>
                                </div>
                                <div class="col-4 col-sm-auto align-self-end" style="margin-bottom: 4px;">
                                    <button type="button" class="btn btn-primary btn-sm" @click="goToPrevMonthHandler">이전 달</button>
                                    <button type="button" class="btn btn-primary btn-sm" @click="goToNextMonthHandler">다음 달</button>
                                </div>
                                <div class="col-4 col-sm-2">
                                    <select class="form-select" aria-label="Default select example">
                                        <option disabled selected>카테고리</option>
                                        <option value="1">월급</option>
                                        <option value="1">생필품</option>
                                        <option value="2">여행</option>
                                        <option value="3">반려견</option>
                                    </select>
                                </div>
                                <div class="col-4 col-sm-2">
                                    <div class="input-group">
                                        <input type="search" id="form1" class="form-control" placeholder="검색" />
                                        <button type="button" class="btn btn-primary" data-mdb-ripple-init>
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="table-wrap">
                        <table class="table table-responsive-xxl">
                            <thead>
                                <tr>
                                    <th>&nbsp;</th>
                                    <th>날짜</th>
                                    <th>카테고리</th>
                                    <th>내용</th>
                                    <th>금액</th>
                                    <th>잔액</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="alert" role="alert"
                                v-for="accountLog in accountLogs" :key="accountLog.log_id">
                                    <td>
                                        <label class="checkbox-wrap checkbox-primary">
                                            <input type="checkbox" checked>
                                            <span class="checkmark"></span>
                                        </label>
                                    </td>
                                    <td>
                                        {{ accountLog.reg_date }}
                                    </td>
                                    
						      <!-- <td class="d-flex align-items-center">
                                <div class="img" style="background-image: url(images/person_2.jpg);"></div>
                                <div class="pl-3">
                                    <span>jacobthornton</span>
                                </div>
                              </td> -->
                                    <td class="col d-flex align-items-center">
                                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                        <div class="pl-3">
                                            <span>{{ accountLog.category }}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {{ accountLog.contents }}
                                    </td>
                                    <td class="status">
                                        <span class="active">{{ accountLog.deposit>0 ? '수입' : '지출' }}</span>
                                        <span>{{ accountLog.deposit>0 ? accountLog.deposit : accountLog.withdraw }}</span></td>
                                    <td>
                                        {{ accountLog.balance }}
                                    </td>
                                    <td>
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true"><i class="fa fa-close"></i></span>
                                        </button>
                                    </td>
                                </tr>

                                <!-- <tr class="alert" role="alert">
                                    <td>
                                        <label class="checkbox-wrap checkbox-primary">
                                            <input type="checkbox">
                                            <span class="checkmark"></span>
                                        </label>
                                    </td>
                                    <td>
                                        2024-06-10
                                    </td>
                                    <td class="col d-flex align-items-center">
                                        <i class="fa fa-money" aria-hidden="true"></i>
                                        <div class="pl-3">
                                            <span>월급</span>
                                        </div>
                                    </td>
                                    <td>
                                        6월 급여
                                    </td>
                                    <td class="status"><span class="waiting">Active</span> <span>100,000</span></td>
                                    <td>
                                        300,000
                                    </td>
                                    <td>
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true"><i class="fa fa-close"></i></span>
                                        </button>
                                    </td>
                                </tr> -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import '@/assets/css/table.css'
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { useUtilStore } from '@/stores/util.js'
export default {
    setup() {
        const utilStore = useUtilStore()
        // const accountLog = reactive({
        //     log_id: 0,
        //     member_id: 0,
        //     deposit: 0,
        //     withdraw: 0,
        //     category: "",
        //     contents: "",
        //     reg_date: "",
        //     balance: 0
        // })
        const inputDate = reactive({});
        const accountLogs = reactive([])
        let prevMonth = null

        onMounted(async() => {
            prevMonth = getPrevMonth(new Date())
            inputDate.from_date = utilStore.formatDateToStr(prevMonth)
            inputDate.to_date = utilStore.formatDateToStr(new Date())
            const response = await requestAccountLogs()
            Object.assign(accountLogs, response)
            
            utilStore.addThousandSeparatorToCurrency(accountLogs)
        })

        const getPrevMonth = (date) => {
            const timestamp = date.setMonth(date.getMonth() -1)
            return utilStore.parseDate(timestamp)
        }
        const getNextMonth = (date) => {
            const timestamp = date.setMonth(date.getMonth() +1)
            return utilStore.parseDate(timestamp)
        }

        const goToPrevMonthHandler = () => {
            const fromDate = utilStore.parseDate(inputDate.from_date)
            prevMonth = getPrevMonth(fromDate)
            inputDate.from_date = utilStore.formatDateToStr(prevMonth)
        }

        const goToNextMonthHandler = () => {
            const toDate = utilStore.parseDate(inputDate.to_date)
            let nextMonth = getNextMonth(toDate)
            inputDate.to_date = utilStore.formatDateToStr(nextMonth)
        }

        //change, click button
        const requestAccountLogs = async () => {
            const baseUrl = 'http://localhost:3001'
            try {
                const response = await axios.get(`${baseUrl}/accountLogs`)
                return response.data
            } catch(err) {
                alert(err)
            }
        }

        return {inputDate, getPrevMonth, accountLogs, goToPrevMonthHandler, goToNextMonthHandler}
    }
}
</script>

<style></style>