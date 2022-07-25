<template>
  <div>
    <data-content-block class="yy-data-content-block">
      <div class="item">
        <div class="left-text">本年度累计放款金额</div>
        <div class="right-content"><span class="num-red-cl">{{money(detailInfo.yearLoanAmt)}}</span>元</div>
      </div>
      <div class="item">
        <div class="left-text">当月累计放款金额</div>
        <div class="right-content"><span class="num-red-cl">{{money(detailInfo.monthLoanAmt)}}</span>元</div>
      </div>
      <div class="item">
        <div class="left-text">融资余额</div>
        <div class="right-content"><span class="num-red-cl">{{money(detailInfo.financingAmt)}}</span>元</div>
      </div>
      <div class="item" style="margin-top: 20px">
        <div class="left-text">待处理融资申请</div>
        <div class="left-num"><span class="num-red-cl">{{detailInfo.pendingFinancingApplyCount}}</span>笔</div>
       <!--   todo:少了一个金额     -->
        <div class="left-num"><span class="num-red-cl">{{money(detailInfo.pendingFinancingApplyCount)}}</span>元</div>
        <div class="right-content" style="width: 50px"><text-link text="立即处理"></text-link></div>
      </div>
    </data-content-block>
    <div class="zj-m-t-10" style="font-size: 12px;font-weight: 400;color: #909399">
      注：以上数据截至20022-09-09
    </div>
  </div>

</template>
<script>
import DataContentBlock from '../../components/dataContentBlock';
import TextLink from '../../components/textLink';
export default {
  props: {
    detailInfo: {
      type: Object,
      required: true
    }
  },
  components: {
    DataContentBlock,
    TextLink
  }
};
</script>
