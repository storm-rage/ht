<template>
  <home-content-block class="home-content-notice">
    <zj-header title="公告">
      <template slot="right">
        <right-more-btn @click.native="toMore"></right-more-btn>
      </template>
    </zj-header>
    <div v-loading="loading" ref="noticeList" class="notice-list-block">
      <list-item-block
        v-for="(item, index) in list"
        :key="`${index}notice`"
        @click.native="toMore(item)"
      >
        <template slot="title">{{ item.theme }}</template>
        <template slot="tip" v-if="item.isReadFlag=='0'">NEW</template>
        <template slot="date">{{ item.createDatetime }}</template>
      </list-item-block>
      <el-empty v-if="list.length === 0" style="padding: 0;">
        <!-- 占位取消图片 -->
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
        getSysNoticePage: this.$api.home.getSysNoticePage
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
      // this.goChild('homeNotice', item || {})
      this.$router.push({
        name: 'homeNotice',
        query: {
          rowId: item.id
        }
      })
    },
    getList () {
      this.loading = true
      this.$refs.noticeList.style.minHeight = '60px'
      this.zjControl
        .getSysNoticePage()
        .then(res => {
          this.list = res.data.rows || []
          this.$refs.noticeList.style.minHeight = ''
          this.loading = false
        })
        .catch(err => {
          this.$refs.noticeList.style.minHeight = ''
          this.loading = false
        })
    }
  }
}
</script>
<style lang="less" scoped>
.home-content-notice {
  .notice-list-block {
    overflow: auto;
    // margin: 0 -20px -20px;
    // padding: 0 20px 20px;
    margin-right: -20px;
    padding-right: 20px;
  }
}
</style>
