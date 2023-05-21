<template>
    <div class="centreRight1">
        <div style="height: 400px">
            <div id="container" style="height: 100%;"></div>
        </div>
      
    </div>
</template>
  
<script>
import { onMounted,computed,watch } from 'vue'
import * as echarts from 'echarts'
import {getSixAverage, getSixAverageByProvince} from "@/api";
import { useStore } from "vuex";
export default {
    name: "Right1",
    components: {},
    setup(){
            const store = useStore();
            const dataList = [];
            let chars = '';
            var current_year = '';
            var current_name = '';
            const co = [];
            const no2 = [];
            const o3 = [];
            const pm2 = [];
            const pm10 = [];
            const so2 = [];
            let result = [];
            let test = []
            let cityname = store.state.name;
            const getData = async () =>{
              const param = {
                  method: 'get',
              };
              await getSixAverage(param).then(res=>{
                  const s = res.data.data;
                  const header = ['year', '2013', '2014', '2015', '2016', '2017', '2018'];
                  dataList.push(header);
                  co.push('CO');
                  no2.push('NO2');
                  o3.push('O3');
                  pm2.push('PM2.5');
                  pm10.push('PM10');
                  so2.push('SO2');
                  
                  for (let i = 0;i < s.length;i++){
                    for (let j = 0;j < s[i].length;j++){
                        // 判断i属于哪一个  i是几种污染物，j是年份
                        switch (i) {
                            case 0:
                                pm2.push(s[i][j]);
                                break;
                            case 1:
                                pm10.push(s[i][j]);
                                break;
                            case 2:
                                so2.push(s[i][j]);
                                break;
                            case 3:
                                no2.push(s[i][j]);
                                break;
                            case 4:
                                co.push(s[i][j]);
                                break;
                            case 5:
                                o3.push(s[i][j]);
                                break;
                            default:
                                break;
                        }
                    }
                  }
                  dataList.push(co);
                  dataList.push(no2);
                  dataList.push(o3);
                  dataList.push(pm2);
                  dataList.push(pm10);
                  dataList.push(so2);

                  for (let i = 0; i < dataList.length; i++) {
                    let temp = []
                    const row = dataList[i];
                    const column1 = row[0]; // 提取指定列的元素
                    const column2 = row[1];
                    temp.push(column1,column2)
                    result.push(temp)
                  }
                  
              })
            };
            const drawLine = () =>{
            const myChart = echarts.init(document.getElementById('container'), {
              renderer: 'canvas',
              useDirtyRect: false
            });
            chars = myChart;
            var option = {
                title: {
                    text: cityname,
                    left: 'center'
                },
                dataset: {
                  source: result
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} :: {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    bottom : 30,
                    textStyle: {
                        color: 'rgba(255, 255, 255, 1)', // 设置字体颜色
                        // fontSize: 12, // 设置字体大小
                        // fontWeight: 'normal' // 设置字体粗细
                    }

                },
                series: [
                {
                    name: 'Area Mode',
                    type: 'pie',
                    radius: [20, 140],
                    center: ['50%', '45%'],
                    roseType: 'area',
                    itemStyle: {
                    borderRadius: 5,
                    
                    },
                }
                ]
            };
            myChart.setOption(option);
            }
            const getCurrentYearTask = computed(()=>{
                // 监听 currentyear
                return store.state.currentYear;
            });
            watch(getCurrentYearTask,(newVal,oldVal) =>{
                console.log('test收到'+newVal);
                current_year = newVal - 2012;
                console.log(current_year);
                result = []
                for (let i = 0; i < dataList.length; i++) {
                    let temp = []
                    const row = dataList[i];
                    const column1 = row[0]; // 提取指定列的元素
                    const column2 = row[current_year];
                    temp.push(column1,column2)
                    result.push(temp)
                  }
                  console.log(dataList)
                  console.log(result)

                  var option = {
                    dataset: {
                        source: result
                    },
                
                };
                chars.setOption(option);
            });
            
            onMounted(async () =>{
            await getData();
            await drawLine()
            })

          return{
              
          }
    },
  

}
</script>

<style lang="scss" scoped>
    /*$box-width: 300px;*/
    $box-width: 100%;
    $box-height: 400px;

    .centreRight1 {
        padding: 16px;
        height: $box-height;
        width: $box-width;
        border-radius: 10px;
        .bg-color-black {
            height: $box-height - 30px;
            border-radius: 10px;
        }
        .text {
            color: #c3cbde;
        }
        .dv-dec-3 {
            position: relative;
            width: 100px;
            height: 20px;
            top: -3px;
        }

        // .bottom-data {
        //     .item-box {
        //         & > div {
        //             padding-right: 5px;
        //         }
        //         font-size: 14px;
        //         float: right;
        //         position: relative;
        //         width: 50%;
        //         color: #d3d6dd;
        //         .dv-digital-flop {
        //             width: 120px;
        //             height: 30px;
        //         }
        //         i {
        //             font-size: 20px;
        //             line-height: 30px;
        //             margin-left: 20px;
        //         }
        //         .colorYellow {
        //             color: yellowgreen;
        //         }
        //         p {
        //             text-align: center;
        //         }
        //     }
        // }
    }
</style>