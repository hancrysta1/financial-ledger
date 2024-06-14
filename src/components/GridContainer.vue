<template>
  <div class="grid-container">
    <div class="item2" style="text-align: center;">
      <Metric title="이번 달 수입" :number="formatCurrency(depositV[1])" />
      <Metric title="이번 달 지출" :number="formatCurrency(withdrawV[1])" />
    </div>
    <div class="item3">
      <span class="title">총 수입</span>
      <div id="inputBar" style="padding-left: 10%;height: 300px; width: 300px;margin: 0"></div>
    </div>
    <div class="item4">
      <span class="title">총 지출</span>
      <div id="outputBar" style="height: 300px;  width: 300px;margin: 0"></div>
    </div>
    <div class="item6">
      <span class="title">나의 지출 요약</span>
      <div id="pie" style="width:100%;height: 500px"></div>
    </div>
    <div class="item7" style="width:125%; height: 520px;">
      <Panel />
    </div>
  </div>
</template>
<script>
import { ref,reactive, onMounted } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios'
import Metric from './Metric.vue';
import Panel from './Panel.vue';
export default {
  name: 'MyChart',
  components: {
    Metric,
    Panel
  },
  setup() {
    
    let logs = reactive([])
    const requestLists = async()=> {
        const response = await axios.get('http://localhost:3001/accountLogs')
        return response.data
    }
    const initCharts = () => {
      console.log("initCh", withdrawV[1])
      initChart('inputBar', getInputBarOption());
      initChart('outputBar', getOutputBarOption());
      initChart('pie', getPieOption());
    };
    let month = ref([]);
    let category = ref([]);
    let withdrawV = ref(0)
    let depositV = ref(0)
    let pieResult =ref([])
    const monthWithdrawTotals = (value)=>{
          return month.map(month => 
            logs
              .filter(log => log['reg_date'].split('T')[0].split('-')[1] === month)
              .reduce((total, log) => total + log[value], 0)
          );
        }
    const monthWithCategory = () => {
      return category.map(categori => ({
        value: logs.filter(log => log['category'] === categori).length,
        name: categori
        
    }));
};

    onMounted(async ()=>{
        const result = await requestLists()
        Object.assign(logs, result)
        month = [...new Set(logs.map(log => log['reg_date'].split('T')[0].split('-')[1]))]
        category = [...new Set(logs.map(log => log['category']))]
        withdrawV.value = monthWithdrawTotals('withdraw')
        depositV.value = monthWithdrawTotals('deposit')
        pieResult.value = monthWithCategory()
        initCharts();
        console.log('ddd',pieResult.value)
    })
    const initChart = (id, option) => {
      const dom = document.getElementById(id);
      const myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });
      if (option && typeof option === 'object') {
        myChart.setOption(option);
      }
      window.addEventListener('resize', myChart.resize);
    };

    const getInputBarOption = () =>
    {
      console.log(depositV)
      const option =  {
      xAxis: {
        type: 'category',
        data: month
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: depositV.value,//월별 deposit
          type: 'bar',
          itemStyle: {
            color: 'blue'
          }
        }
      ]
    }
    return option
  }

    
    const getOutputBarOption = () => {
    
      const option =  {
      xAxis: {
        type: 'category',
        data: month
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: withdrawV.value,
          type: 'bar',
          itemStyle: {
            color: 'red'
          }
        }
      ]
    }
    return option
    };

    const getPieOption = () => ({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        bottom: '30%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['70%', '20%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 30,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: pieResult.value
        }
      ]
    });
    function formatCurrency(amount) {
            return new Intl.NumberFormat('ko-KR', {
                style: 'currency',
                currency: 'KRW'
            }).format(amount);
        }


    return {logs,depositV,withdrawV,formatCurrency,pieResult};
  }
};
</script>

<style scoped>

.item2 { grid-area: item2; }
.item3 { grid-area: item3; }
.item4 { grid-area: item4; }
.item6 { grid-area: item6; }
.item7 { grid-area: item7;}

.grid-container {
  float: left;
  padding-left: 10%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-areas:
    
    'item2 item2 item3 item3 item4 item4'
    'item2 item2 item3 item3 item4 item4'
    'item6 item6 item6 item7 item7 item7';
  width: 90%;
  justify-items: center; 
  align-items: center; 

}

.grid-container > div {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
}

.title {
  font-size: 25px;
  font-weight: 700;
}
</style>
