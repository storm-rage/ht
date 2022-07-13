<template>
  <data-content-block class="yy-data-content-block">
    <div class="item">
      <div class="left-text">本年度累计放款金额</div>
      <div class="right-content"><span class="num-red-cl">{{money('10000000')}}</span>元</div>
    </div>
    <div class="item">
      <div class="left-text">当月累计放款金额</div>
      <div class="right-content"><span class="num-red-cl">{{money('10000000')}}</span>元</div>
    </div>
    <div class="item">
      <div class="left-text">融资余额</div>
      <div class="right-content"><span class="num-red-cl">{{money('10000000')}}</span>元</div>
    </div>
    <div class="item">
      <div class="left-text">客户数量</div>
      <div class="right-content"><span class="num-red-cl">3</span>个</div>
    </div>
    <div class="item" style="margin-top: 30px">
      <div class="left-text">待处理融资申请</div>
      <div class="left-num"><span class="num-red-cl">12</span>笔</div>
      <div class="left-num"><span class="num-red-cl">{{money('10000000')}}</span>元</div>
      <div class="right-content" style="width: 50px"><text-link text="立即处理"></text-link></div>
    </div>
    <div class="item">
      <div class="left-text">待处理注册申请</div>
      <div class="left-num"><span class="num-red-cl">6</span>笔</div>
      <div class="right-content" style="width: 50px"><text-link text="立即处理"></text-link></div>
    </div>
  </data-content-block>
</template>
<script>
import DataContentBlock from '../../components/dataContentBlock';
import TextLink from '../../components/textLink';
export default {
  components: {
    DataContentBlock,
    TextLink
  }
};
</script>
