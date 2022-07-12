import applyAudit from "./applyAudit.js";
import protocolAudit from "./protocolAudit.js";
import registerAuditAttach from "./registerAuditAttach.js";
import project from "../../../../project.js";
import view from "@pubComponent/preview/view.js";
// import entBaseInfo from "@modules/workflow/views/entUserManage/components/entBaseInfo";
export default {
  components: {
    // entBaseInfo
  },
  mixins: [
    applyAudit,
    protocolAudit,
    registerAuditAttach,
    project,
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
      //折叠
      sqxxCollapseList: ['entInfo', 'userInfo', 'attach', 'entOtherInfo'],
      spxxCollapseList: ['spxx'],

    }
  },
  methods: {
    //返回查询页
    beforeGoParent() {
      sessionStorage.setItem('registerAuditAudit', '1')
    },
    //获取字典
    getDirectory() {
      this.zjControl.queryEntDataDirectory().then(res => {
        res.data.enterpriseStateCheList = JSON.parse(
          JSON.stringify(res.data.enterpriseStateList).replace(/code/g, 'value').replace(/desc/g, 'label')
        )
        this.dictionary = res.data
        this.projectInit()
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

        //审核时
        if (this.$route.name === 'registerAuditApplyAudit') {
          //审批信息表单
          if (res.data.entType) {
            this.entTypeChange(res.data.entType)
          }
          for (let key in this.form) {
            this.form[key] = res.data[key]
          }
          if (this.form.projectInfoList.length <= 0) {
            this.form.projectInfoList.push({
              id: '',
              projectId: '',
              projectName: '',
              operationFlag: 'A',
              selectProductList: []
            })
          }
          //我的买方企业
          this.myBuyersBlur()
        }
        //确认时
        else if (this.$route.name === 'registerAuditProtocolAudit') {
          this.initElse()
        }
        //获取预览图
        this.initAttchInfo()
        //所属项目初始化
        this.projectInit()
      })
    },
  },
  mounted() {
    this.getRow()
    this.getApi()
    this.eyeSkyId = this.row.id
    this.getDirectory()
    this.getAuditDetail()

    if (this.$route.name === 'registerAuditApplyAudit') {
      //获取所属项目
      this.projectApi = this.$api.registerAudit.getProjectList
      this.getProjectList()
    }

    //设置工作流--确认时
    if (this.$route.name === 'registerAuditProtocolAudit') {
      this.workflowList = []
    }

  }
}
