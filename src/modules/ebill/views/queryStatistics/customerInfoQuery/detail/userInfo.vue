<template>
  <zj-content-container>
    <!--  客户信息明细  -->
    <zj-list-layout>
      <zj-table ref="searchTable" :dataList="list" :maxHeight="maxHeight">
        <zj-table-column field="userName" title="姓名" />
        <zj-table-column field="certType" title="证件类型" :formatter="obj=>typeMap(dictionary.entType, obj.cellValue)" />
        <zj-table-column field="certNo" title="证件号码" />
        <zj-table-column field="mobileNo" title="手机号" />
        <zj-table-column field="email" title="邮箱" />
        <zj-table-column field="htSysCode" title="内部系统账号" />
        <zj-table-column field="roleName" title="操作员角色" />
        <zj-table-column field="statementAccountType" title="支持对账单类型" />
      </zj-table>
    </zj-list-layout>
  </zj-content-container>
</template>
<script>
export default {
  components: {},
  props: {
    detailEl: {
      type: Object,
      default: () => {
        return {}
      }
    },
    detailData: {
      type: Object,
      default: ()=>{
        return {}
      }
    },
    dictionary: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      list: [],
      maxHeight: '',
    }
  },
  watch: {
    'detailData.entUserList': {
      handler (val) {
        if (val) {
          this.list = JSON.parse(JSON.stringify(val))
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {},
  mounted () {
    this.maxHeight = this.detailEl.$el
      ? this.detailEl.$el.clientHeight - 36 - 56 - 60 - 62 + 'px'
      : 'auto'
  }
}
</script>
