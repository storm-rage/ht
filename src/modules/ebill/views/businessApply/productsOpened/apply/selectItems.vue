<template>
  <el-row :gutter="12">
    <el-col :span="8" v-for="(item,index) in productList" :key="index+'s'">
      <div @click="handleSelect(item)" class="select-items" :class="{'select':prodIds.includes(item.id)}">
        <div class="check-box">
          <img src="./img/unselect.png" v-if="!prodIds.includes(item.id)">
          <img src="./img/select.png" v-else-if="prodIds.includes(item.id)">
        </div>
        <div class="content">
          <div class="logo">
            <img v-if="item.productType=== constantProd.RD" src='./img/bill.png' alt="图片">
            <img v-else src='./img/order-fancing.png' alt="图片">
          </div>
          <div class="content-block">
            <div class="title">{{item.productName}}</div>
            <div class="desc">{{item.productAbstract}}</div>
            <el-popover placement="bottom" width="220" trigger="hover" :content="item.productDetail	">
              <el-link type="primary" slot="reference" :underline="false">了解详情>></el-link>
            </el-popover>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import {ProductType} from '@modules/constant.js';
export default {
  name: 'SelectItems',
  props: {
    productList: Array
  },
  data(){
    return {
      // 选中的产品ID
      prodIds: [],
      // 选中的产品
      selectProds: [],
      // 常量
      constantProd: ProductType
    }
  },
  methods: {
    handleSelect (item) {
      if(!this.prodIds.includes(item.id)) {
        this.prodIds.push(item.id);
        this.selectProds.push(item);
        this.autoSelectRDProd(item);
      }else {
        if (item.productType === ProductType.RD) {
          // 如果开通了订单保理，则不允许勾掉凭证保理
          const prod = this.selectProds.find((ditem) => ditem.productType === ProductType.DDBL);
          if (!prod) {
            const index = this.prodIds.findIndex((val) => {
              return val === item.id;
            });
            this.delProd(index);
          }
        }else if (item.productType === ProductType.DDBL) {
          // 如果勾掉了订单保理，则同时去掉凭证保理
          const currentIndex = this.prodIds.findIndex((val) => {
            return val === item.id;
          });
          this.delProd(currentIndex);
          const rdIndex = this.selectProds.findIndex((val) => {
            return val.productType === ProductType.RD;
          });
          this.delProd(rdIndex);
        }else {
          const index = this.prodIds.findIndex((val) => {
            return val === item.id;
          });
          this.delProd(index);
        }
      }
      this.$emit('change', this.selectProds, item);
    },
    /**
     * 移除产品
     * @param index
     */
    delProd(index) {
      this.prodIds.splice(index,1);
      this.selectProds.splice(index,1);
    },
    /**
     * 如果是订单保理，自动选择电子债权凭证产品
     * @param item
     */
    autoSelectRDProd (item) {
      if (item.productType===ProductType.DDBL) {
        const prod = this.productList.find((ditem) => ditem.productType===ProductType.RD);
        if (!this.prodIds.includes(prod.id)) {
          this.prodIds.push(prod.id);
          this.selectProds.push(prod);
        }
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
