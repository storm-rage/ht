<template>
  <el-dialog :visible.sync="show" center width="80vw" title="中登手工登记" top="6vh">
    <zj-content-block>
      <zj-header title="客户基本信息" />
      <zj-table ref="searchTable" class="zj-search-table" :dataList="baseInfoList" :pager="false">
        <zj-table-column field="sellerName" title="供应商名称" />
        <zj-table-column field="buyerName" title="核心企业名称" />
        <zj-table-column field="cactoringLogo" title="保理标识" :formatter="
          (obj) => typeMap(dictionary.cactoringLogo, obj.cellValue)
        " />
      </zj-table>
    </zj-content-block>
    <zj-content-block>
      <zj-header title="中登附件" />
      <zj-table ref="searchTable" class="zj-search-table" :dataList="zdAttachList" :pager="false">
        <zj-table-column type="seq" title="序号" width="50px" />
        <zj-table-column title="附件类型" align="left">
          <template v-slot="{ row }">
            <el-select v-model="row.busType" class="sel">
              <el-option v-for="item in dictionary.busType" :key="item.code" :label="item.desc" :value="item.code" />
            </el-select>
          </template>
        </zj-table-column>
        <!-- 
            <el-form-item label="登记状态：">
              <el-select v-model="searchForm.registStatus">
                <el-option label="全部" value="" />
                <el-option v-for="item in dictionary.registStatus" :key="item.code" :label="item.desc"
                  :value="item.code" />
              </el-select>
            </el-form-item>
         -->
        <zj-table-column field="remark" title="补充说明">
          <template v-slot="{ row }">
            <el-input type="text" class="ipt" v-model="row.remark" />
          </template>
        </zj-table-column>
        <zj-table-column field="fileName" title="附件名称" />
        <zj-table-column title="操作">
          <template v-slot="{ row, rowIndex }">

            <zj-button type="text" @click="deletefile(rowIndex)">删除</zj-button>
            <zj-button type="text" @click="downs(row)">下载</zj-button>
          </template>
        </zj-table-column>
      </zj-table>
    </zj-content-block>
    <p>注：若上传中登登记证明文件，只支持上传PDF格式。</p>

    <el-row slot="footer" class="dialog-footer">
      <zj-upload class="zj-inline" :httpRequest="handleFileUpload" :data="{ row }" :autoUpload="true" accept=".pdf"
        :onChange="handleFileChange">
        <zj-button slot="trigger" type="text">上传资料</zj-button>
      </zj-upload>
    </el-row>
    <br><br><br>
    <el-row slot="footer" class="dialog-footer">
      <zj-button status="primary" @click="save">保存</zj-button>
      <zj-button class="back" @click="close">取消</zj-button>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: "frozenDialog",
  props: ["idlist", "dictionary"],
  data() {
    return {
      show: false,
      phone: '',
      baseInfoList: [],//客户基本信息集合
      // financingInfoList: [],//列表显示的
      // {
      //   type: "application/pdf",
      //   remarks: "死数据",
      //   name: "贸易关系(1).pdf",
      //   date: "Tue Aug 23 2022 18:56:33 GMT+0800(中国标准时间)"
      // }
      zdAttachList: [],//需要上传的附件
      trymsg: "",
      filemsg: {},
      bizType: "",
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
    }
  },
  methods: {
    downs(row) {
      console.log(row);
      let params = {
        fileId: row.fileId,
        fileName: row.fileName
      }
      this.$api.baseCommon.downloadFile(params).then((res) => {
      });
    },
    close() {
      this.zdAttachList = []
      this.show = false
    },
    // 手工登记----------------
    handleFileUpload({ file }) {
      let formData = new FormData();
      formData.append("file", file);
      this.zjControl.uploadFile(formData).then((res) => {
        this.filemsg = res.data
        console.log(res.data);
        let files2 = {
          busType: "",
          fileId: this.filemsg.fileId,
          fileName: this.filemsg.fileName,
          remark: ""
        }
        this.zdAttachList.push(files2)
        console.log(this.zdAttachList);
      });
    },
    handleFileChange(file) {
      console.log(file);
      // let files1 = {
      //   type: file.raw.type,
      //   name: file.raw.name,
      //   remark: ""
      // }
      // this.financingInfoList.push(files1)
    },
    open(bizType) {
      this.bizType = bizType
      console.log(this.idlist, bizType);
      let params = {
        idList: this.idlist,
        bizType: bizType
      }
      this.zjControl.registerDetails(params).then(res => {
        this.baseInfoList = res.data.baseInfoList
        // this.financingInfoList=res.data.financingInfoList
      })
      this.show = true;
    },
    // change(rowIndex) {
    //   this.zdAttachList[rowIndex].remark
    // },
    save() {
      console.log(this.financingInfoList);
      let params = {
        idList: this.idlist,
        bizType: this.bizType,
        zdAttachList: this.zdAttachList
      }
      console.log(params, "上传的");
      this.zjControl.registerSubmit(params).then(res => {
        this.close()
        this.zdAttachList = []
        console.log("提交成功");
      })

    },
    deletefile(rowIndex) {
      // console.log(rowIndex);
      this.financingInfoList.splice(rowIndex, 1);
    },
  }
}
</script>

<style lang="less">
.ipt {
  width: 100%;
  height: 100%;
}

.sel {
  width: 80%;
  height: 100%;
}
</style>