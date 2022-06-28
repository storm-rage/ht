<template>
<el-cascader
        v-model="value"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="addHandleChange"
        clearable
        filterable>
</el-cascader>
</template>

<script>
    export default {
        name: "SwScaderCity",
        data(){return{
            // 数据源
            options: [],
            value:[],
            cityList:[]
        }},
        props:['province','city'],
        watch:{
            province(newValue){
                this.value[0] = newValue
            },
            city(newValue){
                this.value[1] = newValue
            }
        },
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
            //内容变化
            addHandleChange(value){
                let p = this.cityList.find(item => item.treeCode === value[0])
                let c = this.cityList.find(item => item.treeCode === value[1])
                this.$emit('change',{
                    province: p ? ( p.treeCode ? p.treeCode : '' ) : '',
                    provinceZh:p ? ( p.districtName ? p.districtName : '' ) : '',
                    city:c ? ( c.treeCode ? c.treeCode : '' ) : '',
                    cityZh:c ? ( c.districtName ? c.districtName : '' ) : ''
                })
            }
        }
    }
</script>

<style scoped>

</style>
