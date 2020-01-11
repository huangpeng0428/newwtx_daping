<template>
  <div class="weekchart-container">
    <slot/>
    <div
      ref="weekChart"
      class="week-chart"/>
    <div class="weekimg">7日设备数量统计</div>
  </div>
</template>
<script>
export default {
    name: 'WeekChart',
    mounted() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.setweekCharts()
        }, 100)
      })
    },
    methods: {
        setweekCharts() {
           let weekChart = this.$echarts.init(this.$refs.weekChart)
            console.log(weekChart)
           weekChart.setOption({
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
                data: ['烟', '电', '气', '视频', '水'],
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
                data: ['01-10', '01-09', '01-08', '01-07', '01-06', '01-05', '01-04']
            },
            yAxis: {

                type: 'value',
                boundaryGap: [0, 0.01]
            },
            series: [
                {
                    name: '烟',
                    type: 'bar',
                    data: [0, 487, 0, 0, 0, 0, 0],
                    itemStyle: {
                        barBorderRadius: [10, 10, 0, 0]
                    }
                },
                {
                    name: '电',
                    type: 'bar',
                    data: [0, 587, 0, 0, 0, 0, 0],
                    itemStyle: {
                        barBorderRadius: [10, 10, 0, 0]
                    }
                },
                {
                    name: '气',
                    type: 'bar',
                    data: [0, 487, 0, 0, 0, 0, 0],
                    itemStyle: {
                        barBorderRadius: [10, 10, 0, 0]
                    }
                },
                {
                    name: '视频',
                    type: 'bar',
                    data: [0, 487, 0, 0, 300, 0, 0],
                    itemStyle: {
                        barBorderRadius: [10, 10, 0, 0]
                    }
                },
                {
                    name: '水',
                    type: 'bar',
                    data: [0, 487, 0, 0, 0, 200, 0],
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
</style>

