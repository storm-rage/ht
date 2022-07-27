<template>
  <div class="basicInfo">
    <ZjTopHeader>平台基础信息设置</ZjTopHeader>

    <ZjHeader>平台信息</ZjHeader>
    <div class="formBox">
      <el-form
        ref="form"
        class="mbi-form"
        :model="searchForm"
        :rules="formRules"
        :class="editFlag ? '' : 'nmb0'"
        label-width="180px"
      >
        <el-form-item prop="platFormName" label="平台名称：">
          <el-input
            v-model="searchForm.platFormName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>
        <el-form-item prop="entName" label="平台运营企业名称：">
          <el-input
            v-model="searchForm.entName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>
      </el-form>
    </div>
    <ZjHeader>运营信息</ZjHeader>
    <h4>邮寄地址</h4>

    <div class="formBox">
      <el-form
        ref="form1"
        class="mbi-form"
        :model="searchForm"
        :rules="formRules"
        :class="editFlag ? '' : 'nmb0'"
        label-width="180px"
      >
        <el-form-item prop="fastMailName" label="收件人：">
          <el-input
            v-model="searchForm.fastMailName"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>
        <el-form-item prop="fastMailTel" label="收件人电话：">
          <el-input
            v-model="searchForm.fastMailTel"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>
        <el-form-item prop="fastMailAddres" label="收件地址：">
          <el-input
            v-model="searchForm.fastMailAddres"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>
        <el-form-item prop="servicePhone" label="客服电话：">
          <el-input
            v-model="searchForm.servicePhone"
            @keyup.enter.native="enterSearch"
          />
        </el-form-item>
      </el-form>
    </div>
    <ZjContentFooter>
      <div class="footerBtnBox">
        <zj-button type="primary" @click="affirm">确认</zj-button>
        <zj-button @click="toRouter">返回</zj-button>
      </div>
    </ZjContentFooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {},
      editFlag: false,
      formRules: {
        platFormName: [
          {
            required: true,
            message: "请输入平台名称",
            trigger: "blur",
          },
        ],
        entName: [
          {
            required: true,
            message: "请输入平台运营企业名称",
            trigger: "blur",
          },
        ],
        fastMailName: [
          { required: true, message: "请输入收件人", trigger: "blur" },
        ],
        fastMailTel: [
          { required: true, message: "请输入收件人电话", trigger: "blur" },
        ],
        fastMailAddres: [
          { required: true, message: "请输入收件地址", trigger: "blur" },
        ],
        servicePhone: [
          { required: true, message: "请输入客服电话", trigger: "blur" },
        ],
      },
      zjControl: {
        platFormList: this.$api.basicInfo.platFormList, //查询平台系统设置
        platFormEad: this.$api.basicInfo.platFormEad, //修改参数
      },
    };
  },
  created() {
    this.platFormListAp1();
  },
  methods: {
    //查询接口
    platFormListAp1() {
      this.zjControl.platFormList().then((res) => {
        if (res.code === 200) {
          this.searchForm = res.data;
        }
      });
    },
    //确认按钮
    affirm() {
      let params = {
        platFormName: this.searchForm.platFormName, //平台名称
        entName: this.searchForm.entName, //平台运营企业名称
        fastMailName: this.searchForm.fastMailName, //收件人
        fastMailTel: this.searchForm.fastMailTel, //收件人电话
        fastMailAddres: this.searchForm.fastMailAddres, //收件人地址
        servicePhone: this.searchForm.servicePhone, //客服电话
      };
      this.zjControl.platFormEad(params).then((res) => {
        if (res.code === 200) {
          this.$Message.success("修改成功！");
          this.platFormListAp1();
        }
      });
    },
    //返回按钮
    toRouter() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style lang="less" scoped>
.basicInfo {
  > h4 {
    margin-left: 40px;
    margin-bottom: 10px;
    font-size: 16px;
  }
}
</style>