<template>
  <div>
    <!--  月度统计  -->
    <zj-tabs v-model="tabs" class="zj-tabs-card">
      <el-tab-pane label="业绩集中度分析" name="businessAnalysis" >
        <business-analysis :zjControl="zjControl" :uDictionary="uDictionary" :uBtn="zjBtn"/>
      </el-tab-pane>
      <el-tab-pane label="业务情况报表" name="businessReport" >
        <business-report :zjControl="zjControl" :mDictionary="mDictionary" :mBtn="zjBtn"/>
      </el-tab-pane>
    </zj-tabs>

  </div>
</template>
<script>
import businessAnalysis from "./businessAnalysis/businessAnalysis";
import businessReport from "./businessReport/businessReport";
export default {
  name: "monthlyReport",
  components: {
    businessAnalysis,businessReport,
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
      tabs:'businessAnalysis',
      tabAtive:'businessAnalysis',
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
      this.zjBtn.userInfo ? this.tabAtive = 'businessAnalysis' : this.tabAtive = 'businessReport'
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
