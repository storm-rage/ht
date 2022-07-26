<template>
  <home-content-block class="home-content-message">
    <zj-header title="站内信">
      <template slot="right">
        <right-more-btn @click.native="toMore"></right-more-btn>
      </template>
    </zj-header>
    <div class="message-list-block">
      <list-item-block  v-for="(item,index) in list" :key="`${index}message`" is-round>
        <template slot="title">{{item.title}}</template>
        <template slot="tip" v-if="item.isNotRead">&nbsp;</template>
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
          title: '电子债券转让通知',
          date: '2022-07-12',
          isNotRead: true
        },
        {
          title: '融单签收',
          date: '2022-08-12',
          isNotRead: true
        },
        {
          title: '生长公司集团债券转让1200000.000很长0.000很长0.000很长0.000很长0.000很长0.000很长0.000很长0.000很长0.000很长0.000很长0.000很长',
          date: '2022-08-12',
          isNotRead: true
        },
        {
          title: '广州公司很长司很长司很长司很长司很长司很长司很长司很长司很长司很长司很长司很长司很长司很长司很长司很长司很长',
          date: '2022-08-12',
          isNotRead: false
        }
      ]
    }
  },
  methods: {
    toMore () {
      this.goChild('homeNotice')
    }
  }
};
</script>
<style lang="less" scoped>
.home-content-message {
}
</style>
