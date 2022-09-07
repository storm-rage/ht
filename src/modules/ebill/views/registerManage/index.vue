<template>
  <zj-content-container>
    <!--  中登登记管理  -->
    <zj-tabs v-model="tabs">
      <el-tab-pane label="订单保理" name="orderFinancing" >
        <orderFinancing :zjControl="zjControl" :uDictionary="uDictionary" :uBtn="zjBtn"/>
      </el-tab-pane>
      <el-tab-pane label="凭证融资" name="voucherFinancing" >
        <voucherFinancing :zjControl="zjControl" :mDictionary="mDictionary" :mBtn="zjBtn"/>
      </el-tab-pane>
    </zj-tabs>

  </zj-content-container>
</template>
<script>
import orderFinancing from "./orderFinancing/orderFinancing";
import voucherFinancing from "./voucherFinancing/voucherFinancing";
export default {
  name: "registerManage",
  components: {
    orderFinancing,voucherFinancing
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
      tabs:'orderFinancing',
      tabAtive:'orderFinancing',
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
