<template>
  <zj-content-container ref="detailContainer" style="padding-bottom: 0;">
    <zj-workflow v-model="tabs" :list="workflowList">
    </zj-workflow>
    <!--  企业信息明细  -->
    <zj-top-header :title="titleInfo" />
    <keep-alive>
      <ent-info
        v-if="tabs === 'entInfo'"
        :detailData="defailData"
        :zjControl="zjControl"
        :dictionary="dictionary"
        :zjBtn="zjBtn"
      />
      <user-info
        v-if="tabs === 'userInfo'"
        :detailEl="$refs.detailContainer"
        :detailData="defailData"
        :zjControl="zjControl"
        :dictionary="dictionary"
        :zjBtn="zjBtn"
      />
    </keep-alive>
    <zj-content-footer style="margin-top: 20px;">
      <zj-button class="submit-button" @click="goParent">返回</zj-button>
    </zj-content-footer>
  </zj-content-container>
</template>
<script>
import entInfo from './entInfo'
import userInfo from './userInfo'
export default {
  name: 'entInfoDetail',
  components: {
    entInfo,
    userInfo
  },
  computed: {
    titleInfo () {
      return this.tabs === 'entInfo'
        ? '企业信息明细'
        : this.tabs === 'userInfo'
        ? '客户信息明细'
        : ''
    }
  },
  data () {
    return {
      detailId: '', // 当前的详情id
      tabs: 'entInfo',
      workflowList: [
        { label: "企业信息", value: "entInfo" },
        { label: "用户信息", value: "userInfo" },
      ],
      zjControl: {
        getEntInfoDetail: this.$api.entInfoQuery.getEntInfoDetail,
        getDirectory: this.$api.entInfoQuery.getDirectory, // 数据字典
      },
      dictionary: {},
      defailData: {}
    }
  },
  methods: {
    getDictionary () {
      this.zjControl.getDirectory().then(res => {
        this.dictionary = Object.assign({}, res.data)
      })
    },
    getDetail () {
      this.detailId = this.$route.query.rowId
      this.zjControl
        .getEntInfoDetail({id: this.detailId})
        .then(res => {
          this.defailData = res.data || {}
        })
        .catch(() => {})
    }
  },
  activated() {
    (this.detailId!=this.$route.query.rowId) && this.getDetail()
  },
  created () {
    this.getApi()
    this.getDictionary()
    this.getDetail()
  }
}
</script>
