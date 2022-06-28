<template>
  <div id="billDetail">
    <div class="ta-c mb-10 jc20">电子债权凭证详情</div>
      <div class="ta-c mb-20">融单编号：{{detailData.billInfo}}</div>
       <!-- 折叠面板区 -->
      <el-collapse ref="elCollapse" v-model="activeNames" class="zjcoll no-border">
        <div class="tabs-wrap">
          <!--凭证详情-->
          <div>
            <!-- 核心企业直接开立持有的融单 -->
            <el-collapse-item name="pzxq">
              <template slot="title">
                <h4 class="orderTitle">根单编号</h4>
              </template>

              <!-- 核心企业直接开立持有的融单 -->
              <div>
                <!--<div>根单编号：{{detailData.billInfo.rootCode}}</div>-->
                <table class="detail-table" border="0" cellspacing="0" cellpadding="0" width="100%">
                  <tr>
                    <td rowspan="3" class="right">开单企业</td>
                    <td >企业名称</td>
                    <td colspan="2"></td>
                    <td rowspan="5" class="right">收单企业</td>
                    <td>企业名称</td>
                    <td colspan="2"></td>
                  </tr>
                  <tr>
                    <td colspan="1">统一社会信用代码</td>
                    <td colspan="2"></td>
                    <td>统一社会信用代码</td>
                    <td colspan="2"></td>
                  </tr>
                  <tr>
                    <td>业务方</td>
                    <td colspan="2"></td>
                    <td>开户行</td>
                    <td colspan="2"></td>
                  </tr>
                  <tr>
                    <td colspan="2" >开单日期</td>
                    <td colspan="2"></td>
                    <td>银行账号</td>
                    <td colspan="2"></td>
                  </tr>
                  <tr>
                    <td colspan="2" >到期日期</td>
                    <td colspan="2"></td>
                    <td>联行号</td>
                    <td colspan="2"></td>
                  </tr>
                  <tr>
                    <td colspan="2">金额</td>
                    <td colspan="6">（大写）元  （小写）</td>
                  </tr>
                  <tr>
                    <td colspan="2">开单说明</td>
                    <td colspan="6"></td>
                  </tr>
                  <tr>
                    <td colspan="8"><span class="underline red"></span></td>
                  </tr>
                  <tr>
                    <td colspan="8" align="left">
                      <div class="">签章处:</div>
                      <div>
                    <!-- <span v-for="item in detailData.billInfo.entSignatures" :key="item">
                      <img :src="'data:image/png;base64,'+item" alt="签章图片" width="150" height="150">
                    </span> -->
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </el-collapse-item>   
          </div>

          <!-- 贸易背景 -->
          <div>
         
          </div>

          <!-- 融单轨迹 -->
          <div>
          
          </div>
        </div>

      </el-collapse>
    <zj-workflow v-model="workflow" :list="workflowList">
      <el-row slot="right">
        <zj-button @click="''" class="back">返回</zj-button>
      </el-row>
    </zj-workflow>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zjControl: {},
      detailData: {},
      activeNames: 'pzxq',
      workflow: "",
      workflowList:[
        {label:'凭证详情',value:'pzxq'},{label:'贸易背景',value:'mybj'},{label:'流转轨迹',value:'lzgj'}
      ],
    };
  },
  created() {
    this.getApi();
  },
  methods: {
   
  },
};
</script>

<style scoped lang="less">
#billDetail {
  padding: 20px 0;
}
/deep/#ZjWorkflow {
  .workflow-top {
    .el-row {
      padding: 5px 0 0;
      text-align: center;
    }
  }
  .workflow-bottom {
    .right {
      width: calc(50% - 100px);
      text-align: center;
    }
  }
}














</style>
