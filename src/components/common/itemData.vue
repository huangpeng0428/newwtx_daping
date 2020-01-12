<template>
  <div class="itemData">
    <div class="flex vertical f-between status-list">
      <div
        :style="{'width':itemStyle.width,'height':itemStyle.height}"
        class="status-item-left">
        <div class="status-item-bg"/>
      </div>
      <div class="status-item-right flex vertical">
        <div
          :style="{'width':itemStyle.height,'height':itemStyle.height}"
          class="cilcle"/>
        <div class="mrg-lr-10">在线: </div>
        <div>25 (86%)</div>
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
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        console.log(this.itemStyle)
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
