<template>
    <div class="eyeSky-thePersonSubjectedToExecution" v-show="show">
        <!-- 更新时间 -->
        <p class="time">
            最近更新时间：{{date(createDate || '-') + ' '+ time(createTime || '-')}}
            <zj-button @click="realClick('1')" class="realBtn">重新获取</zj-button>
        </p>
        <!-- 被执行人 -->
        <h3 class="siTitle">被执行人<label class="red">{{total}}</label></h3>
        <vxe-table
                header-cell-class-name="headerCell"
                highlight-hover-row
                auto-resize
                border
                align="center"
                :data="tableData"
        >
            <vxe-table-column type="seq" title="序号" width="60"/>
            <vxe-table-column field="caseCreateTime" title="立案日期">
                <template v-slot="{row}">
                    {{tycDates(row.caseCreateTime)}}
                </template>
            </vxe-table-column>
            <vxe-table-column field="execMoney" title="执行标的"/>
            <vxe-table-column field="caseCode" title="案号"/>
            <vxe-table-column field="execCourtName" title="执行法院"/>
        </vxe-table>
        <!-- 分页 -->
        <vxe-pager
                align="right"
                :current-page="currentPage"
                :page-size="pageSize"
                @page-change="pageChang"
                :total="total">
        </vxe-pager>
    </div>
</template>

<script>
    import pagingMixin from "@pubComponent/eyeSky/components/pagingMixin";
    export default {
        name: "thePersonSubjectedToExecution",
        data(){
          return{
            modelName:'thePersonSubjectedToExecution',
          }
        },
        mixins:[pagingMixin]
    }
</script>

<style scoped lang="less">
.eyeSky-thePersonSubjectedToExecution{

}
</style>
