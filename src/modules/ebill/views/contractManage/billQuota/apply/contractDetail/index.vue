<template>
  <zj-content-container>
    <zj-top-header title="国内商业保理合同详情"></zj-top-header>
    <zj-content-block>
      <zj-header title="合同信息"></zj-header>
      <zj-content>
        <el-form label-width="120px" ref="form" size="mini">
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同类型：">
                <span>国内商业保理合同</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同编号：">
                <span>xxxxxxx</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同有效期间：">
                <span>2022.09.09 至 2023.09.08</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="合同状态：">
              <span>生效</span>
            </el-form-item>
          </el-row>
        </el-form>
        <zj-table :dataList="contractList">
          <zj-table-column type="seq" title="序号" width="60"/>
          <zj-table-column
            field="field1"
            title="合同/协议编号"/>
          <zj-table-column
            field="field2"
            title="合同名称"/>
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" @click="toDownload(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <zj-content-block>
      <zj-header title="额度信息"></zj-header>
      <zj-content>
        <zj-table :dataList="quotaList"  @radio-change="handleRadioChange" :radio-config="{highlight: true}">
          <zj-table-column type="radio"  width="60"/>
          <zj-table-column type="seq" title="序号" width="60"/>
          <zj-table-column
            field="field1"
            title="买方企业名称"
          />
          <zj-table-column
            field="field2"
            title="应收账款转让期限"
          />
          <zj-table-column field="field3" title="授信额度" :formatter="money"/>
          <zj-table-column field="field4" title="额度期限（月）" />
        </zj-table>
      </zj-content>
    </zj-content-block>
    <zj-content-block>
      <zj-header title="相关协议"></zj-header>
      <zj-content>
        <zj-table :dataList="fileList">
          <zj-table-column type="seq" title="序号" />
          <zj-table-column
            field="field1"
            title="协议编号"
          />
          <zj-table-column
            field="field2"
            title="买方企业名称"
          />
          <zj-table-column field="field3" title="合同/协议名称" />
          <zj-table-column
            field="field4"
            title="生效日期"
            :formatter="date"
          />
          <zj-table-column field="field5" title="合同/协议状态" />
          <zj-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <zj-button type="text" @click="toDownload(row)">下载</zj-button>
            </template>
          </zj-table-column>
        </zj-table>
      </zj-content>
    </zj-content-block>
    <zj-content-footer>
      <zj-button class="back" @click="$router.push('/productsOpened')">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
export default {
  data() {
    return {
      contractList: [
        {
          field1: 'fsdfsdffsfd',
          field2: '国内商业保理合同'
        }
      ],
      quotaList: [
        {
          field1: '1',
          field2: '海天a公司',
          field3: '2022.09.09 ～ 2023.09.08',
          field4: '100,000,000.00',
          field5: '4'
        },
        {
          field1: '2',
          field2: '海天b公司',
          field3: '2022.09.09 ～ 2023.09.08',
          field4: '100,000,000.00',
          field5: '5'
        }
      ],
      fileList: []
    };
  },
  methods: {
    toDownload(row) {},
    handleRadioChange({row}){
      if (row.field1 === '1') {
        this.fileList = [{
          field1: '123455',
          field2: '海天b公司',
          field3: '《应收账款保理业务申请书》',
          field4: '2022.09.09',
          field5: '生效'
        }]
      }else {
        this.fileList = [{
          field1: '645645645',
          field2: '海天A公司',
          field3: '《应收账款保理业务申请书》',
          field4: '2022.09.09',
          field5: '生效'
        }]
      }
    }
  },
};
</script>
