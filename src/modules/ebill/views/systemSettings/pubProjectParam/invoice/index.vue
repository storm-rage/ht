<template>
  <div>
    <el-form :model="form" ref="addFormData" label-width="260px">
      <el-form-item label="上传合同发票模式支持：" prop="attachUploadModel">
        <el-checkbox-group v-model="form.attachUploadModel">
          <el-checkbox
            v-for="(item, index) in contractModeList"
            :key="index"
            :label="item.id">{{item.desc}}</el-checkbox>
        </el-checkbox-group>
        <div v-if="form.attachUploadModel.indexOf('3')>=0">
          <el-radio
            v-for="(item, index) in dics.transferUploadModelList"
            :key="index"
            v-model="form.transferAttachModel"
            style="display: block"
            :label="item.code">{{item.desc}}</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="启用OCR发票识别：" prop="isOcrSupport" v-if="form.sysOcrFlag == '1'">
        <el-switch
                   class="zj-switch-text"
                   :active-text="form.isOcrSupport=='1'?'已启用':'已关闭'"
                   active-value="1"
                   inactive-value="0"
                   v-model="form.isOcrSupport"/>

        <div v-if="form.isOcrSupport === '1'">
          <el-checkbox-group v-model="form.ocrInvoiceMode">
            <el-checkbox
              v-for="(item, index) in dics.uploadModelList"
              :key="index"
              :label="item.code">{{item.desc}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item label="开通发票验真：" prop="isInvoiceCheck">
        <el-checkbox
          v-model="form.isInvoiceCheck"
          true-label="1"
          false-label="0">是</el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    value: Object,
    dics: Object,
    contractMode: Array
  },
  watch: {
    value: {
      deep: true,
      handler: function () {
        this.form = this.value;
      }
    }
  },
  computed: {
    contractModeList () {
      const  contractModeList =  [
        {id: '1',code: '1', desc: '开单'},
        {id: '2',code: '1', desc: '融资'},
        {id: '3',code: '1', desc: '转让'}
      ]
      return contractModeList.filter(item => {
        return this.contractMode.indexOf(item.id) >= 0;
      });
    }
  },
  data () {
    return {
      form: this.value
    };
  },
  methods: {
    validateInvoiceForm () {
      let result = false;
      this.$refs.addFormData.validate((valid) => {
        result = valid;
      });
      return result;
    },
  }
};
</script>
<style></style>
