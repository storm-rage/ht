<template>
  <zj-content-container>
    <!--  中登登记订单保理  -->
    <zj-list-layout>
      <template slot="rightBtns">
        <vxe-button class="reset" icon="el-icon-refresh" @click="resetSearch()">重置</vxe-button>
        <vxe-button class="search" icon="el-icon-search" @click="search(true, 'searchTable')">查询</vxe-button>
      </template>
      <template slot="searchForm">
        <el-form ref="searchForm" :model="searchForm">
          <el-form-item label="供应商名称：">
            <el-input v-model="searchForm.sellerNameLike" @keyup.enter.native="enterSearch" />
          </el-form-item>
          <el-form-item label="核心企业：">
            <el-input v-model="searchForm.buyerNameLike" @keyup.enter.native="enterSearch" />
          </el-form-item>
          <el-form-item label="登记状态：">
            <el-select v-model="searchForm.productState">
              <el-option label="全部" value="" />
              <el-option v-for="item in dictionary.registStatus" :key="item.code" :label="item.desc"
                :value="item.code" />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <zj-table ref="searchTable" :api="zjControl.orderPage" :params="searchForm" keep-source
        @checkbox-change="checkChange" @checkbox-all="checkChange" :edit-config="{
          trigger: 'manual',
          mode: 'row',
          icon: '-',
          autoClear: false,
          showStatus: true
        }">
        <!--   :dataList="list1"-->
        <zj-table-column type="checkbox" width="60" />
        <zj-table-column field="sellerName" title="供应商名称" />
        <zj-table-column field="buyerName" title="核心企业" />
        <zj-table-column field="cactoringLogo" title="保理标识" />
        <zj-table-column field="state" title="贸易关系状态" />
        <zj-table-column field="accountTransfer" title="应收账款转让期限" :formatter="date">
          <template v-slot="{ row }">
            {{ row.accountTransferStartDate }}~{{ row.accountTransferEndDate }}
          </template>
        </zj-table-column>
        <zj-table-column field="factoringCreditAmount" title="授信额度" />
        <zj-table-column field="factoringCredit" title="额度期限（月）">
          <template v-slot="{ row }">
            {{ row.factoringCreditStartDate }}~{{ row.factoringCreditEndDate }}
          </template>
        </zj-table-column>
        <zj-table-column field="registStatus" title="登记状态" />
        <zj-table-column title="操作" fixed="right" width="160">
          <template v-slot="{ row }">
            <zj-button type="text" @click="toEdit(row)">详情</zj-button>
            <!-- <zj-button type="text" @click="toEdit(row)">中登网登记</zj-button> -->
          </template>
        </zj-table-column>
      </zj-table>
    </zj-list-layout>
    <zj-workflow v-model="workflow">
      <el-row slot="right">
        <!-- <zj-button @click="toIssuance" >中登登记</zj-button>  
          <zj-button @click="toIssuance" >手工登记</zj-button> -->
        <zj-button>中登登记</zj-button>
        <zj-button @click="openDialog">手工登记</zj-button>
      </el-row>
    </zj-workflow>
    <!-- <artRegister :dialogVisible="this.dialogVisible" /> -->
    <el-dialog :visible.sync="dialogVisible" center width="80vw" title="中登手工登记" top="6vh">
      <zj-content-block>
        <zj-header title="客户基本信息" />
        <zj-table ref="searchTable" class="zj-search-table" :dataList="baseInfoList" :pager="false">
          <zj-table-column field="sellerName" title="供应商名称" />
          <zj-table-column field="buyerName" title="核心企业名称" />
          <zj-table-column field="cactoringLogo" title="保理标识" />
        </zj-table>
      </zj-content-block>
      <zj-content-block>
        <zj-header title="中登附件" />
        <zj-table ref="searchTable" class="zj-search-table" :dataList="financingInfoList" :pager="false">
          <zj-table-column type="seq" title="序号" />
          <zj-table-column field="type" title="附件类型" />
          <zj-table-column field="remark" title="补充说明" />
          <zj-table-column field="name" title="附件名称" />
          <zj-table-column field="date" title="上传日期" />
          <zj-table-column title="操作">
            <template v-slot="{ row, rowIndex }">

              <zj-button type="text" @click="deletefile(rowIndex)">删除</zj-button>
              <zj-button type="text" @click="attaDownLoad(row.fileId)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content-block>
      <p>注：若上传中登登记证明文件，只支持上传PDF格式。</p>

      <el-row slot="footer" class="dialog-footer">
        <zj-upload class="zj-inline" :httpRequest="handleFileUpload" :data="{ row }" :autoUpload="true"
          :onChange="handleFileChange">
          <zj-button slot="trigger" type="text">上传资料</zj-button>
        </zj-upload>
      </el-row>
      <br><br><br>
      <el-row slot="footer" class="dialog-footer">
        <zj-button status="primary" @click="save">保存</zj-button>
        <zj-button class="back" @click="dialogVisibleTo">取消</zj-button>
      </el-row>
    </el-dialog>
  </zj-content-container>
