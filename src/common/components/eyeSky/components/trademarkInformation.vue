<template>
    <div class="eyeSky-trademarkInformation" v-show="show">
        <!-- 更新时间 -->
        <p class="time">
            最近更新时间：{{date(createDate || '-') + ' '+ time(createTime || '-')}}
            <zj-button @click="realClick('1')" class="realBtn">重新获取</zj-button>
        </p>
        <!-- 商标信息 -->
        <h3 class="siTitle">商标信息<label class="blue">{{total}}</label></h3>
        <vxe-table
                header-cell-class-name="headerCell"
                highlight-hover-row
                auto-resize
                border
                align="center"
                :data="tableData"
        >
            <vxe-table-column type="seq" title="序号" width="60"/>
            <vxe-table-column field="appDate" title="申请日期" width="120">
                <template v-slot="{row}">
                    {{tycDates(row.appDate)}}
                </template>
            </vxe-table-column>
            <vxe-table-column field="execMoney" title="商标">
                <template v-slot="{row}">
                    <img :src="row.tmPic"/>
                </template>
            </vxe-table-column>
            <vxe-table-column field="tmName" title="商标名称"/>
            <vxe-table-column field="regNo" title="注册号"/>
            <vxe-table-column field="intCls" title="国际分类"/>
            <vxe-table-column field="status" title="商标状态"/>
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
        name: "trademarkInformation",
        data(){
          return{
            modelName:'trademarkInformation',
          }
        },
        mixins:[pagingMixin]
    }
</script>

<style lang="less">
.eyeSky-trademarkInformation{
    .vxe-table{
        img{
            width: 80px;
            height: 70px;
        }
    }
}
</style>
