<template>
  <zj-content-container ref="detailContainer" style="padding-bottom: 0;" >
    <!--  企业信息明细  -->
    <zj-top-header :title="titleInfo"/>
    <el-tabs v-model="tabs" class="zj-tabs-card zj-p-l-16 zj-p-r-16">
      <el-tab-pane label="企业信息" name="entInfo" >
        <keep-alive>
          <ent-info v-if="tabs==='entInfo'" :zjControl="zjControl" :uDictionary="uDictionary" :uBtn="zjBtn"/>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="用户信息" name="userInfo" >
        <keep-alive>
          <user-info :detailEl="$refs.detailContainer" v-if="tabs==='userInfo'" :zjControl="zjControl" :mDictionary="mDictionary" :mBtn="zjBtn"/>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
      <zj-content-footer style="margin-top: 20px;">
        <zj-button class="submit-button" @click="goParent">返回</zj-button>
      </zj-content-footer>

  </zj-content-container>
</template>
<script>
import entInfo from "./entInfo";
import userInfo from "./userInfo";
export default {
  name: "entInfoDetail",
  components: {
    entInfo,userInfo,
  },
  computed: {
    titleInfo () {
      return this.tabs === 'entInfo'?'企业信息明细':this.tabs === 'userInfo'?'客户信息明细':''
    }
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
      tabs:'entInfo',
      tabAtive:'entInfo',
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
