<template>
  <div class="itemData">
    <div
      v-for="(itemState,index) in stateData"
      :key="index"
      class="flex vertical f-between status-list">
      <div
        :style="{'width':itemStyle.width,'height':itemStyle.height}"
        class="status-item-left">
        <div
          :style="{'width':itemState.accountNum,'background':itemState.color}"
          class="status-item-bg"/>
      </div>
      <div class="status-item-right flex vertical">
        <div
          :style="{'width':itemStyle.height,'height':itemStyle.height,'background':itemState.color}"
          class="cilcle"/>
        <div class="mrg-lr-10">{{ itemState.title }}: </div>
        <div>{{ itemState.count }} ({{ itemState.accountNum }})</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: {
        itemStyle: {
            type: Object,
            default() {
                return {
                    width: '10rem',
                    height: '0.88rem'
                }
            }
        },
        stateData: {
          type: Array,
          default() {
            return []
          }
        }
    },
    data() {
        return {

        }
    },
    mounted() {
      console.log(this.stateData)
    }
}
</script>
<style lang="scss">
.itemData{
    width: 100%;
    .status-list{
        width: 100%;
        .status-item-left{
          width: 10rem;
          height: 0.88rem;
          background: #0F3270;
          border-radius: 1rem;
          .status-item-bg{
            background: #8252FD;
            width: 86%;
            height: 100%;
            border-radius: 1rem;
          }
        }
        .status-item-right{
          font-size: 0.87rem;
          width:12rem;
          .cilcle{
            width: 0.88rem;
            height: 0.88rem;
            background: #8252FD;
            border-radius: 50%;
          }
        }

      }
    }
</style>
