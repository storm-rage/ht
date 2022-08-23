<template>
  <zj-content-container>
    <!--  阶段性协议查询  -->
    <el-tabs v-model="tabs" class="zj-tabs-card zj-p-l-16 zj-p-r-16">
      <el-tab-pane label="阶段性协议查询" name="multistageAgreementSearch" >
        <multistage-agreement-search :zjControl="zjControl" :uDictionary="uDictionary" :uBtn="zjBtn"/>
      </el-tab-pane>
      <!-- <el-tab-pane label="待办" name="toDo" >
        <to-do :zjControl="zjControl" :mDictionary="mDictionary" :mBtn="zjBtn"/>
      </el-tab-pane>
      <el-tab-pane label="已办结" name="done" >
        <done :zjControl="zjControl" :mDictionary="mDictionary" :mBtn="zjBtn"/>
      </el-tab-pane> -->
    </el-tabs>

  </zj-content-container>
</template>
<script>
import multistageAgreementSearch from "./multistageAgreementSearch/multistageAgreementSearch";
// import toDo from "./multistageAgreementSearch/toDo";
// import done from "./multistageAgreementSearch/done";
export default {
  name: "multistageAgreementManage",
  components: {
    multistageAgreementSearch,
    // toDo,done
  },
  data() {
    return {
      searchForm: {
        productName: '',
        businessType: '',
        productType: '',
        productNo: '',
        productState: '',
      },
      list: [
        {
          field1: 'scm00001',
          field2: '某某产品一号',
          field3: '上游',
          field4: '订单保理',
          field5: '2022.09.08 11:18:19',
          field6: '生效',
          field7: '是'
        }
      ],
      tradeList: [],
      tabs:'multistageAgreementSearch',
      tabAtive:'',
      zjControl: {},
      uDictionary:{},
      mDictionary:{}

    };
  },
  methods: {
    /**
     *
     * @param row
     */
    toContractDetail(row) {
      console.error(row);
      this.$router.push({name: 'businessDetail'});
    },
    /**
     *
     * @param row
     */
    toContractSign(row) {
      console.log(row);
    },
    handleRadioChange({row}) {
      this.tradeList.push({
        field1: '佛山市a有限公司',
        field2: '是',
        field3: '756756756767',
        field4: '非保理',
        field5: '12',
        field6: '1000',
        field7: '2000',
        field8: '正常'
      })
    },
    getApiAfter(){
      this.zjBtn.userInfo ? this.tabAtive = 'orderFinancing' : this.tabAtive = 'voucherFinancing'
    },
    toDetail (row) {
      this.goChild('productInfoManageDetail', row)
    },
    toEdit (row) {
      this.goChild('productInfoManageEdit', row)
    },
    toEditQuota (row) {},
  },
  created() {
    this.getApi()
  }
};
</script>
