import applyAudit from "./applyAudit.js";
import protocolAudit from "./protocolAudit.js";
import view from "@pubComponent/preview/view.js";
import OperateLog from '@modules/workflow/views/components/operateLog';
import AuditRemark from '@modules/workflow/views/components/auditRemark';
import entInfo from '@modules/base/views/entUserManage/entManage/detail/entInfo.vue'
import {windowSSStorage} from '@utils/storageUtils';
export default {
  components: {
    OperateLog,
    AuditRemark,
    entInfo
  },
  mixins: [
    applyAudit,
    protocolAudit,
    view
  ],
  data() {
    return {
      detailData: {}, //详情数据
      dictionary: {}, //字典
      zjControl: { ...this.$api.registerAudit, ...{ judgeBuyers: this.$api.register.judgeBuyers } }, //api

      workflow: 'sqxx',
      workflowList: [
        { label: '申请信息', value: 'sqxx' }, { label: '审批信息', value: 'spxx' }
      ],
    }
  },
  methods: {
    //返回查询页
    beforeGoParent() {
      windowSSStorage.setItem('registerAuditAudit', '1')
    },
    //获取字典
    getDirectory() {
      this.zjControl.queryEntDataDirectory().then(res => {
        res.data.enterpriseStateCheList = JSON.parse(
          JSON.stringify(res.data.enterpriseStateList).replace(/code/g, 'value').replace(/desc/g, 'label')
        )
        this.dictionary = res.data
      })
    },
    //获取详情
    getAuditDetail() {
      let params = {
        id: this.row.id
      }
      this.zjControl.getAuditDetail(params).then(res => {
        res.data.projectInfoList.map(item => { item.operationFlag = '' })
        this.detailData = res.data
      })
    },
  },
  mounted() {
      this.getApi()
  }
}
