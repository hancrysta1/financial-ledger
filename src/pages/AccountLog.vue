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
                                    <input id="startDate" class="form-control" v-model="inputObj.fromDate"
                                    type="date" placeholder="시작일을 선택하세요." @change="changeHandler"/>
                                    <span id="startDateSelected"></span>
                                </div>
                                <div class="col-4 col-sm-2">
                                    <label for="endDate" class="form-label">종료일</label>
                                    <input id="endDate" class="form-control" v-model="inputObj.toDate"
                                     type="date" placeholder="종료일을 선택하세요." />
                                    <span id="endDateSelected"></span>
                                </div>
                                <div class="col-4 col-sm-auto align-self-end" style="margin-bottom: 4px;">
                                    <button type="button" class="btn btn-primary btn-sm" @click="goToPrevMonthHandler">이전 달</button>
                                    <button type="button" class="btn btn-primary btn-sm" @click="goToNextMonthHandler">다음 달</button>
                                </div>
                                <div class="col-4 col-sm-2">
                                    <select class="form-select" aria-label="Default select example"
                                    @change="changeCategoryHandler" v-model="inputObj.category">
                                        <option value="">전체</option>
                                        <option v-for="(c, index) in categories" :value="c.name">{{c.name}}</option>
                                    </select>
                                </div>
                                <div class="col-4 col-sm-2">
                                    <div class="input-group">
                                        <input type="search" id="form1" class="form-control" 
                                        v-model="inputObj.searchContents" placeholder="내용 검색" 
                                        @input="inputSearchHandler"/>
                                        <button type="button" class="btn btn-primary" data-mdb-ripple-init
                                        @click="clickSearchHandler">
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
            <!-- 모달 -->
            <DealUpdate v-if="showUpdateModal" @refreshAccountLogs="refreshAccountLogs" @closeToParent="closeToParent" :accountLog="accountLog"/>
            <!-- v-if="showUpdateModal"
            @close="closeModal" -->
            <!-- :dealData="selectedDeal" -->
            <div class="row">
                <div class="col-md-12">
                    <div class="table-wrap">
                        <table class="table table-responsive-xxl">
                            <thead>
                                <tr>
                                    <th>순번</th>
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
                                v-for="(accountLog, index) in accountLogs" :key="accountLog.id">
                                    <td>
                                        {{ index + 1 }}
                                    </td>
                                    <td>
                                        {{ formatDate(accountLog.reg_date) }}
                                    </td>
						      <!-- <td class="d-flex align-items-center">
                                <div class="img" style="background-image: url(images/person_2.jpg);"></div>
                                <div class="pl-3">
                                    <span>jacobthornton</span>
                                </div>
                              </td> -->
                                    <td class="col d-flex align-items-center">
                                        <i :class="categoryIconClass(accountLog.category)" aria-hidden="true"></i>
                                        <div class="pl-3">
                                            <span>{{ accountLog.category }}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {{ accountLog.contents }}
                                    </td>
                                    <td class="status">
                                        <span :class="{ 'waiting': accountLog.deposit > 0, 'active': accountLog.deposit <= 0 }">{{ accountLog.deposit>0 ? '수입' : '지출' }}</span>
                                        <span>{{ accountLog.deposit>0 ? addThousandSeparator(accountLog.deposit) : addThousandSeparator(accountLog.withdraw) }}</span></td>
                                    <td>
                                        {{ addThousandSeparator(accountLog.balance) }}
                                    </td>
                                    <td>
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close"
                                        @click="clickDeleteHandler(accountLog.id)">
                                            <span aria-hidden="true"><i class="fa fa-close"></i></span>
                                        </button>
                                        <button type="button" class="modify" data-dismiss="alert" aria-label="Close"
                                        @click="clickModifyHandler(accountLog)">
                                            <span aria-hidden="true"><i class="fa fa-pencil-square-o"></i></span>
                                        </button>
                                    </td>
                                </tr>
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
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useUtilStore } from '@/stores/util.js'

import DealUpdate from '@/components/DealUpdate.vue'

