<template>
  <zj-content-container>
    <!--  中登登记管理  -->
    <zj-tabs v-model="tabs">
      <el-tab-pane label="订单保理" name="orderFinancing">
        <keep-alive>
          <orderFinancing :zjControl="zjControl" :uDictionary="uDictionary" :uBtn="zjBtn" />
        </keep-alive>

      </el-tab-pane>
      <el-tab-pane label="凭证融资" name="voucherFinancing">
        <keep-alive>
          <voucherFinancing :zjControl="zjControl" :mDictionary="mDictionary" :mBtn="zjBtn" />
        </keep-alive>

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
    orderFinancing, voucherFinancing
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
      tabs: 'orderFinancing',
      tabAtive: 'orderFinancing',

      uDictionary: {},
      mDictionary: {},
      zjControl: {
        orderPage: this.$api.zhongdengManage.orderPage, //订单保理列表
        getDictionary: this.$api.zhongdengManage.getDictionary,//字典
        registerDetails: this.$api.zhongdengManage.registerDetails,//手工登记详情
        uploadFile: this.$api.baseCommon.uploadFile,//手工登记详情
        registerSubmit: this.$api.zhongdengManage.registerSubmit,//手工登记提交
        checkLogin: this.$api.zhongdengManage.checkLogin,//校验登录
        getCode: this.$api.zhongdengManage.getCode,//获取验证码
        getPictureCode: this.$api.zhongdengManage.getPictureCode,//获取图形验证码
        zdLongin: this.$api.zhongdengManage.zdLongin,//登录中登
      },
    };
  },
  methods: {
    /**
     *
     * @param row
     */
    toContractDetail(row) {
      console.error(row);
      this.$router.push({ name: 'businessDetail' });
    },
    /**
     *
     * @param row
     */
    toContractSign(row) {
      console.log(row);
    },
    handleRadioChange({ row }) {
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
    getApiAfter() {
      this.zjBtn.userInfo ? this.tabAtive = 'orderFinancing' : this.tabAtive = 'voucherFinancing'
    },
    toDetail(row) {
      this.goChild('productInfoManageDetail', row)
    },
    toEdit(row) {
      this.goChild('productInfoManageEdit', row)
    },
    toEditQuota(row) { },
    getDic() {
      this.zjControl.getDictionary().then(res => {
        this.mDictionary = res.data
        this.uDictionary = res.data
      })
    },
  },
  created() {
    const currentActiveTab = this.getCurrentActiveTab();
    if (currentActiveTab) {
      this.activeComp = currentActiveTab;
      this.removeCurrentTab();
    }
    this.getDic()
    this.getApi()
  }
};
</script>
