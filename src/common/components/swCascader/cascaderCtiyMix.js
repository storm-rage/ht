export default {
    data(){return{
        // 数据源
        options: [], //渲染的树
        value:[],//选中的值
        cityList:[] //请求回来的省市,
    }},
    created() {
        this.$api.baseCommon.queryDictList().then(res => {
            this.options =  this.getCityTree(res.sysDistrictDictList)
            this.cityList = res.sysDistrictDictList
        })
    },
    methods:{
        //生成树结构
        getCityTree(cityList){
            let list = []
            //省
            cityList.map(item => {
                if(item.treeCode.length === 3){
                    list.push({
                        value:item.treeCode,
                        label:item.districtName
                    })
                }
            })
            //市
            list.forEach(item => {
                item.children = []
                cityList.map(citem => {
                    if(citem.treeCode.length === 6 && citem.treeCode.indexOf(item.value) === 0){
                        item.children.push({
                            value:citem.treeCode,
                            label:citem.districtName
                        })
                    }
                })
            })
            //县
            // list.forEach(item => {
            //   item.children.forEach(citem=>{
            //     citem.children = []
            //     cityList.map(ccitem => {
            //       if(ccitem.treeCode.length === 9 && ccitem.treeCode.indexOf(citem.value) === 0){
            //         citem.children.push({
            //           value:ccitem.treeCode,
            //           label:ccitem.districtName
            //         })
            //       }
            //     })
            //   })
            // })
            return list
        },
    }
}
