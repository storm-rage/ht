<template>
  <home-content-block class="home-content-message">
    <zj-header title="站内信">
      <template slot="right">
        <right-more-btn @click.native="toMore"></right-more-btn>
      </template>
    </zj-header>
    <div v-loading="loading" ref="messageList" class="message-list-block">
      <list-item-block
        v-for="(item, index) in list"
        :key="`${index}message`"
        is-round
        @click.native="toMore(item)"
      >
        <template slot="title">{{ item.messageTitle }}</template>
        <template slot="tip" v-if="item.isReadFlag=='0'">&nbsp;</template>
        <template slot="date">{{ item.sendDatetime }}</template>
      </list-item-block>
      <el-empty v-if="list.length === 0" style="padding: 0;">
        <template slot="image">
          <div></div>
        </template>
      </el-empty>
    </div>
  </home-content-block>
</template>
<script>
import HomeContentBlock from '../../components/homeContentBlock'
import RightMoreBtn from '../../components/rightMoreBtn'
import ListItemBlock from '../../components/listItemBlock'
export default {
  components: {
    HomeContentBlock,
    RightMoreBtn,
    ListItemBlock
  },
  data () {
    return {
      loading: false,
      zjControl: {
        getMoreMessage: this.$api.home.getMoreMessage
      },
      list: []
    }
  },
  mounted () {
    this.getApi()
    this.getList()
  },
  methods: {
    toMore (item) {
      // this.goChild('homeMessage')
      this.$router.push({
        name: 'homeMessage',
        query: {
          rowId: item.id
        }
      })
    },
    getList () {
      this.loading = true
      this.$refs.messageList.style.minHeight = '60px'
      this.zjControl
        .getMoreMessage({ page: '1', rows: '4' })
        .then(res => {
          this.list = res.data.rows || []
          this.$refs.messageList.style.minHeight = ''
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this.$refs.messageList.style.minHeight = ''
        })
    }
  }
}
</script>
<style lang="less" scoped>
.home-content-message {
  // .message-list-block {
  //   overflow: auto;
  //   margin: 0 -20px -20px;
  //   padding: 0 20px 20px;
  // }
}
</style>
