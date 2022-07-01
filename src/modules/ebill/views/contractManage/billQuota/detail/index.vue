<template>
  <zj-content-container>
    <zj-top-header :title="title"></zj-top-header>
     <!--  合同信息  -->
    <zj-content-block>
      <zj-header title="合同信息"></zj-header>
      <zj-content>
        <zj-table :dataList="contractList">
          <zj-table-column
            field="field1"
            title="合同编号"/>
          <zj-table-column
            field="field2"
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
    <!--  额度信息  -->
    <zj-content-block>
      <zj-header title="额度信息"></zj-header>
      <zj-content>
        <zj-table :dataList="quotaList">
          <zj-table-column
            field="field1"
            title="买方企业名称"/>
          <zj-table-column
            field="field2"
            title="应收账款转让期限"/>
          <zj-table-column
            field="field3"
            title="授信额度" :formatter="money"/>
          <zj-table-column
            field="field4"
            title="额度期限（月）"/>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <!--  协议信息  -->
    <zj-content-block>
      <zj-header title="协议信息"></zj-header>
      <zj-content>
        <zj-table :dataList="fileList">
          <zj-table-column type="seq" title="序号" width="60"/>
          <zj-table-column
            field="field1"
            title="合同/协议编号"/>
          <zj-table-column
            field="field2"
            title="合同/协议名称"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" @click="toDownload(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <!--  变更信息填写  -->
    <zj-content-block>
      <zj-header title="申请变更额度"></zj-header>
      <zj-content>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-row :gutter="12">
            <el-col :span="8">
              <el-form-item label="申请增加额度：" prop="field1">
                <zj-number-input :disabled="!isEdit" formatterMoney v-model="form.field1" placeholder="请输入申请增加额度">
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
        </el-form>
      </zj-content>
    </zj-content-block>
  </zj-content-container>
</template>
<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    title: String
  },
  data() {
    return {
      contractList: [
        {
          field1: '4565654654',
          field2: '国内商业保理合同',
          field3: '2021-01-01',
          field4: '2024-01-01',
          field5: '生效'
        }
      ],
      quotaList: [
        {
          field1: '海天a公司',
          field2: '2022-09-09 ～ 2023-09-08',
          field3: '100,000,000.00',
          field4: '4',
        }
      ],
      fileList: [
        {
          field1: '123455',
          field2: '《国内商业保理合同》'
        }
      ],
      form: {
        field1: '',
        field2: '2024-03-01',
        field3: '1999'
      },
      rules: {
        field1: [
          {required: true,message: '请输入申请增加额度',trigger: ['blur','change']}
        ],
        field2: [
          {required: true,message: '请选择额度到期日',trigger: ['blur','change']}
        ]
      }
    }
  },
  methods: {
    toDownload(row) {},
    //获取表单
    getForm () {
      return this.$refs.form;
    }
  }
};
</script>
