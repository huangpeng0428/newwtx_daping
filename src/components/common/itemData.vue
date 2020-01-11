<template>
  <div class="itemData">
    <div class="flex vertical f-between status-list">
      <div class="status-item-left">
        <div class="status-item-bg"/>
      </div>
      <div class="status-item-right flex vertical">
        <div class="cilcle"/>
        <div class="mrg-lr-10">在线: </div>
        <div>25588 (86%)</div>
      </div>
    </div>
  </div>
</template>
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
            height: 0.88rem;
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
