<template>
  <el-form ref="form" class="static-form zj-p-t-10" :model="form" label-width="250px">
    <el-form-item label="项目名称" prop="projectName">
      {{ form.projectName }}
    </el-form-item>
    <el-form-item label="折扣天数计算方式：" :rules="[{ required: true, message: '请选择计算方式', trigger: 'change' }]"
                  class="required" prop="discountDaysCalculationMethod">
      <el-radio-group v-if="dictionary.discountDaysCalculationMethod" v-model="form.discountDaysCalculationMethod">
        <el-radio :label="item.code" v-for="(item,index) in dictionary.discountDaysCalculationMethod"
                  :key="index">
          {{ item.desc }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="询价收益计算参考天数：" prop="calculateReferenceDays" class="required"
                  :rules="[{ required: true, message: '请输入参考天数', trigger: 'blur' }]">
      <el-input v-model="form.calculateReferenceDays" maxlength="200"/>
    </el-form-item>
    <el-form-item label="日利率计算基数：" :rules="[{ required: true, message: '请选择计算基数', trigger: 'change' }]" class="required"
                  prop="interestRateCalculationDays">
      <el-radio-group v-if="dictionary.interestRateCalculationDays" v-model="form.interestRateCalculationDays">
        <el-radio :label="item.code" v-for="(item,index) in dictionary.interestRateCalculationDays"
                  :key="index">
          {{ item.desc }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="最小折扣金额（元）：" prop="minimumDiscountAmount" class="required"
                  :rules="[{ required: true, message: '请输入最小折扣金额', trigger: 'blur' }]">
      <el-input @input="moneyInput(form,'minimumDiscountAmount')" @blur="moneyBlur(form,'minimumDiscountAmount')"
                v-model="form.minimumDiscountAmount" maxlength="200"/>
    </el-form-item>
    <!-- 折叠面板区 -->
    <el-collapse ref="elCollapse" v-model="activeNames" class="zjcoll-noSelect" style="background-color: white">
      <!-- 费用设置  -->
      <el-collapse-item name="fee" :disabled="true">
        <template slot="title">
          <h4 class="orderTitle">费用设置</h4>
        </template>
        <el-row>
          <el-form-item label="费用担当：" :rules="[{ required: true, message: '请选择费用担当', trigger: 'change' }]"
                        class="required" prop="ptFeeChargeType">
            <el-radio-group v-if="dictionary.ptFeeChargeType" v-model="form.ptFeeChargeType">
              <el-radio :label="item.code" v-for="(item,index) in dictionary.ptFeeChargeType"
                        :key="index">
                {{ item.desc }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="费用收取方式：" :rules="[{ required: true, message: '请选择费用收取方式', trigger: 'change' }]"
                        class="required" prop="chargeMethod">
            <el-radio-group v-if="dictionary.chargeMethod" v-model="form.chargeMethod">
              <el-radio :label="item.code" :disabled="item.code==0" v-for="(item,index) in dictionary.chargeMethod"
                        :key="index">
                {{ item.desc }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
      </el-collapse-item>
      <!-- 提醒设置  -->
      <el-collapse-item name="warn" :disabled="true">
        <template slot="title">
          <h4 class="orderTitle">提醒设置</h4>
        </template>
        <el-row>
          <el-form-item label="核心企业额度到期前，提前X天提醒：" class="required"
                  :rules="[{ required: true, message: '请输入天数', trigger: 'blur' }]" prop="earlyStopDays">
            <zj-number-input :precision="0" v-model="form.earlyStopDays">
              <template slot="append">天</template>
            </zj-number-input>
          </el-form-item>
          <el-form-item label="核心企业额度金额<=Y元提醒：" class="required"
                  :rules="[{ required: true, message: '请输入金额', trigger: 'blur' }]"  prop="earlyNoticeAmt">
            <zj-number-input :precision="0" v-model="form.earlyNoticeAmt">
              <template slot="append">元</template>
            </zj-number-input>
          </el-form-item>
          <el-form-item label="核心企业提醒设置">
          </el-form-item>
          <zj-table class="zj-table1 orderTable" ref="coreTable"
                    :dataList="dataList1" :pager="false" keep-source
                    :edit-config="{trigger: 'manual', mode: 'row', autoClear: false,showStatus: true}"
          >
            <zj-table-column field="name" title="提醒对象"/>
            <zj-table-column title="是否提醒">
              <template v-slot="{row}">
                <el-select v-model="row.isremind">
                  <el-option
                    v-for="(item, index) in dictionary.isRemind"
                    :key="index"
                    :value="item.code"
                    :label="item.desc"
                  />
                </el-select>
              </template>
            </zj-table-column>
            <zj-table-column title="提醒方式">
              <template v-slot="{row}">
                <el-checkbox-group v-model="row.reminderMode">
                  <el-checkbox
                    v-for="(item, index) in dictionary.reminderMode"
                    :key="index"
                    :label="item.code">{{ item.desc }}
                  </el-checkbox>
                </el-checkbox-group>
              </template>
            </zj-table-column>
          </zj-table>
          <el-form-item label="运营方提醒设置">
          </el-form-item>
          <zj-table class="zj-table2 orderTable" ref="tradeTable"
                    :dataList="dataList2" :pager="false" keep-source
                    :edit-config="{trigger: 'manual', mode: 'row', autoClear: false,showStatus: true}"
          >
            <zj-table-column width="150" field="reminderObject" title="提醒对象" :edit-render="{name: '$input'}"/>
            <zj-table-column width="80" field="isremind" title="是否提醒"
                             :edit-render="{name: '$select', options: isRemind}"/>
            <zj-table-column title="提醒方式">
              <template v-slot="{row}">
                <el-checkbox-group v-model="row.reminderMode">
                  <el-checkbox
                    :disabled="!$refs.tradeTable.isActiveByRow(row)"
                    v-for="(item, index) in dictionary.reminderMode"
                    :key="index"
                    :label="item.code">{{ item.desc }}
                  </el-checkbox>
                </el-checkbox-group>
              </template>
            </zj-table-column>
            <zj-table-column width="150" field="mobileNo" title="手机号" :edit-render="{name: '$input'}"/>
            <zj-table-column width="200" title="操作" fixed="right">
              <template v-slot="{row}">
                <template v-if="$refs.tradeTable.isActiveByRow(row)">
                  <zj-button type="text" @click="cancel">保存</zj-button>
                  <zj-button type="text" @click="cancel">取消</zj-button>
                </template>
                <template v-else>
                  <zj-button type="text" @click="edit(row)">修改</zj-button>
                  <zj-button type="text" @click="del(row)">删除</zj-button>
                </template>
              </template>
            </zj-table-column>
          </zj-table>
          <el-row class="addbtn">
            <zj-button class="append" icon="el-icon-circle-plus-outline"
                       @click="insertTradeTable()"></zj-button>
          </el-row>
        </el-row>
      </el-collapse-item>
      <!--  业务协议-->
      <el-collapse-item name="agreement" class="zj-m-b-20">
        <template slot="title">
          <h4 class="orderTitle">业务协议</h4>
        </template>
      </el-collapse-item>
      <div class="zj-m-20">
        <zj-table class="zj-search-table" :dataList="form.pubAgreementList">
          <zj-table-column type="seq" title="序号" width="60"/>
          <zj-table-column field="fileName" title="协议名称"/>
          <zj-table-column field="id" title="协议模板编号"/>
          <zj-table-column field="version" title="版本号"/>
          <zj-table-column field="remark" title="说明"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{row}">
              <zj-button type="text" @click="downs(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </div>
    </el-collapse>
  </el-form>
</template>

<script>
import agreementDetails from './agreement';

export default {
  components: {
    // agreementDetails
  },
  props: {
    id: String,
  },
  data() {
    return {
      activeNames: ['fee', 'warn'],
      form: {
        projectName: "",
        discountDaysCalculationMethod: "",
        calculateReferenceDays: "",
        interestRateCalculationDays: "",
        minimumDiscountAmount: "",
        ptFeeChargeType: "",
        chargeMethod: "",
        earlyNoticeAmt:"",
        earlyStopDays: "",
        pubAgreementList: "",
      },
      dataList1: [],
      dataList2: [],
      zjControl: {
        getDirectory: this.$api.pubProjectSetting.getEpdProjectDirectory,
        queryDetail: this.$api.pubProjectSetting.queryEpdDetail,
        updateParam: this.$api.pubProjectSetting.updateEpdProjectParam,
      },
      dictionary: {},
      isRemind: []
    }
  },
  created() {
    this.getDict()
  },
  methods: {
    insertTradeTable(){
      this.$refs.tradeTable.insert({reminderMode:[],isremind:'0',remindingParty:'1'})
      let list = this.$refs.tradeTable.getInsertRecords() //获取新增数据
      this.edit(list[0])
    },
    //获取字典
    getDict() {
      this.zjControl.getDirectory().then(res => {
        this.dictionary = res.data
        this.getDetail()
        this.isRemind = res.data.isRemind.map(v => {
          return {
            value: v.code,
            label: v.desc,
          }
        })
        this.dataList1 = res.data.reminderObject.map(v => {
          return {
            reminderObject: v.code,
            name: v.desc,
            isremind: "0",
            remindingParty: "0",//0核心 1运营
            reminderMode: [] // 提醒方式
          }
        })
      })
    },
    // 获取详情信息
    getDetail() {
      this.zjControl.queryDetail({id: this.id}).then(res => {
        // remindingParty: "0",//0核心 1运营
        this.form = res.data
        if(res.data.remindList.length>0){
          this.dataList1 = res.data.remindList.filter(v => v.remindingParty == 0).map(v => {
            return {
              reminderObject: v.reminderObject,
              name: this.dictionary.reminderObject.filter(f => f.code == v.reminderObject)[0].desc,
              isremind: v.isremind,
              remindingParty: v.remindingParty,
              reminderMode: v.reminderMode?(v.reminderMode==2?['0','1']:[v.reminderMode]):[] //提醒方式2全部
            }
          })
          console.log(this.dataList1)
          this.dataList2 = res.data.remindList.filter(v => v.remindingParty == 1).map(v => {
            return {
              reminderObject: v.reminderObject,
              isremind: v.isremind,
              mobileNo: v.mobileNo,
              remindingParty: v.remindingParty,
              reminderMode:  v.reminderMode?(v.reminderMode==2?['0','1']:[v.reminderMode]):[] 
            }
          })
        }
      })
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const {
            calculateReferenceDays,
            chargeMethod,
            discountDaysCalculationMethod,
            earlyStopDays,
            earlyNoticeAmt,
            interestRateCalculationDays,
            minimumDiscountAmount,
            projectName,
            ptFeeChargeType
          } = this.form
          let dataList1 = this.setDataList(this.dataList1, projectName)
          let dataList2 = this.$refs.tradeTable.getTableData().tableData
          dataList2 = this.setDataList(dataList2, projectName)
          let params = {
            "calculateReferenceDays": calculateReferenceDays,
            "chargeMethod": chargeMethod,
            "discountDaysCalculationMethod": discountDaysCalculationMethod,
            earlyNoticeAmt,
            "earlyStopDays": earlyStopDays,
            "interestRateCalculationDays": interestRateCalculationDays,
            "minimumDiscountAmount": minimumDiscountAmount,
            "projectId": this.id,
            "projectName": projectName,
            "ptFeeChargeType": ptFeeChargeType,
            "remindList": dataList2.concat(dataList1)
          };
          this.zjControl.updateParam(params).then(ret => {
            this.$Message.success(ret.msg)
          });
        }
      });
    },
    setDataList(list, projectName, projectId) {
      return list.map(v => {
        let reminderMode
        if (v.reminderMode.length == 1) {
          reminderMode = v.reminderMode[0]
        } else if (v.reminderMode.length == 2) {
          reminderMode = 2 //全部
        }
        return {
          isremind: v.isremind,
          mobileNo: v.mobileNo,
          projectName,
          projectId: this.id,
          reminderMode,
          reminderObject: v.reminderObject,
          remindingParty: v.remindingParty
        }
      })
    },
    //修改
    edit(row) {
      this.$refs.tradeTable.setActiveRow(row)
    },
    //清空激活
    cancel() {
      this.$refs.tradeTable.clearActived()
    },
    // 判断行是否为新增的临时数据 isInsertByRow
    del(rows) {
      this.$refs.tradeTable.remove(rows)
    },
    downs(row) {
      let params = {
        id: row.id,
        protocolName: row.fileName
      }
      this.$api.pubProjectSetting.downloadProtocolPubProject(params);
    },
  },
}
</script>
<style lang="less" scoped>
.zj-table1 {
  margin-left: 200px;
  width: 800px;
}

.zj-table2 {
  margin-left: 200px;
  width: 900px;
}

.addbtn {
  display: flex;
  justify-content: center;
}
</style>