export default {
    components: {
        DealUpdate,
    },
    setup() {
        const utilStore = useUtilStore()
        const accountLogs = reactive([])
        const inputObj = reactive({})
        const categories = reactive([
            {
                name: '생필품',
                iconClassName: 'fa fa-shopping-cart'
            },{
                name: '월급',
                iconClassName: 'fa fa-money'
            },{
                name: '식비',
                iconClassName: 'fa fa-cutlery'
            },{
                name: '여행',
                iconClassName: 'fa fa-plane'
            },{
                name: '의료',
                iconClassName: 'fa fa-medkit'
            },
        ])
        let prevMonth = null
        let showUpdateModal = ref(false)
        const accountLog = reactive({})

        onMounted(async() => {
            prevMonth = getPrevMonth(new Date())
            inputObj.fromDate = utilStore.formatDateToStr(prevMonth)
            inputObj.toDate = utilStore.formatDateToStr(new Date())
            const response = await requestAccountLogs()
            Object.assign(accountLogs, filterAccountLogs(response))
        })

        const getPrevMonth = (date) => {
            const timestamp = date.setMonth(date.getMonth() -1)
            return utilStore.parseDate(timestamp)
        }
        const getNextMonth = (date) => {
            const timestamp = date.setMonth(date.getMonth() +1)
            return utilStore.parseDate(timestamp)
        }

        const formatDate = (dateStr) => {
            const date = utilStore.parseDate(dateStr)
            return utilStore.formatDateToStr(date)
        }

        const goToPrevMonthHandler = () => {
            const fromDate = utilStore.parseDate(inputObj.fromDate)
            prevMonth = getPrevMonth(fromDate)
            inputObj.fromDate = utilStore.formatDateToStr(prevMonth)
            refreshAccountLogs()
        }

        const goToNextMonthHandler = () => {
            const toDate = utilStore.parseDate(inputObj.toDate)
            let nextMonth = getNextMonth(toDate)
            inputObj.toDate = utilStore.formatDateToStr(nextMonth)
            refreshAccountLogs()
        }

        const changeCategoryHandler = () => {
            refreshAccountLogs()
        }

        const refreshAccountLogs = async () => {
            const response = await requestAccountLogs()
            console.log(response)
            accountLogs.splice(0, accountLogs.length, ...filterAccountLogs(response))
        }

        const changeHandler = () => {
            refreshAccountLogs()
        }

        const inputSearchHandler = () => {
            refreshAccountLogs()

        }
        const clickSearchHandler = () => {
            refreshAccountLogs()
        }

        const clickModifyHandler = (log) => {
            showUpdateModal.value = true
            Object.assign(accountLog, log)
            // accountLog props 전송
        }

        const closeToParent = () => {
            showUpdateModal.value = false
        }

        const clickDeleteHandler = async (id) => {
            const isConfirm = confirm('삭제하시겠습니까?')
            if(!isConfirm) {
                return false
            }
            const baseUrl = 'http://localhost:3001'
            try {
                const response = await axios.delete(`${baseUrl}/accountLogs/${id}`);
                refreshAccountLogs()
            } catch (error) {
                alert(error)
            }
        }

        //change, click button
        const requestAccountLogs = async () => {
            const baseUrl = 'http://localhost:3001'
            try {
                const response = await axios.get(`${baseUrl}/accountLogs`)
                return response.data
            } catch(error) {
                alert(error)
            }
        }
        const filterAccountLogs = (response) => {
            const filteredLogs = response.filter(log => {
                const dateInRange = log.reg_date >= inputObj.fromDate && log.reg_date <= inputObj.toDate
                const categoryMatch = checkCategoryMatch(log.category)
                const isContentMatching = checkContentMatch(log.contents)

                return dateInRange && categoryMatch && isContentMatching;
            });

            return filteredLogs;
        };

        const checkCategoryMatch = (category) => {
            if ((inputObj.category??'') == '') return true;
            return category.includes(inputObj.category);
        };

        const checkContentMatch = (contents) => {
            if ((inputObj.searchContents??'') == '') return true;
            return contents.includes(inputObj.searchContents);
        };

        const categoryIconClass = (category) => {
            switch(category) {
                case '생필품':
                return 'fa fa-shopping-cart';
                case '월급':
                return 'fa fa-money';
                case '식비':
                return 'fa fa-cutlery';
                case '여행':
                return 'fa fa-plane';
                case '의료':
                return 'fa fa-medkit';
                default:
                return ''; // 기본값 설정
            }
        }

        return {
            inputObj,
            utilStore, 
            getPrevMonth, 
            formatDate,
            accountLogs, 
            accountLog,
            categories,
            showUpdateModal,
            closeToParent,
            addThousandSeparator: utilStore.addThousandSeparator, 
            refreshAccountLogs,
            goToPrevMonthHandler, 
            goToNextMonthHandler, 
            changeCategoryHandler,
            changeHandler,
            inputSearchHandler,
            clickSearchHandler,
            clickModifyHandler,
            clickDeleteHandler,
            categoryIconClass,
        }
    }
}
</script>

<style scoped>
</style>