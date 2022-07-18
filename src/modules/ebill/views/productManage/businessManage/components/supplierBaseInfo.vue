<template>
  <el-form :model="form" ref="form" :rules="rules" label-width="160px">
    <zj-content-block>
      <zj-header :title="title"></zj-header>
      <zj-content>
        <zj-table :dataList="customList" :pager="false">
          <zj-table-column
            field="sellerName"
            title="供应商名称"/>
          <zj-table-column
            field="isHtEnterprise"
            title="是否海天一级供应商" :formatter="(obj) => typeMap(dic.isHtEnterprise, obj.cellValue)"/>
          <zj-table-column
            field="sellerCode"
            title="供应商业务系统编码"/>
          <zj-table-column
            field="bizLicence"
            title="供应商统一社会信用代码"/>
          <zj-table-column
            field="productType"
            title="申请产品">
            <template v-slot="{row,rowIndex}">
              <div v-if="row.productType">
                <el-tag v-for="(item,index) in row.productType.split(',')" size="mini" :key="`${rowIndex}${index}productType`">
                  {{typeMap(dic.productType,item)}}
                </el-tag>
              </div>
            </template>
          </zj-table-column>
        </zj-table>
        <div>
          <zj-collapse title="供应商业务联系人"  class="zj-m-t-10">
            <el-row>
              <el-col :span="8">
                <el-form-item label="联系人：" prop="businessPerson">
                  <el-input :disabled="!isEdit" v-model="form.businessPerson"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系号码：" prop="businessPhone">
                  <el-input :disabled="!isEdit" v-model="form.businessPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系邮箱：" prop="businessEmail">
                  <el-input :disabled="!isEdit" v-model="form.businessEmail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系地址：" prop="businessAddress">
                  <el-input :disabled="!isEdit" v-model="form.businessAddress"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </zj-collapse>
          <zj-collapse title="供应商收款账户" class="zj-m-t-10">
            <el-row>
              <el-col :span="8">
                <el-form-item label="银行账户名称：" >
                  <el-input :disabled="!isEdit" v-model="form.bankAccname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户银行：">
                  <el-input :disabled="!isEdit" v-model="form.bankName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行账号：">
                  <el-input :disabled="!isEdit" v-model="form.bankAccno"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </zj-collapse>
        </div>
      </zj-content>
    </zj-content-block>
  </el-form>
</template>
<script>
export default {
  props: {
    // 标题
    title:String,
    //详情数据
    params: {
      type: Object,
      default:() => {
        return {}
      }
    },
    //字典信息
    dic:Object,
    // 是否可以编辑信息
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    params: {
      deep: true,
      handler () {
        this.form = this.params;
        this.customList = [this.params];
      }
    }
  },
  data () {
    return {
      form: this.params,
      rules: {},
      customList: []
    };
  },
  methods: {
    getForm () {
      return this.$refs.form;
    },
    getData () {
      return this.form;
    }
  }
};
</script>
