<template>
    <div class="eyeSky-administrativePunishment" v-show="show">
        <!-- 更新时间 -->
        <p class="time">
            最近更新时间：{{date(createDate || '-') + ' '+ time(createTime || '-')}}
            <zj-button @click="realClick('1')" class="realBtn">重新获取</zj-button>
        </p>
        <!-- 行政处罚 -->
        <h3 class="siTitle">行政处罚【工商局】<label class="red">{{total}}</label></h3>
        <vxe-table
                header-cell-class-name="headerCell"
                highlight-hover-row
                auto-resize
                border
                align="center"
                :data="tableData"
        >
            <vxe-table-column type="seq" title="序号" width="60"/>
            <vxe-table-column title="公示日期">
                <template v-slot="{row}">
                    {{row.publishDate || '-' }}
                </template>
            </vxe-table-column>
            <vxe-table-column field="punishNumber" title="决定书文号">
            </vxe-table-column>
            <vxe-table-column field="content" title="行政处罚内容">
            </vxe-table-column>
            <vxe-table-column field="departmentName" title="决定机关">
            </vxe-table-column>
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
        name: "administrativePunishment",
        data(){
          return {
            modelName:'administrativePunishment',
          }
        },
        mixins:[pagingMixin]
    }
</script>

<style scoped lang="less">
.eyeSky-administrativePunishment{

}
</style>
