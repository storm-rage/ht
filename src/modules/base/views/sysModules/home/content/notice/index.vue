<template>
  <home-content-block class="home-content-notice">
    <zj-header title="公告">
      <template slot="right">
        <right-more-btn @click="toMore"></right-more-btn>
      </template>
    </zj-header>
    <div class="notice-list-block">
      <list-item-block  v-for="(item,index) in list" :key="`${index}notice`">
        <template slot="title">{{item.title}}</template>
        <template slot="tip" v-if="item.isNew">NEW</template>
        <template slot="date">{{item.date}}</template>
      </list-item-block>
    </div>
  </home-content-block>
</template>
<script>
import HomeContentBlock from '../../components/homeContentBlock';
import RightMoreBtn from '../../components/rightMoreBtn';
import ListItemBlock from '../../components/listItemBlock';
export default {
  components: {
    HomeContentBlock,
    RightMoreBtn,
    ListItemBlock
  },
  data () {
    return {
      list: [
        {
          title: '供应链金融平台规则上线',
          isNew: true,
          date: '2022-07-12'
        },
        {
          title: '产品开通申请条件说明（集团很长很长很长很长很长很长很长很长很长很长很长很长很长',
          isNew: true,
          date: '2022-05-28'
        },
        {
          title: '供应商资质规则',
          isNew: false,
          date: '2022-05-18'
        },
        {
          title: '凭证作废复核审批人规则，必须是部分很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
          isNew: false,
          date: '2022-05-08'
        }
      ]
    }
  },
  methods: {
    toMore () {

    }
  }
};
</script>
<style lang="less" scoped>
.home-content-notice {
  .notice-list-block {
  }
}
</style>
