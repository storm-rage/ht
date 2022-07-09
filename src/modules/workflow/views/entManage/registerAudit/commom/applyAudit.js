export default {
  data(){
    return {
      //审批信息
      form:{
        id:'',
        name:'',
        myBuyers:'',
        customCode:'',
        shortName:'',
        beforeName:'',
        projectInfoList:[],
        entType:'',
        parentEntId:'',
        sealEntId:'',
        supplierType:'',
        supplierTradeList:[],
        notes:'',
        submitAuditFlag:''
      },
      rules:{
        shortName:[
          {required: true, message: '请填写企业简称',trigger:'change'},
          {max:100, message: '企业简称不可超过100字符',trigger:'change'}
        ],
        entType:[{required: true, message: '请选择平台客户类型',trigger:'change'}],
        sealEntId:[{required: true, message: '请选择签章企业',trigger:'change'}],
        supplierType:[{required: true, message: '请选择供应商类型',trigger:'change'}],
        notes:[{required: false, message: '请输入审核意见',trigger:'change'}],
      },
      parentList:[],//隶属企业列表
      sealList:[],//签章企业列表
      //间接供应商--贸易关系维护--动过的数据
      recordList:[],
      //我的买方企业提示
      myBuyersMessage:''
    }
  },
  methods:{
    //我的买方企业
    myBuyersBlur(){
      if(this.form.myBuyers){
        let params = {
          myBuyers:this.form.myBuyers,
          registerWebsite:this.detailData.registerWebsite
        }
        this.zjControl.judgeBuyers(params).then(res => {
          this.myBuyersMessage = res.data.msg
        })
      }else{
        this.myBuyersMessage = ''
      }
    },

    //操作用户信息---联网核查
    networkInspect(item){
      let params = {
        id:item.id
      }
      this.zjControl.validateReal(params).then(()=>{
        this.getAuditDetail()
      }).catch(()=>{
        this.getAuditDetail()
      })
    },
    //所属项目校验
    projectValidator(rule, value, callback){
      if(rule.required && !value && rule.item.operationFlag !== 'D'){
        callback(new Error('请选择所属项目'));
      }else if( rule.required && rule.item.operationFlag !== 'D' && this.form.projectInfoList[rule.index].selectProductList.length <= 0 ){
        callback(new Error('请选择产品'));
      }else{
        callback()
      }
    },
    //所属项目初始化
    projectInit(){
      this.projectInfoListCHECKBOX.map(item => {
        item.disabled = this.form.projectInfoList.some(citem => citem.projectId === item.projectId)
      })
    },
    //新增所属项目
    projectAdd(){
      this.form.projectInfoList.push({
        id:'',
        projectId:'',
        projectName:'',
        operationFlag:'A',
        selectProductList:[],
      })
    },
    //修改所属项目
    projectEdit(item){
      if(item.operationFlag){
        if(item.operationFlag === 'A'){
          item.operationFlag = 'A'
        }else{
          item.operationFlag = 'u'
        }
      }else{
        item.operationFlag = 'U'
      }
      item.projectName = this.projectInfoListCHECKBOX.find(citem => citem.projectId === item.projectId).projectName
      //再次调用初始化
      this.projectInit()
    },
    //删除所属项目
    projectDel(item,index){
      if(item.operationFlag === 'A'){
        this.form.projectInfoList.splice(index,1)
      }else{
        item.operationFlag = 'D'
        item.selectProductList = []
      }
      this.projectInfoListCHECKBOX.map(citem => {
        if(citem.projectId=== item.projectId){
          citem.disabled = false
        }
      })
    },

    // ---------------------        --------------------------
    //平台客户类型发生改变
    entTypeChange(type,newId){
      if(type === 'B'){
        let params = {
          id:this.row.id,
          parentEntId:newId && typeof(newId) !== 'boolean' ? newId : this.detailData.parentEntId
        }
        this.zjControl.getCoreAuditInfo(params).then(res=> {
          this.parentList = res.data.parentEntList
          this.sealList = res.data.sealEntList
          //清空供应商类型
          this.form.supplierType = ''
          //清空间接供应商记录
          this.recordList = []
          if(newId || typeof(newId) === 'boolean'){
            this.form.sealEntId = ''
          }
          this.$nextTick(() => {
            // this.$refs.form.clearValidate('sealEntId')
            this.$refs.form.clearValidate()
          })
        })
      }
      else if(type === 'S'){
        let params = {
          id:this.row.id
        }
        this.zjControl.getSupTradeInfo(params).then(res=>{
          this.$set(
            this.form,
            'supplierTradeList',
            res.data.supplierTradeList || []
          )
        })
      }
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    //当隶属企业发生改变
    parentChange(id){
      this.entTypeChange('B',id)
    },
    //隶属企业清空
    parentClear(){
      this.entTypeChange('B',true)
    },
    //供应商类型改变
    supplierChange(){
      if(this.$refs && this.$refs.form){
        this.$refs.form.validateField('supplierType')
      }
    },
    //供应商关系上传
    uploadSupLier({file,data}){
      let formData = new FormData()
      formData.append('file',file)
      this.zjControl.uploadAttach(formData).then(res => {
        data.row.fileId = res.data.fileId
        data.row.attachName = res.data.fileName
        this.$Message.success('证明材料上传成功!')

        this.uploadRecord(data.row) //记录上传
      })
    },
    //供应商关系附件下载
    downSupLier(row){
      let params = {
        fileId:row.fileId,
        fileName:row.attachName
      }
      this.zjControl.downloadFile(params)
    },
    //上传记录
    uploadRecord(row){
      let index = this.recordList.findIndex(item => item.id === row.id)
      if(index > -1){
        this.recordList.splice(index,1,row)
      }else{
        this.recordList.push(row)
      }
    },
    //前置
    beforeBtn(flag){
      let params = Object.assign({},this.form)
      if(params.entType === 'B'){
        params.supplierType = ''
        params.supplierTradeList = []
      }else if(params.entType === 'S'){
        params.parentEntId = ''
        params.sealEntId = ''
        params.supplierTradeList = params.supplierType === '02' ? this.recordList : []
      }
      params.id = this.row.id
      params.customCode = this.form.customCode
      params.submitAuditFlag = flag
      return params
    },
    //暂存
    holdSave(){
      this.$refs.form.validateField('entType',bo=>{
        if(bo){return this.$Message.warning(bo)}
        if(this.form.entType === 'S'){
          this.$refs.form.validateField('supplierType',boo=>{
            if(boo){return this.$Message.warning(boo)}
            let params = this.beforeBtn('1')
            this.zjControl.submitAudit(params).then(()=>{
              this.$Message.success('暂存成功！')
              this.goParent()
            })
          })
        }else{
          let params = this.beforeBtn('1')
          this.zjControl.submitAudit(params).then(()=>{
            this.$Message.success('暂存成功！')
            this.goParent()
          })
        }
      })
    },
    //通过校验
    auditPass(){
      this.$refs.form.validate(boo => {
        if(!boo){return}
        //03.18后加条件
        if(this.form.supplierType === '02'){
          if(!this.form.supplierTradeList.length){
            return this.$Message.error('间接供应商无贸易关系，请维护该卖方企业的贸易关系')
          }
          //一条数据没动过
          else if(!this.recordList.length){
            //遍历旧的是否全部没有fileId
            let fileKey = this.form.supplierTradeList.every(item => !item.fileId)
            if(fileKey){
              return this.$Message.error('至少需要上传一份证明材料！')
            }
          }else{
            this.auditPassCheck()
          }
        }else{
          this.auditPassCheck()
        }
      })
    },
    //通过确认
    auditPassCheck(){
      //判断是否存在  联网核查失败
      if(this.detailData.entUserList && this.detailData.entUserList.some(item => item.idCheckState === '2')){
        this.$messageBox({
          type:'confirm',
          title:`审核确认`,
          content:`操作用户存在联网核查失败的数据，是否继续？`,
          showCancelButton:true,
          messageResolve:()=>{
            let params = this.beforeBtn('2')
            this.zjControl.submitAudit(params).then(()=>{
              this.$Message.success('审核成功！')
              this.goParent()
            })
          }
        })
      }else{
        let params = this.beforeBtn('2')
        this.zjControl.submitAudit(params).then(()=>{
          this.$Message.success('审核成功！')
          this.goParent()
        })
      }
    },
    //驳回
    auditReject(){
      if(!this.form.notes || (this.form.notes && this.form.notes.trim().length < 1)){
        return this.$Message.warning('驳回时审核意见必须填写!')
      }
      let params = this.beforeBtn('3')
      this.zjControl.submitAudit(params).then(()=>{
        this.$Message.success('驳回成功！')
        this.goParent()
      })
    },
    //拒绝
    registerRefuse(){
      if(!this.form.notes || (this.form.notes && this.form.notes.trim().length < 1)){
        return this.$Message.warning('拒绝时审核意见必须填写!')
      }
      let params = this.beforeBtn('4')
      this.zjControl.submitAudit(params).then(()=>{
        this.$Message.success('拒绝成功！')
        this.goParent()
      })
    },
  },
  computed:{
    projectFlag(){
      let flag = false
      if(this.form.projectInfoList && this.form.projectInfoList.length){
        let dList = this.form.projectInfoList.filter(item => item.operationFlag === 'D') || []
        flag = this.form.projectInfoList.length - dList.length > 1
      }
      return flag
    }
  }
}
