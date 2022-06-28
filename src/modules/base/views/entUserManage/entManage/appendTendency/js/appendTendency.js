import appendTendencyMixin from "./appendTendencyMixin.js";
export default {
  mixins:[appendTendencyMixin],
    data() {
        return {
            year: null, //当前年份
            totalCount:0, //总注册数,
            monthList:['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月'],
            monthtotalCount:[], //每月注册总数
            coreCount:[], // 每月新增数的  核心企业

            zjControl:{
              getEnterpriseRegister:this.$api.entInfoManage.getEnterpriseRegister,//趋势
            }
        }
    },
    methods: {
        //选择年份事件
        yearChang(value) {
            this.year = value
            this.getAddYearData()
        },
        // 发送获取选中年份的新增数据
        getAddYearData(){
            this.zjControl.getEnterpriseRegister({year:this.year}).then(ret => {
                let res = ret.data
                let date = new Date()
                let newYear = date.getFullYear()
                let newMonut = date.getMonth() + 1
                this.totalCount = res.totalCount
                this.monthtotalCount = []
                this.coreCount = []
                let registerTrendList = res.registerTrendList
                registerTrendList.forEach((item,index) => {
                    if(Number(this.year) < Number(newYear)){
                      this.monthtotalCount.push(item.totalCount+'')
                      this.coreCount.push(item.coreCount+'')
                    }else{

                      this.monthtotalCount.push(index < newMonut ? item.totalCount+'' : '--')
                      this.coreCount.push(index < newMonut ? item.coreCount+'' : '--')
                    }

                })
                this.drawLine(this.monthtotalCount)
            })
        },

    }
}
