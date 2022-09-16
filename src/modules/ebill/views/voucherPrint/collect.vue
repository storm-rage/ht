<template>
  <div>
    <zj-content-container>
      <div class="zj-search-condition">
        <zj-list-layout>
          <template slot="searchForm">
            <el-form ref="searchForm" :model="searchForm">
              <el-form-item label="凭据类型：" class="col-center">
                <el-select v-model="searchForm.voucherType" placeholder="请选择" clearable :popper-append-to-body="false">
                  <el-option label="全部" value=""/>
                  <el-option v-for="item in dictionary.voucherType" :label="item.desc" :value="item.code" :key="item.code" />
                </el-select>
              </el-form-item>
              <el-form-item label="打印状态：" class="col-center">
                <el-select v-model="searchForm.printState" placeholder="请选择" clearable :popper-append-to-body="false">
                  <el-option value="" label="全部"></el-option>
                   <el-option v-for="item in dictionary.printState" :key="item.code" :label="item.desc" :value="item.code">
                </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="凭证生成日期：">
                <zj-date-range-picker :startDate.sync="searchForm.createDatetimeStart" :endDate.sync="searchForm.createDatetimeEnd"/>
              </el-form-item>
              <el-form-item label="凭证编号：">
                <el-input v-model="searchForm.voucherNo" @keyup.enter.native="enterSearch"/>
              </el-form-item>
              <el-form-item label="开单人：">
                <el-input v-model="searchForm.payEntNameLike" @keyup.enter.native="enterSearch"/>
              </el-form-item>
              <el-form-item label="收单人：">
                <el-input v-model="searchForm.receiptEntNameLike" @keyup.enter.native="enterSearch"/>
              </el-form-item>
            </el-form>
          </template>

          <div class="zj-search-response">
            <el-row style="padding: 3px" v-show="btnFlag">
              <zj-button class="export" icon="iconfont icon-dayin" :class="printFlag ? 'confirm' : 'back'" :title="!printFlag ? '请选择需要打印的凭证' : ''" :disabled="!printFlag" @click="printVoucher">
                打印
              </zj-button>
            </el-row>
            <zj-table ref="searchTable" :api="zjControl.queryVoucherList" :params="searchForm" v-if="tableFlag"
              @after-load="tableDataChange"
              @checkbox-change="tableCheckChange"
              @checkbox-all="tableCheckChange"
            >
              <zj-table-column fixed="left" type="checkbox" width="30"/>
              <zj-table-column field="voucherNo" title="凭证编号"/>
              <zj-table-column field="voucherType" title="凭证类型" :formatter="(obj) => typeMap(dictionary.voucherType, obj.cellValue)"/>
              <zj-table-column field="ebillCode" :title="`${$store.getters['user/productName']}编号`"/>
              <zj-table-column field="payEntName" title="开单人"/>
              <zj-table-column field="receiptEntName" title="收单人"/>
              <zj-table-column field="createDatetime" title="凭证生成时间" :formatter="date"/>
              <zj-table-column field="printState" title="打印状态" :formatter="(obj) => typeMap(dictionary.printState, obj.cellValue)"/>
              <zj-table-column field="printNum" title="打印次数"/>
              <zj-table-column title="操作" fixed="right">
                <template v-slot="{ row }">
                  <zj-button type="text" @click="printVoucher(row)"
                  >打印预览
                  </zj-button
                  >
                </template>
              </zj-table-column>
            </zj-table>
          </div>
        </zj-list-layout>
      </div>
    </zj-content-container>
  </div>
</template>

