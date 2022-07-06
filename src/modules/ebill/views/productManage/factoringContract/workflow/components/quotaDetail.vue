<template>
  <el-form  ref="form" label-width="160px">
    <zj-content-block>
      <zj-header title="合同信息"></zj-header>
      <zj-content>
        <zj-table :pager="false">
          <zj-table-column
            field="field2"
            title="供应商名称"/>
          <zj-table-column
            field="field3"
            title="合同编号"/>
          <zj-table-column
            field="field3"
            title="合同名称"/>
          <zj-table-column
            field="field3"
            title="合同生效日期"/>
          <zj-table-column
            field="field4"
            title="合同失效日期"/>
          <zj-table-column
            field="field5"
            title="合同状态"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <zj-content-block>
      <zj-header title="额度信息"></zj-header>
      <zj-content>
        <zj-table :pager="false">
          <zj-table-column
            field="field2"
            title="核心企业名称"/>
          <zj-table-column
            field="field3"
            title="核心企业是否海天集团"/>
          <zj-table-column
            field="field3"
            title="应收账款转让期限"/>
          <zj-table-column
            field="field3"
            title="授信额度" :formatter="money"/>
          <zj-table-column
            field="field4"
            title="额度期限"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <zj-content-block>
      <zj-header title="合同/协议信息"></zj-header>
      <zj-content>
        <zj-table :pager="false">
          <zj-table-column
            type="seq"
            width="60"
            title="序号"/>
          <zj-table-column
            field="field3"
            title="合同/协议编号"/>
          <zj-table-column
            field="field3"
            title="合同/协议名称"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" @click="toDownload(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <zj-content-block>
      <zj-header title="申请变更额度"></zj-header>
      <zj-content>
        <el-row :gutter="12">
          <el-col :span="8">
            <el-form-item label="申请增加额度：" prop="field1">
              <zj-number-input disabled formatterMoney v-model="form.field1" placeholder="请输入申请增加额度">
                <template slot="append">元</template>
              </zj-number-input>
              <p class="zj-left">{{digitUp(form.field1)}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="额度到期日：" prop="field2">
              <el-date-picker v-model="form.field2" disabled type="date" placeholder="请选择额度到期日"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="调整后额度：" prop="field3">
              {{money(form.field3)}}元
            </el-form-item>
          </el-col>
        </el-row>
        <div class="zj-m-b-15">
          <zj-content-tip text="注：1.调整后额度=原额度+本次申请增加额度。"></zj-content-tip>
        </div>
        <zj-table :pager="false">
          <zj-table-column
            type="seq"
            width="60"
            title="序号"/>
          <zj-table-column
            field="field3"
            title="合同/协议编号"/>
          <zj-table-column
            field="field3"
            title="合同/协议名称"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" @click="toDownload(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
  </el-form>
</template>
<script>
export default {
  components: {},

  data () {
    return {
      form: {}
    };
  },
  methods: {
    toDownload (row) {}
  }
};
</script>
