export default {
    props:{
        //是否显示本页面
        show:{
            type:Boolean,
            default:false
        },
        request:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    watch:{
        show(boo){
            if(!boo){return}
            // if(!this.isOne){return} //不是第一次请求
            //更新请求变量
            this.requestForm = this.request
            this.$nextTick(() => {
              //第一次则进行请求
              this.queryTycInfoPage('0','x')
            })
            this.isOne = false
        },
        request:{
            deep:true,
            handler(newObj){
                this.requestForm = this.request
            }
        }
    },
    data(){return{
        //是否第一次显示该页面
        isOne:true,
        //发送请求的数据
        requestForm:{},
        //请求回来的数据
        createDate:'',//获取日期
        createTime:'',//获取时间
        total:0,
        dataList:[],
        //分页
        currentPage:1,
        pageSize:20,
        //保存当前请求的页数
        requestPage:1,
        //需要渲染的数据
        tableData:[],
        //dialog
        detailsDialog:false,//显示与否
        dataDialog:{}, //渲染的数据

        //
        zjControl:{
          queryTycInfoPage:this.$api.tyc.queryTycInfoPage
        }
    }},
    methods:{
        //分页按钮发生改变时
        pageChang(data){
            this.currentPage = data.currentPage //更换当前页
            this.pageJudge(data.currentPage)
        },
        //分页事件判断
        pageJudge(pageNum){
            //假设当前是第五页(已经展示的条数) 5 *10
            let pageCount = pageNum * this.pageSize
            //需要请求的页数 50 / 20 = 2.5 > 3
            let reqPage =  Math.ceil(pageCount / this.requestForm.rows)
            //不进行发送请求
            if( reqPage === this.requestPage){
                // //  50 / 20 = 2.5 => 2
                let index = Math.floor(pageCount / this.requestForm.rows)
                // if(this.requestPage > 1){
                //     // 2 / ( 20 / 10) => 2 / 2 = 1
                //     index = Math.ceil(
                //         index / ( this.requestForm.rows / this.pageSize)
                //     )
                // }else{
                //   index = (pageCount / this.pageSize) - 1
                // }
                index = (pageCount / this.pageSize) - 1
                this.tableData = this.dataList.slice(
                    index * this.pageSize,
                    index * this.pageSize + this.pageSize
                )
                //是否是股东信息
                if(this.isSi){
                  this.tableData.forEach( item =>{
                    //处理跨行数
                    console.log('item.capital:',item.capital.length,'item.capitalActl:',item.capitalActl)
                    item.rowspan = (item.capital.length != 0 ? item.capital.length : 1 )+ (item.capitalActl ? item.capitalActl.length : 0) + 3
                    //处理分割
                    item.capitalOne = item.capital ? item.capital[0] : item.capital
                    if(item.capital){
                      item.capital.splice(0,1)
                    }
                    item.capitalActlOne = item.capitalActl ? item.capitalActl[0] : item.capitalActl
                    if(item.capitalActl){
                      item.capitalActl.splice(0,1)
                    }
                  })
                }
                //执行获取数据后的方法
                if(this.reqSuccess && typeof(this.reqSuccess) === 'function'){
                  this.reqSuccess()
                }

            }else{
                this.requestPage = pageNum
                //发送请求
                this.queryTycInfoPage('0','x')
            }
        },
        //分页请求
        queryTycInfoPage(flag,x){
            //判断是否实时请求（重新获取）
            if(flag === '1'){
                this.requestForm.realTimeFlag = flag
            }else{
                this.requestForm.realTimeFlag = '0'
            }
            //拷贝请求
            let params = Object.assign({},this.requestForm)
            params.page = this.requestPage
            //发送请求
            this.zjControl.queryTycInfoPage(params).then(ret => {
                let res = ret.data
                //是否是专利
                this.createDate = res.createDate || this.createDate
                this.createTime = res.createTime || this.createDate
                this.total = Number(res.total) || this.total

                this.dataList = res.rows ? res.rows: []
                if(x){
                    this.tableData = this.dataList.slice(0,this.pageSize)
                }
                //是否是股东信息
                if(this.isSi){
                    this.tableData.forEach( item =>{
                        //处理跨行数
                        item.rowspan = item.capital.length + (item.capitalActl ? item.capitalActl.length : 0) + 3
                        //处理分割
                        item.capitalOne = item.capital ? item.capital[0] : item.capital
                        if(item.capital){
                            item.capital.splice(0,1)
                        }
                        item.capitalActlOne = item.capitalActl ? item.capitalActl[0] : item.capitalActl
                        if(item.capitalActl){
                            item.capitalActl.splice(0,1)
                        }
                    })
                }
                // console.log(this.requestPage,res.rows,this.tableData,this.pageSize)
                //执行获取数据后的方法
                if(this.reqSuccess && typeof(this.reqSuccess) === 'function'){
                  this.reqSuccess()
                }

                let params = Object.assign({},res)
                params.modelName = this.modelName
                this.$emit('eyeSkyChange',params)
            }).catch(err => {
              let params = Object.assign({},err)
              params.modelName = this.modelName
              this.$emit('eyeSkyChange',params)
            })
        },
        //重新获取
        realClick(flag){
            this.currentPage = 1
            this.queryTycInfoPage(flag,'x')
        },
        //点击详情
        details(row){
            this.dataDialog = row
            this.detailsDialog = true
        }
    }
}
