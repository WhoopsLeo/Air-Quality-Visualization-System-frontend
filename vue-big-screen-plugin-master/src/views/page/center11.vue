<template>
    <div ref="chartContainer" style="width: 100%; height: 800px;"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, reactive } from 'vue';
  import * as echarts from 'echarts';
  import { useStore } from "vuex";
  const chartContainer = ref(null);
  const date = ref('2013');

  onMounted(() => {
    const myChart = echarts.init(chartContainer.value);
    function getVirtualData(year) {
      const date = +echarts.time.parse(year + '-01-01');
      const end = +echarts.time.parse(+year + 1 + '-01-01');
      const dayTime = 3600 * 24 * 1000;
      const data = [];
      for (let time = date; time < end; time += dayTime) {
        data.push([
          echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
          Math.floor(Math.random() * 1000)
        ]);
      }
      return data;
    }
    const store = useStore();
    const option = reactive({
        tooltip: {
        position: 'top',
        formatter: function (p) {
          const format = echarts.time.format(p.data[0], '{yyyy}-{MM}-{dd}', false);
          return format + ': ' + p.data[1];
        }
      },
      timeline: {
        axisType: 'category',
        autoPlay: true,
        playInterval: 2000,
        data: [
          '2013','2014','2015','2016','2017','2018'
        ],
        label: {
          color: 'rgba(255, 255, 255, 1)',
          formatter: function (s) {
            return new Date(s).getFullYear();
          } 
        },
        bottom:-5
      },
      visualMap: {
        min: 0,
        max: 1000,
        calculable: true,
        orient: 'vertical',
        left: '45',
        top: 'center'
      },
      calendar: [
        {
          orient: 'vertical',
          range: date.value,
          left : 'center',
          height : 670,
          top : 70
        },

      ],
      series:[
        {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          calendarIndex: 0, 
          data: getVirtualData(date.value)
        }
      ]

      },
    );
    option && myChart.setOption(option);
    myChart.on('timelinechanged', function (params) {
      let year = option.timeline.data[params.currentIndex]
      store.commit('addCurrentYear',year)
      myChart.setOption({
        calendar: [
          {
            orient: 'vertical',
            range: year,
            left: 'center',
            height: 670,
            
          },
        ],
        series: [
          {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 0,
            data: getVirtualData(year),
          },
        ],
      });

    });
    
    
  }
  
  
  );
  
  </script>
  
  <style scoped>
  /* 样式规则可以根据需要添加 */
  </style>