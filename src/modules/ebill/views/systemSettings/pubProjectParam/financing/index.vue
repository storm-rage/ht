<template>
  <div>
    <el-form :model="form" ref="addFormData" label-width="260px">
      <el-form-item label="基础贸易合同名称和编号的必填情况：" prop="baseContractRequired">
        <el-checkbox-group v-model="form.baseContractRequired">
          <el-checkbox
            v-for="(item, index) in contractRequiredList"
            :key="index"
            :label="item.id">{{item.desc}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    value: Object,
    dics: Object
  },
  watch: {
    value: {
      deep: true,
      handler: function () {
        this.form = this.value;
      }
    }
  },
  data () {
    return {
      form: this.value,
      contractRequiredList: [
        {
          id: '1',
          code: '1',
          desc: '合同名称必填'
        },
        {
          id: '2',
          code: '1',
          desc: '合同编号必填'
        }
      ]
    };
  },
  methods: {
    validateFinancingForm () {
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
