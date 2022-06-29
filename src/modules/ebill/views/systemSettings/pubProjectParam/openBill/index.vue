<template>
  <div>
    <el-form :model="form" ref="addFormData" label-width="260px">
      <el-form-item label="开单模式支持：" prop="billModel">
       {{transferBillMode(form.billModel)}}
      </el-form-item>
      <el-form-item label="核心企业开单额度模式支持：" prop="buyerLimitModel">
        {{transferBuyerLimitModel(form.buyerLimitModel)}}
        <el-row>
          <div v-for="(item,index) in buyerLimitExpire" :key="index" class="buyer-limit-expire">
            <b class="zj-row">{{item.title}}</b>
            {{item.content}}
          </div>
        </el-row>
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
      deep:true,
      handler: function () {
        this.form = this.value;
      }
    }
  },
  computed: {
    buyerLimitExpire () {
      if(this.buyerLimitModel === 'All') {
        return [
          {title:'什么是共用额度？',
            content:'共用额度仅限总公司拥有，资金方不能给子分公司分配共用额度。当资金方为总公司分配了共用额度后，其子分公司同时与总公司一同享有该额度的使用权。'},
          {title:'什么是自用额度？',
            content:'资金方可将该额度分配给任一企业，对总公司可配置“是否可分配”，可分配的额度，总公司可自行分配给子分公司使用。'}
        ]
      } else if (this.buyerLimitModel === '1') {
        return [
          {title:'什么是共用额度？',
            content:'共用额度仅限总公司拥有，资金方不能给子分公司分配共用额度。当资金方为总公司分配了共用额度后，其子分公司同时与总公司一同享有该额度的使用权。'},
        ]
      } else if (this.buyerLimitModel === '2') {
        return [
          {title:'什么是自用额度？',
            content:'资金方可将该额度分配给任一企业，对总公司可配置“是否可分配”，可分配的额度，总公司可自行分配给子分公司使用。'}
        ]
      }
    }
  },
  data () {
    return {
      form: this.value,
      buyerLimitModel: '',
    };
  },
  methods: {
    transferBillMode (billMode) {
      if (billMode === '0') {
        return  '固定，非固定';
      }
      if (billMode && this.dics.billModelList) {
        const billModes = billMode.split(',');
        const desc = [];
        this.dics.billModelList.forEach(item => {
          if (billModes.indexOf(item.code) >= 0) {
            desc.push(item.desc)
          }
        });
        return desc.join(',');
      }
    },
    transferBuyerLimitModel (buyerLimitModel) {
      if (buyerLimitModel === '11') {
        this.buyerLimitModel = 'All';
        return  '共用额度，自用额度'
      } else if (buyerLimitModel === '10') {
        this.buyerLimitModel = '1';
        return  '共用额度'
      } else if (buyerLimitModel === '01') {
        this.buyerLimitModel = '2';
        return  '自用额度'
      }
    }
  }
};
</script>
<style lang="less" scoped>
.buyer-limit-expire{
  float: left;
  width: 250px;
  padding: 5px 12px;
  height: 150px;
  font-size: 12px;
  margin-right: 15px;
  background-color: #ECF5FD;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}
</style>
