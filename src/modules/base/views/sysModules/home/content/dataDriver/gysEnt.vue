<template>
  <data-content-block class="gys-data-content-block">
    <div class="title">{{entInfo.entName}}</div>
    <div class="item">
      <div class="left-text">待签收凭证</div>
      <div class="left-num"><span class="num-red-cl">12</span>笔</div>
      <div class="left-num"><span class="num-red-cl">{{money('10000000')}}</span>元</div>
      <div class="right-content" style="width: 50px"><text-link text="立即签收"></text-link></div>
    </div>
    <div class="item">
      <div class="left-text">可使用凭证</div>
      <div class="left-num"><span class="num-red-cl">{{money('10000000')}}</span>元</div>
      <div class="right-content"><text-link text="申请融资"></text-link>&nbsp;&nbsp;&nbsp;<text-link text="申请转让"></text-link></div>
    </div>
  </data-content-block>
</template>
<script>
import DataContentBlock from '../../components/dataContentBlock';
import TextLink from '../../components/textLink';
import { mapState } from 'vuex'
export default {
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
