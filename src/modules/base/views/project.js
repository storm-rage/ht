export default {
  data(){
    return {
      projectApi:this.$api.registerAudit.getProjectList,//所属项目Api  -- 默认使用注册审核的
      projectInfoList:[],//所属项目列表
      projectInfoListCHECKBOX:[],
    }
  },
  methods:{
    //获取所属项目
    getProjectList(){
      this.projectApi({}).then(res => {
        res.data.projectInfoList.map(item => item.disabled = false)
        this.projectInfoList = res.data.projectInfoList
        this.projectInfoListCHECKBOX = [...[],...JSON.parse(
          JSON.stringify(this.projectInfoList).replace(/code/g,'key').replace(/desc/g,'label')
        )]
      })
    }
  },

}
