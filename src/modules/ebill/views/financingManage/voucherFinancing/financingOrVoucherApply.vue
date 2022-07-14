<template>
    <zj-content-container>
      <!--  入库融资申请/凭证融资申请  -->
      <el-tabs v-model="tabs" type="card" class="zj-tabs-card">
        <el-tab-pane label="融资申请详情" name="financingDetail" >
          <financingDetail :zjControl="zjControl" :uDictionary="uDictionary" :uBtn="zjBtn"/>
        </el-tab-pane>
        <el-tab-pane label="凭证信息" name="voucherDetail" >
          <voucherDetail :zjControl="zjControl" :mDictionary="mDictionary" :mBtn="zjBtn"/>
        </el-tab-pane>
      </el-tabs>
    </zj-content-container>
</template>

<script>
import financingDetail from './financingApplyDetail'
import voucherDetail from './voucherDetail'

export default {
  name: "detail",
  components: {
    financingDetail,voucherDetail
  },
  data() {
    return {
      form:{},
      detail:{},
      tabs:'financingDetail',
      zjControl: {},
      uDictionary:{},
      mDictionary:{}

    }
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.quota-manage {
  height: 40px;
  line-height:40px;
  text-align: right;
  margin-bottom: 20px;
  color: #e6a23c;
  background-color: #fdf6ec;
}
.financingForm {
  margin-top: 20px;
}
.explain-text {
  display: flex;
  padding-bottom: 20px;
  background-color: rgba(2, 167, 240, 0);
  .explain-item {
    color: #555;
    font-size: 14px;
    margin-left: 20px;
  }
}
.hd-row {
  position: relative;
  &:after {
    position: absolute;
    top: 36px;
    left: 0;
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #cbcbcb;
  }
}

</style>
