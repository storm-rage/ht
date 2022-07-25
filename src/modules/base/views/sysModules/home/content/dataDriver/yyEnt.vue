<template>
  <div>
    <data-content-block class="yy-data-content-block">
      <div class="item">
        <div class="left-text">供应商数量</div>
        <div class="right-content"><span class="num-red-cl">{{detailInfo.supplierCount}}</span>个</div>
      </div>
      <div class="item">
        <div class="left-text">待处理平台注册申请</div>
        <div class="left-num"><span class="num-red-cl">{{detailInfo.pendingRegisterApplyCount}}</span>笔</div>
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
