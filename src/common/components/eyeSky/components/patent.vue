<template>
    <div class="eyeSky-patent" v-show="show">
        <!-- 更新时间 -->
        <p class="time">
            最近更新时间：{{date(createDate || '-') + ' '+ time(createTime || '-')}}
            <zj-button @click="realClick('1')" class="realBtn">重新获取</zj-button>
        </p>
        <!-- 专利信息 -->
        <h3 class="siTitle">专利信息<label class="blue">{{total}}</label></h3>
        <vxe-table
                header-cell-class-name="headerCell"
                highlight-hover-row
                auto-resize
                border
                align="center"
                :data="tableData"
        >
            <vxe-table-column type="seq" title="序号" width="60"/>
            <vxe-table-column field="applicationPublishTime" title="申请公布日" width="120">
<!--                <template v-slot="{row}">-->
<!--                    {{tycDates(row.appDate)}}-->
<!--                </template>-->
            </vxe-table-column>
            <vxe-table-column field="patentName" title="专利名称"/>
            <vxe-table-column field="patentNum" title="申请号" width="200"/>
            <vxe-table-column field="pubnumber" title="申请公布号" width="200"/>
            <vxe-table-column field="patentType" title="专利类型" width="120"/>
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
        name: "patent",
        data(){
          return{
            modelName:'patent',
          }
        },
        mixins:[pagingMixin]
    }
</script>

<style scoped lang="less">
.eyeSky-patent{

}
</style>
