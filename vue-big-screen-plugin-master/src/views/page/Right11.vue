<template>
    <div>
      <div id="chart-dom" style="width: 100%; height: 800px;"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  import '@/api/index';
  import { useStore } from "vuex";
  export default {
    mounted() {
      const store = useStore();
      const myChart = echarts.init(document.getElementById("chart-dom"));
      const json = require('@/assets/json/beijing.json');
      const x_labels = [];
      const y_labels = [];
      for(let i = 1;i < json.length;i++){
        let randomNumber = Math.floor(Math.random() * 100);
        //console.log(json[i])
        x_labels.push(json[i][0])
        y_labels.push(json[i][1])+randomNumber
      }
      let cityname = store.s
      //console.log(x_labels)
      //console.log(json)
      const option = {
            title: {
            text: 'AQI走势图',
            left: 'center',
            top : 25,
            textStyle: {
                color: 'rgba(255, 255, 255, 1)', // 设置字体颜色
                fontSize: 20, // 设置字体大小
                // fontWeight: 'normal' // 设置字体粗细
            },
          },
          tooltip: {
            trigger: 'axis',
            
          },
          grid: {
            left: '7%',
            right: '15%',
            bottom: '10%',
            top : '10%',
            
          },
          xAxis: {
            data: x_labels,
            
          },
          yAxis: {},
          dataZoom: [
            {
              startValue: '2014-06-01'
            },
            {
              type: 'inside'
            }
          ],
          visualMap: {
            top: 50,
            right: 10,
            textStyle: {
                color: 'rgba(255, 255, 255, 1)', // 设置字体颜色
            },
            pieces: [
              {
                gt: 0,
                lte: 50,
                color: '#93CE07'
              },
              {
                gt: 50,
                lte: 100,
                color: '#FBDB0F'
              },
              {
                gt: 100,
                lte: 150,
                color: '#FC7D02'
              },
              {
                gt: 150,
                lte: 200,
                color: '#FD0100'
              },
              {
                gt: 200,
                lte: 300,
                color: '#AA069F'
              },
              {
                gt: 300,
                color: '#AC3B2A'
              }
            ],
            outOfRange: {
              color: '#999'
            }
          },
          series: {
            name: 'AQI走势图',
            type: 'line',
            data: y_labels,
            markLine: {
              silent: true,
              lineStyle: {
                color: '#333'
              },
              
              data: [
                {
                  yAxis: 50,
                },
                {
                  yAxis: 100
                },
                {
                  yAxis: 150
                },
                {
                  yAxis: 200
                },
                {
                  yAxis: 300
                }
              ]
            }
          }
        }
        myChart.setOption(option,true)

    }
  }
  </script>
  