</template>
<script>
export default {
  components: {
  },

  data() {
    return {
      workflow: '',
      searchForm: {
        sellerNameLike: '',
        buyerNameLike: '',
        productState: '',
      },
      zjControl: {
        orderPage: this.$api.zhongdengManage.orderPage, //订单保理列表
        getDictionary: this.$api.zhongdengManage.getDictionary,//字典
        registerDetails: this.$api.zhongdengManage.registerDetails,//手工登记详情
        uploadFile: this.$api.baseCommon.uploadFile,//手工登记详情
        registerSubmit: this.$api.zhongdengManage.registerSubmit,//手工登记提交
      },
      dictionary: {},
      dialogVisible: false,
      list1: [
        {
          id: "1",
          buyerName: 'scm00001',
          sellerName: '某某产品一号',
          field3: '上游',
          field4: '订单保理',
          field5: '2022.09.08 11:18:19',
          field6: '生效',
          state: '是'
        },
      ],
      list: [],
      tradeList: [],
      idlist: [],
      baseInfoList: [],//客户基本信息集合
      financingInfoList: [],//融资基本信息集合（列表显示的）
      // {
      //   type: "application/pdf",
      //   remarks: "死数据",
      //   name: "贸易关系(1).pdf",
      //   date: "Tue Aug 23 2022 18:56:33 GMT+0800(中国标准时间)"
      // }
      zdAttachList: [],//需要上传的附件（不显示列表中）
      filemsg:{}
    };
  },
  created() {
    this.getApi();
    this.getDetail();
  },
  methods: {
    // 手工登记----------------
    handleFileUpload({ file }) {
      let formData = new FormData();
      formData.append("file", file);
      this.zjControl.uploadFile(formData).then((res) => {
        this.filemsg = res.data
        console.log(res.data);
      });
    },
    handleFileChange(file) {
      console.log(file);
      let files1 = {
        type: file.raw.type,
        name: file.raw.name,
        date: file.raw.lastModifiedDate,
        busType:this.filemsg.fileType,
        createDatetime: "",
        fileId: this.filemsg.fileId,
        fileName: this.filemsg.fileName,
        remark: ""
      }
      this.financingInfoList.push(files1)
      // let files2 = {
      //   busType:this.filemsg.fileType,
      //   createDatetime: "",
      //   fileId: this.filemsg.fileId,
      //   fileName: this.filemsg.fileName,
      //   remark: ""
      // }
      // this.zdAttachList.push(files2)
      // console.log(this.zdAttachList,"上传的");
    },
    openDialog() {
      console.log(this.idlist);
      let params = {
        idList: this.idlist,
        bizType: "01"
      }
      this.zjControl.registerDetails(params).then(res => {
        this.baseInfoList = res.data.baseInfoList
        // this.financingInfoList=res.data.financingInfoList
      })
      this.dialogVisible = true;
    },
    dialogVisibleTo() {
      this.dialogVisible = false;
    },
    save() {
      let params = {
        idList: this.idlist,
        bizType: "01",
        zdAttachList: this.zdAttachList
      }
      this.zjControl.registerSubmit(params).then(res => {
        // this.dialogVisible = false;
        console.log("提交成功");
      })

    },
    deletefile(rowIndex) {
      // console.log(rowIndex);
      this.financingInfoList.splice(rowIndex, 1);
    },
    // ---------------------------
    checkChange() {
      this.idlist = []
      let checkArr = this.$refs.searchTable.getCheckboxRecords()
      // console.log(checkArr, '勾选的值11111')
      this.list = checkArr
      // console.log(this.list, '勾选的值22222')
      this.list.forEach(e => {
        this.idlist.push(e.id)
      })
      console.log(this.idlist);
    },
    getDetail() {
      this.zjControl.getDictionary().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
    toContractDetail(row) {
      console.error(row);
      this.$router.push({ name: 'businessDetail' });
    },
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
    toDetail(row) {
      this.goChild('productInfoManageDetail', row)
    },
    toEdit(row) {
      this.goChild('zhongdengManageDetaildd', row)
    },
    toEditQuota(row) { },
  }
};
</script>
