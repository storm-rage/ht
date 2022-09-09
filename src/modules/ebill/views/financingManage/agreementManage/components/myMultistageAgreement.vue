<template>
  <zj-content-container>
    <!--  我的阶段性协议  -->
    <zj-content-block>
      <zj-header title="贸易关系"></zj-header>
      <zj-content>
      <zj-table ref="tradeRelationTable" :pager="false"
                :dataList="tradeRelationList"
                @radio-change="handleRadioChange"
                :radio-config="{highlight: true}"
      >
        <zj-table-column type="radio" width="60"/>
        <zj-table-column type="seq" title="序号" width="60"/>
        <zj-table-column field="buyerName" title="买方企业名称"/>
        <zj-table-column field="isFactoringCredit" title="是否已有订单保理额度" />
        <zj-table-column field="totalCreditAmount" title="额度总额" :formatter="money"/>
        <zj-table-column field="availableCreditAmount" title="可用额度" :formatter="money"/>
        <zj-table-column title="操作" fixed="right" width="160">
          <template v-slot="{ row }">
            <zj-button type="text" @click="toLogList(row)">维护记录</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
      <div class="explain-text zj-m-l-10 zj-m-t-10">
        <div>注：</div>
        <ol class="explain-content">
          <li class="explain-item">以上额度信息仅供参考，实际以融资时额度为准。</li>
        </ol>
      </div>
      </zj-content>
    </zj-content-block>
    <zj-content-block>
      <zj-header title="阶段性协议信息"></zj-header>
      <zj-list-layout>
        <template slot="rightBtns">
          <vxe-button class="reset" icon="el-icon-refresh" @click="reset({'coreCompanyName': buyerName})">重置</vxe-button>
          <vxe-button class="search" icon="el-icon-search" @click="queryMyPhasedAgreePage({'coreCompanyName': buyerName})">查询</vxe-button>
        </template>
        <template slot="searchForm">
          <el-form ref="searchForm" :model="searchForm">
            <el-form-item label="状态：">
              <el-select v-model="searchForm.agreementState">
                <el-option label="全部" value=""></el-option>
                <el-option
                  v-for="item in dictionary.agreementStateList"
                  :label="item.desc"
                  :value="item.code"
                  :key="item.code"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="协议签订日期：">
              <zj-date-range-picker
                :startDate.sync="searchForm.agreementStartDateBegin"
                :endDate.sync="searchForm.agreementStartDateEnd"
              />
            </el-form-item>
            <el-form-item label="阶段性协议编号：">
              <el-input v-model="searchForm.agreementNo" @keyup.enter.native="enterSearch"/>
            </el-form-item>
            <el-form-item label="协议类型：">
              <el-select v-model="searchForm.agreementType">
                <el-option label="全部" value=""></el-option>
                <el-option
                  v-for="item in dictionary.agreementTypeList"
                  :label="item.desc"
                  :value="item.code"
                  :key="item.code"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        <zj-content>
        <zj-table ref="searchTable" :dataList="myPhasedAgreePageList" :params="searchForm" :api="zjControl.queryMyPhasedAgreePage">
          <zj-table-column field="coreCompanyName" title="买方企业名称"/>
          <zj-table-column field="agreementNo" title="阶段性协议编号"/>
          <zj-table-column field="agreementName" title="阶段性协议名称"/>
          <zj-table-column field="agreementStartDate" title="协议签订日期" :formatter="date"/>
          <zj-table-column field="agreementType" title="协议类型"/>
          <zj-table-column field="agreementEstimateEndDate" title="协议预计到期日" :formatter="date"/>
          <zj-table-column field="fileName" title="协议附件"/>
          <zj-table-column field="agreementStatus" title="状态" />
          <zj-table-column title="操作" fixed="right" width="160">
            <template v-slot="{ row }">
              <zj-button type="text" @click="attaDownload(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
        </zj-content>
      </zj-list-layout>
    </zj-content-block>


  </zj-content-container>
</template>
<script>
export default {
  name:'myMultistageAgreement',
  components: {},
  props: {
    zjControl: {},
  },
  data() {
    return {
      searchForm: {
        agreementState: '',
        agreementStartDateBegin:'',
        agreementStartDateEnd:'',
        agreementNo: '',
        agreementType: '',
      },
      tradeRelationList: [],
      dictionary: {},
      myPhasedAgreePageList: [],
      buyerName: '',
    };
  },
  methods: {
    handleRadioChange({row}) {
      let coreComName = row.buyerName
      this.buyerName = row.buyerName
      this.queryMyPhasedAgreePage({'coreCompanyName': coreComName})
    },
    attaDownload(row) {
      this.zjControl.downloadFile({
        fileUrl:row.fileId,
        fileId:row.fileId,
        fileName:row.fileName,
      })
    },
    //贸易关系列表
    getMyTradeRelationList() {
      this.zjControl.getMyTradeRelationList().then(res => {
        this.tradeRelationList = res.data.tradeRelationList
      })
    },
    //协议列表
    queryMyPhasedAgreePage(coreName) {
      this.searchForm = {...this.searchForm, ...coreName}
      console.log(this.searchForm)
      this.$nextTick(() => {
        this.$refs.searchTable.getList(this.searchForm)
      })
    },
    reset(coreName) {
      this.searchForm.agreementState = ''
      this.searchForm.agreementStartDateBegin = ''
      this.searchForm.agreementStartDateEnd = ''
      this.searchForm.agreementNo = ''
      this.searchForm.agreementType = ''
      this.searchForm = {...this.searchForm, ...coreName}
      this.$nextTick(() => {
        this.$refs.searchTable.getList(this.searchForm)
      })
    },
    toLogList(row) {
      this.goChild('frontPhasedMaintainLog',row)
    },
    getPhasedAgreeDirectory() {
      this.zjControl.getPhasedAgreeDirectory().then(res=>{
        this.dictionary = Object.assign({},res.data)
      })
    },
  },
  created() {
    this.getMyTradeRelationList()
    this.getPhasedAgreeDirectory()
  },
  mounted() {
    console.log(this.dictionary)
  }
};
</script>
