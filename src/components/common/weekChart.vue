<template>
  <div class="weekchart-container">
    <slot/>
    <div
      ref="weekChart"
      class="week-chart"/>
    <div class="weekimg">7日设备{{ title }}统计</div>
    <img
      class="week-export pointer"
      src="../../assets/image/echarts1111.png"
      @click="exportData">
    <img
      class="week-close pointer"
      src="../../assets/image/close.png"
      @click="closeEcharts">
  </div>
</template>
<script>
export default {
    name: 'WeekChart',
    props: {
       title: {
           type: String,
           default() {
               return ''
           }
       },
       dateArr: {
           type: Array,
           default() {
               return []
           }
       },
       onlineArr: {
           type: Array,
           default() {
               return []
           }
       },
       offlineArr: {
           type: Array,
           default() {
               return []
           }
       },
       lowArr: {
           type: Array,
           default() {
               return []
           }
       },
       faultArr: {
           type: Array,
           default() {
               return []
           }
       },
       warnArr: {
           type: Array,
           default() {
               return []
           }
       },
       titleArr: {
           type: Array,
           default() {
               return ['烟', '电', '气', '视频', '水']
           }
       }
    },
    data() {
        return {
            weekChart: ''
        }
    },
    watch: {
        titleArr: {
            handler(val) {

                if (this.weekChart) this.weekChart.resize()

                setTimeout(() => {
                    this.setweekCharts()
                }, 100)

                // this.setweekCharts()
            }
        }
    },
    mounted() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.setweekCharts()
        }, 200)
      })
    },
    methods: {
        closeEcharts() {
            this.$emit('closeEcharts')
        },
        exportData() {
            this.$emit('exportData')
        },
        setweekCharts() {
           this.weekChart = this.$echarts.init(this.$refs.weekChart)

           this.weekChart.setOption({
            color: ['#1da35f', '#3276c9', '#96a231', '#36b7bf', '#0341c9'],
            textStyle: {
                color: '#fff'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },

            legend: {
                data: this.titleArr,
                textStyle: {
                    color: '#fff'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: this.dateArr
            },
            yAxis: {

                type: 'value',
                boundaryGap: [0, 0.01]
            },
            series: [
                {
                    name: this.titleArr[0],
                    type: 'bar',
                    data: this.onlineArr,
                    itemStyle: {
                        barBorderRadius: [10, 10, 0, 0]
                    }
                },
                {
                    name: this.titleArr[1],
                    type: 'bar',
                    data: this.offlineArr,
                    itemStyle: {
                        barBorderRadius: [10, 10, 0, 0]
                    }
                },
                {
                    name: this.titleArr[2],
                    type: 'bar',
                    data: this.lowArr,
                    itemStyle: {
                        barBorderRadius: [10, 10, 0, 0]
                    }
                },
                {
                    name: this.titleArr[3],
                    type: 'bar',
                    data: this.faultArr,
                    itemStyle: {
                        barBorderRadius: [10, 10, 0, 0]
                    }
                },
                {
                    name: this.titleArr[4],
                    type: 'bar',
                    data: this.warnArr,
                    itemStyle: {
                        barBorderRadius: [10, 10, 0, 0]
                    }
                }

            ]
            })
        }
    }
}
</script>
<style lang="scss">
.weekchart-container{
    position: relative;
    height: 21rem;
    width: 40rem;
    background: url('../../assets/image/left-bg-top.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.week-chart{
    width: 100%;
    height: 100%;
}
.weekimg{
    position: absolute;
    width: 10rem;
    line-height: 3rem;
    text-align: center;
    height: 3rem;
    background: url('../../assets/image/weekicon.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: 999;
    color: #fff;
    top: 0;
}
.week-close{
    position: absolute;
    width: 1.25rem;
    line-height: 1.25rem;
    top: -0.5rem;
    right: -0.5rem;
}
.week-export{
    position: absolute;
    width: 1.8rem;
    line-height: 1.25rem;
    top: 0.5rem;
    right: 1.5rem;
}
</style>

