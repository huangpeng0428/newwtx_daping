<template>
  <div class="linechart-container">
    <slot/>
    <div
      ref="chart"
      class="line-chart"/>
  </div>
</template>
<script>
export default {
    name: 'Linechart',
    props: {
    },
    data() {
        return {

        }
    },
    mounted() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.setcharts()
        }, 100)
      })

    },
    methods: {
      setcharts() {
        let lineChart = this.$echarts.init(this.$refs.chart)

        // 绘制图表
        lineChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },

          grid: {

            left: '0%',
            right: '10%',
            bottom: '4%',
            containLabel: true
          },
          splitLine: {
            show: false
          },
          xAxis: [{
            type: 'category',
            show: false,
            // eslint-disable-next-line no-dupe-keys
            type: 'category',
            data: ['烟', '电', '气', '水', '消火栓'],

            axisLabel: {
              formatter: function(value) {
                  return '{' + value + '| }\n{value|' + value + '}';
              },
              textStyle: {
                  fontSize: 1 // 让字体变大
              }
            },
            axisLine: {
              lineStyle: {

                // color: 'white',
                opacity: 0
              }
            }
          }],
          yAxis: [{
            type: 'value',
            show: false,
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            }
        }],

          series: [{
            name: '数量',
            type: 'bar',
            data: ['1060', '1703', '100', '190', '100'],

            // barMaxWidth: '',
            barWidth: 14,
            barGap: 1,
            smooth: true,
            label: {
              normal: {
                  show: true,
                  position: 'top',

                  offset: [5, -2],
                  textStyle: {
                      color: 'white',
                      fontSize: 12,
                      textAlign: 'left'

                      // marginLeft: '-10px'
                  }
              }
            },
            itemStyle: {

              barBorderRadius: [40, 40, 0, 0],
              emphasis: {
                  barBorderRadius: 50
              },
              normal: {
                  barBorderRadius: 40,
                  color: function(params) {

                    // 首先定义一个数组
                    return ['#21bf59', '#E5901D', '#408EFE', '#8252FD', '#c96ee0'][params.dataIndex]
                  }
              }
            }

          }]
        })
      }
    }
}
</script>
<style lang="scss">
.linechart-container {
  width: 26.19rem;
  height: 8.38rem;
  .line-chart{
    width: 26.19rem;
    height: 8.38rem;
  }
}
</style>
