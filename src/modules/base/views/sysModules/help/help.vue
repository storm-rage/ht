<template>
<div class="help-page">
    <zj-table
      class="zj-m-y-0 zj-m-x-20"
            ref="searchTable"
            auto-resize  border
            :params="searchForm" :api="zjControl.tableApi"
            :pagerSlot="false"
    >
        <zj-table-column field="entName" title="类别"/>
        <zj-table-column field="entName" title="标题"/>
        <zj-table-column >
            <template v-slot="{row}">
                <zj-button type="text" @click="edit(row)">编辑</zj-button>
                <zj-button type="text" @click="remove(row)">删除</zj-button>
            </template>
        </zj-table-column>
    </zj-table>

</div>
</template>

<script>
    export default {
        name: "help",
        data(){
            return {
                searchForm:{},
                zjControl:{}
            }
        },
        methods:{
            edit(row){
                console.log(row)
            },
            remove(row){
                console.log(row)
            }
        }
    }
</script>

<style scoped>

</style>
