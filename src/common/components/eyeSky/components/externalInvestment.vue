<template>
    <div class="eyeSky-externalInvestment" v-show="show">
        <p class="time">
            最近更新时间：{{date(createDate || '-') + ' '+ time(createTime || '-')}}
            <zj-button @click="realClick('1')" class="realBtn">重新获取</zj-button>
        </p>
        <h3 class="siTitle">
            对外投资
            <label class="blue">{{total}}</label>
<!--            <label class="gray n-b">查看更多{{'14'}}条</label>-->
<!--            <label class="orange n-b">历史对外投资</label>-->
        </h3>
        <vxe-table
                header-cell-class-name="headerCell"
                highlight-hover-row
                auto-resize
                border
                align="center"
                :data="tableData"
        >
            <vxe-table-column type="seq" title="序号" width="60"/>
            <vxe-table-column field="name" title="被投资企业名称" width="260">
                <template v-slot="{row}">
                    <div class="ei-table-name">
                        <img src=""/>
                        <a href="#">{{row.name}}</a>
                    </div>
                </template>
            </vxe-table-column>
            <vxe-table-column field="legalPersonName" title="被投资法定代表人" width="260">
                <template v-slot="{row}">
                    <div class="ei-table-invest">
                        <img src=""/>
                        <a href="#">{{row.legalPersonName}}</a>
                        <a href="#" class="orange">他有{{row.count || '-'}}家公司 ></a>
                    </div>
                </template>
            </vxe-table-column>
            <vxe-table-column field="percent" title="投资占比" >
                <template v-slot="{row}">
                    <span>{{row.percent}}</span>
                </template>
            </vxe-table-column>
            <vxe-table-column field="regCapital" title="注册资本" >
                <template v-slot="{row}">
                    <span>{{row.regCapital ||'-'}}</span>
                </template>
            </vxe-table-column>
            <vxe-table-column field="estiblishTime" title="成立日期">
                <template v-slot="{row}">
                    <span>{{tycDates(row.estiblishTime)}}</span>
                </template>
            </vxe-table-column>
            <vxe-table-column field="regStatus" fixed="right" title="经营状态">
                <template v-slot="{row}">
                    <span :class="row.regStatus === '注销' ? 'red' : 'green'">
                        {{row.regStatus}}
                    </span>
                </template>
            </vxe-table-column>
        </vxe-table>

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
    import paging_mixin from "@pubComponent/eyeSky/components/pagingMixin";
    export default {
        name: "externalInvestment",
        mixins:[paging_mixin],
        data(){
          return{
            modelName:'externalInvestment',
            // pageSize:20
          }
        }
    }
</script>

<style lang="less">
.eyeSky-externalInvestment{
    .c--tooltip{
        height: auto;
        margin: 5px 0;
        min-height: 42px;
        span{
            display: inline-block;
            line-height: 42px;
        }
    }
    .vxe-table{
        min-width: 952px;
        .col--seq{
            line-height: 42px;
            .c--tooltip{
                line-height: 42px;
            }
        }
        .ei-table-name,.ei-table-invest{
            display:table;
            vertical-align: middle;
            height:auto;
            img,a,label{
                display:table-cell;
                vertical-align: middle;
                min-height: 40px;
                min-width: 60px;
                z-index: 99999;
            }
            img{
                width: 40px;
                height: 40px;
            }
            a{
                line-height: 18px;
                text-align: left;
                padding-left: 5px;
                color: #409EFF;
                &:hover{
                    color: #FF431B;
                }
                &.orange{
                    padding-left: 5px;
                    color: orange;
                }
            }
        }
        .ei-table-name{
            a{
                width: calc(100% - 40px);
            }
        }
        .ei-table-invest{

        }
    }
    .headerCell{
        background-color: #E1EFFC;
    }
}
</style>
<style lang="less" scoped>


</style>
