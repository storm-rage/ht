<template>
  <data-content-block class="hx-data-content-block">
    <div class="title">{{entInfo.entName}}</div>
    <div class="item">
      <div class="left-text">待处理对账单</div>
      <div class="left-num"><span class="num-red-cl">{{detailInfo.pendingAccountBillCount}}</span>笔</div>
      <div class="left-num"><span class="num-red-cl">{{money(detailInfo.pendingAccountBillAmt)}}</span>元</div>
      <div class="right-content" style="width: 50px"><text-link text="立即处理"></text-link></div>
    </div>
    <div class="item">
      <div class="left-text">待处理应收账款转让通知回执</div>
      <div class="left-num"><span class="num-red-cl">{{detailInfo.pendingNoticeReceiptCount}}</span>笔</div>
      <div class="right-content" style="width: 50px"><text-link text="立即处理"></text-link></div>
    </div>
  </data-content-block>
</template>
<script>
import DataContentBlock from '../../components/dataContentBlock';
import TextLink from '../../components/textLink';
import { mapState } from 'vuex'
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
  },
  computed: {
    ...mapState({
      entInfo: state => state.enterprise.entInfo,
    })
  }
};
</script>
