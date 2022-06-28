<template>
    <div class="eyeSky-branchAgency" v-show="show">
        <!-- 更新时间 -->
        <p class="time">
            最近更新时间：{{date(createDate || '-') + ' '+ time(createTime || '-')}}
            <zj-button @click="realClick('1')" class="realBtn">重新获取</zj-button>
        </p>
        <h3 class="siTitle">
            分支机构
            <label class="blue">{{total}}</label>
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
            <vxe-table-column field="name" title="企业名称" >
                <template v-slot="{row}">
                    <div class="ei-table-name">
                        <img :src="row.logo" class="logo"/>
                        <a href="#">{{row.name}}</a>
                    </div>
                </template>
            </vxe-table-column>
            <vxe-table-column field="legalPersonName" title="负责人" >
                <template v-slot="{row}">
                    <div class="ei-table-invest">
                        <img src=""/>
                        <a href="#">{{row.legalPersonName}}</a>
                        <a href="#" class="orange">他有{{row.count}}家公司 ></a>
                    </div>
                </template>
            </vxe-table-column>
            <vxe-table-column field="estiblishTime" title="成立日期">
                <template v-slot="{row}">
                    <span>{{tycDates(row.estiblishTime)}}</span>
                </template>
            </vxe-table-column>
            <vxe-table-column field="regStatus" title="经营状态">
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
        data(){
          return {
            modelName:'externalInvestment',
          }
        },
        mixins:[paging_mixin]
    }
</script>

<style lang="less">
    .eyeSky-branchAgency{
        .logo{
            width: 40px;
            height: 40px;
        }
        .c--tooltip{
            height: auto;
            margin: 5px 0;
            min-height: 50px;
            span{
                display: inline-block;
                line-height: 45px;
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
                    height: 100%;
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
                img{
                    height: 50px;
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
