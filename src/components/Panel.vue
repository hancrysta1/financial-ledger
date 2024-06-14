<template>
    <div class="panel">
      <div class="panel-heading">
        <h3 class="panel-title">최근 구매 내역</h3>
        <div class="right">
          <div class="row">
            <a href="#" class="btn-primary">더보기</a>
          </div>
        </div>
      </div>
      <div class="panel-body no-padding">
        <table class="table-striped" style="width:765px; height: 400px;">
          <thead>
            <tr>
              <th>순번</th>
              <th>날짜</th>
              <th>카테고리</th>
              
              <th>내용</th>
            <th>금액</th>
            <th>잔액</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(log, index) in sortedLogs" :key="log.id" v-if="logs.length > 0">
            <td :class="getClass(log)">{{ log['id'] }}</td>
            <td :class="getClass(log)">{{ log["reg_date"].split('T')[0] }}</td>
            <td :class="getClass(log)">{{ log["category"] }}</td>
            <td :class="getClass(log)">{{ log["contents"] }}</td>
            <td :class="getClass(log)">{{ log["withdraw"] || log["deposit"] }}</td>
            <td><span class="label label-success">{{ log["balance"] }}</span></td> 
        </tr>
        
    </tbody>
</table>
</div>

</div>
</template>
  
<script>
import { computed,reactive, onMounted } from 'vue';
import axios from 'axios'
export default {
  name: 'Table',
  setup() {
    let logs = reactive([])
    const requestLists = async()=> {
        const response = await axios.get('http://localhost:3001/accountLogs')
        return response.data
    }
    
    onMounted(async ()=>{
        const result = await requestLists()
        Object.assign(logs, result)
    })
    console.log(logs)
    const sortedLogs = computed(() => {
      return logs.slice().sort((a, b) => {
        return new Date(b.reg_date) - new Date(a.reg_date);
      }).slice(0, 8);
    });

    const getClass = (log) => {
          return {
            'withdraw-class': log["withdraw"],
            'deposit-class': log["deposit"] && !log["withdraw"]
          };
        }
    return {logs,getClass,sortedLogs}
  }
}

</script>

<style scoped>
.withdraw-class {
  color: red; 
}

.deposit-class {
  color: green; 
}
.panel {
  width: 100%;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  -moz-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
.contents{
  text-overflow: ellipsis;overflow:hidden;white-space : nowrap;
  
}

.panel .panel-heading {
  padding-bottom:80px;
  float: left;
  padding-left: 40%;
  position: relative;
}
.panel .panel-heading .panel-title {
  margin: 0;
  font-size: 25px;
  font-weight: 700;
}
.panel .panel-heading button {
  margin-right: 5px;
  background-color: transparent;
  border: none;
  outline: none;
}
.panel .panel-heading button i {
  font-size: 5px;
}
.panel .panel-note {
  line-height: 2.6;
  color: #777777;
}
.panel .panel-note i {
  margin-right: 3px;
}
.panel .right {
  position: absolute;
  right: 0px;
  top: 32px;
}
.panel .table > thead > tr > td,
.panel .table > thead > tr > th,
.panel .table > tbody > tr > td,
.panel .table > tbody > tr > th {
  height: 5px;
  width: 100%;
}

</style>


  