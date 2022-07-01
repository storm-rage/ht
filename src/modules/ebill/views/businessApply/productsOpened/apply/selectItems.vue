<template>
  <el-row :gutter="12">
    <el-col :span="8" v-for="(item,index) in list" :key="index+'s'">
      <div @click="handleSelect(item)" class="select-items" :class="{'select':currentProdId.includes(item.id)}">
        <div class="check-box">
          <img src="./img/unselect.png" v-if="!currentProdId.includes(item.id)">
          <img src="./img/select.png" v-else-if="currentProdId.includes(item.id)">
        </div>
        <div class="content">
          <div class="logo">
            <img v-if="item.id==='2'" src='./img/bill.png' alt="图片">
            <img v-else src='./img/order-fancing.png' alt="图片">
          </div>
          <div class="content-block">
            <div class="title">{{item.name}}</div>
            <div class="desc">{{item.desc}}</div>
            <el-popover placement="bottom" width="220" trigger="hover" :content="item.detail">
              <el-link type="primary" slot="reference" :underline="false">了解详情>></el-link>
            </el-popover>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'SelectItems',
  data(){
    return {
      currentProdId: [],
      list:[
        {
          id: '1',
          name: '订单保理',
          desc: '订单保理简单介绍',
          detail: '我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情'
        },
        {
          id: '2',
          name: '电子债权凭证',
          desc: '电子债权凭证产品简单介绍',
          detail: '我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情我是详情'
        }
      ]
    }
  },
  methods: {
    handleSelect (item) {
      if(!this.currentProdId.includes(item.id)) {
        this.currentProdId.push(item.id);
      }else {
        const index = this.currentProdId.findIndex((val) => {
          return val === item.id;
        });
        this.currentProdId.splice(index,1);
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@assets/less/variables";
.select-items{
  background: #FFFFFF;
  border-radius: 4px;
  padding: 15px 12px 15px 20px;
  min-height: 200px;

  &.select {
    border: 1.5px solid @primary-main-color;
  }
  .check-box {
    text-align: right;
    img {
      width: 25px;
      height: 25px;
    }
  }
  .content {
    display: flex;
    align-items: flex-start;
    .logo{
      img {
        width: 123px;
        height: 123px;
      }
    }
    .content-block {
      flex: 1 0;
      margin-left: 20px;
      margin-top: 6px;
      margin-bottom: 6px;
      .title {
        font-size: 22px;
        font-weight: 400;
        color: #222222;
      }
      .desc {
        font-size: 16px;
        color: #686C78;
        font-weight: 400;
        word-break: normal;
        margin-top: 8px;
        height: 50px;
      }
    }
  }
}
</style>