<script>
import voucher from "@utils/voucher";
import getLodop from "@utils/print";
import { uuid } from "@utils";
export default {
  name: "collect",
  data() {
    return {
      zjControl: {
        queryVoucherList:this.$api.voucherPrint.queryVoucherList,//凭据打印-查询
        getSingleVoucherDirectory:this.$api.voucherPrint.getSingleVoucherDirectory,//字典
        //tableApi:this.$api.collectPrint.tableApi,//表格
        getVoucherPrint:this.$api.voucherPrint.getVoucherPrint,//打印
        printNum:this.$api.voucherPrint.updateVoucherPrintTimes,//次数
      },
      searchForm: {
        voucherType: "",
        printState: "",
        createDatetimeStart: "",
        createDatetimeEnd: "",
        voucherNo: "",
        payEntNameLike: "",
        receiptEntNameLike: "",
      },
      dictionary: {},
      tableFlag: true,
      btnFlag: false,
      dataList: [],
      //打印
      printFlag: false,
      printData: [],
      printStatus: -1,
      //凭证号查询
      collActive: ["voucher"],
    };
  },
  created() {
    this.getApi();
    this.getDictionary();
  },
  methods: {
    //凭证号查询
    noSearch() {
      if (!this.searchForm.code) {
        return this.$messageBox({
          type: "info",
          content: `请输入${
            this.$i18n.messages[this.$i18n.locale].lang.financingName
          }编号`,
          title: "提示",
          showConfirmButton: true,
          center: true,
        });
      }
      if (!this.searchForm.type) {
        return this.$messageBox({
          type: "info",
          content: "请选择凭证类型！",
          title: "提示",
          showConfirmButton: true,
          center: true,
        });
      }
    },
    beforeSearch() {
      this.printFlag = false;
      this.printData = [];
      this.btnFlag = false;
    },
    beforeResetSearch() {
      this.printFlag = false;
      this.printData = [];
      this.btnFlag = false;
    },
    afterResetSearch() {
      this.voucherType = "";
      this.printState = "";
      this.createDatetimeStart = "";
      this.createDatetimeEnd = "";
      this.voucherNo = "";
      this.payEntNameLike = "";
      this.receiptEntNameLike = "";
    },
    //表格
    tableCheckChange({ records }) {
      this.printFlag = records.length > 0;
    },
    tableDataChange(data) {
      this.btnFlag = data.length > 0;
    },
    //字典
    getDictionary() {
      this.zjControl.getSingleVoucherDirectory().then(res => {
        const productName = this.$store.getters['project/productName'];
        // res.data.morePrintVOucherType = JSON.parse(
        //   JSON.stringify(res.data.voucherType).replace(new RegExp("融单","g"), productName)
        // )
        // res.data.voucherTypeCheckList = JSON.parse(
        //   JSON.stringify(res.data.voucherType).replace(/code/g,'key').replace(/desc/g,'label')
        // )
        this.dictionary = res.data
        //初始查询
        // this.searchForm.voucherTypes = []
        // res.data.voucherType.map(item => {
        //   this.searchForm.voucherTypes.push(item.code)
        // })
        this.tableFlag = true
      })
    },

    //类型变化
    handleCheckedChange(data) {
      this.searchForm.voucherTypes = data.array;
    },
    //打印或预览
    async printVoucher(row) {
      this.printStatus = -1;
      let that = this;
      let params = {
        ids: [],
      };
      if (row) {
        params.ids = [row.id];
      }
      //打印
      else {
        params.ids = this.$refs.searchTable
          .getCheckboxRecords()
          .map((item) => item.id);
        if (!params.ids.length) {
          return this.$messageBox({
            type: "info",
            content: "请选择需要进行打印的凭证！",
            title: "提示",
            showConfirmButton: true,
            center: true,
          });
        }
      }
      let res = await this.zjControl.getVoucherPrint(params).catch(() => {})
      res.data.voucherModels.map((item) => {
        item.id = uuid();
      });
      this.printData = res.data.voucherModels;
      //lodop
      let LODOP = getLodop();
      this.printData.map((item, index) => {
        let pageContent = document.createElement("DIV");
        pageContent.id = item.id;
        pageContent.className = "printNode";
        pageContent.innerHTML = voucher(item, "voucherType", that);
        if (LODOP != null && typeof LODOP.VERSION != "undefined") {
          document.body.appendChild(pageContent);
        }

        /*
             ADD_PRINT_HTML
            名称：增加超文本打印项(图形模式)
            格式：ADD_PRINT_HTML(Top,Left,Width,Height, strHtmlContent)
            功能：增加超文本打印项，设定该打印项在纸张内的位置和区域大小，实现超文本控制打印。
          */
        if (index === 0) {
          LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_分页输出一");
          LODOP.ADD_PRINT_HTM(4, 4, 750, 1000, pageContent.innerHTML);
          if (index < this.printData.length - 1) {
            LODOP.NewPage();
          } else {
            LODOP.PREVIEW();
          }
        } else if (index > 0 && index < this.printData.length - 1) {
          LODOP.ADD_PRINT_HTM(4, 4, 750, 1000, pageContent.innerHTML);
          LODOP.NewPage();
        } else if (index > 0 && index === this.printData.length - 1) {
          LODOP.ADD_PRINT_HTM(4, 4, 750, 1000, pageContent.innerHTML);
          LODOP.PREVIEW();
        }
      });
      if (LODOP != null && typeof LODOP.VERSION != "undefined") {
        let loading = this.$loading({
          lock: true,
          text: "正在打印中请勿操作页面！",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });

        LODOP.On_Return = function (TaskID, sValue) {
          that.printStatus = sValue;
          setTimeout(function () {
            loading.close();

            let printNodes = document.getElementsByClassName("printNode");
            if (printNodes.length === 1) {
              document.body.removeChild(printNodes[0]);
            }
            for (let k = printNodes.length - 1; k > 0; k--) {
              document.body.removeChild(printNodes[k]);
            }
          }, 200);
          if (that.printStatus !== -1) {
            if (that.printStatus > 0) {
              //增加次数
               that.zjControl.updateVoucherPrintTimes(params).then(()=>{
                 that.search(false)
               })
            }
          }
        };
      }
    },
  },
};
</script>

<style lang="less">
</style>
