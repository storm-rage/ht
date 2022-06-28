<template>
    <div class="eyeSky-equityPledge" v-show="show">
        <!-- 更新时间 -->
        <p class="time">
            最近更新时间：{{date(createDate || '-') + ' '+ time(createTime || '-')}}
            <zj-button @click="realClick('1')" class="realBtn">重新获取</zj-button>
        </p>
        <!-- 股权出质 -->
        <h3 class="siTitle">股权出质<label class="red">{{total}}</label></h3>
        <vxe-table
                header-cell-class-name="headerCell"
                highlight-hover-row
                auto-resize
                border
                align="center"
                :data="tableData"
        >
            <vxe-table-column type="seq" title="序号" width="60"/>
            <vxe-table-column title="公示日期" width="120">
                <template v-slot="{row}">
                    {{tycDates(row.regDate)}}
                </template>
            </vxe-table-column>
            <vxe-table-column field="regNumber" title="登记编号" />
            <vxe-table-column field="pledgor" title="出质人">
                <template v-slot="{row}">
                    <span style="color:#409EFF;">{{row.pledgor || '-'}}</span>
                </template>
            </vxe-table-column>
            <vxe-table-column field="pledgee" title="质权人">
                <template v-slot="{row}">
                    <span style="color:#409EFF;">{{row.pledgee || '-'}}</span>
                </template>
            </vxe-table-column>
            <vxe-table-column field="state" title="状态" width="80"/>
            <vxe-table-column field="equityAmount" title="出质股权数额" width="120"/>
            <vxe-table-column fixed="right" title="操作" width="80">
                <template v-slot="{row}">
                    <zj-button type="text" @click="details(row)">详情</zj-button>
                </template>
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
        <!-- 详情页面 -->
        <el-dialog
            title="详情"
            center
            :visible="detailsDialog"
            @close="detailsDialog = false"
            :close-on-click-modal="false"
            class="detailsDialog"
        >
                <table class="col">
                    <tr>
                        <th>登记编号</th>
                        <td>{{dataDialog.regNumber || '-'}}</td>
                        <th>出质股权数额</th>
                        <td>{{dataDialog.equityAmount || '-'}}</td>
                    </tr>
                    <tr>
                        <th>质权人</th>
                        <td>{{dataDialog.pledgee || '-'}}</td>
                        <th>股权出质设立发布日期</th>
                        <td>{{tycDates(dataDialog.putDate)}}</td>
                    </tr>
                    <tr>
                        <th>公司</th>
                        <td>
                            <template v-if="dataDialog.companyList">
                                <span v-for="(item,index) in dataDialog.companyList" :key="index">
                                    {{
                                        index + 1 === dataDialog.companyList.length ?
                                        item.name : item.name + '、'
                                    }}
                                </span>
                            </template>
                            <template v-else>-</template>
                        </td>
                        <th>质权人（列表）</th>
                        <td>
                            <template v-if="dataDialog.pledgeeList">
                                <span v-for="(item,index) in dataDialog.pledgeeList" :key="index">
                                    {{
                                        index + 1 === dataDialog.pledgeeList.length ?
                                        item.name : item.name + '、'
                                    }}
                                </span>
                            </template>
                            <template v-else>-</template>
                        </td>
                    </tr>
                    <tr>
                        <th>股权出质设立登记日期</th>
                        <td>{{tycDates(dataDialog.regDate)}}</td>
                        <th>出质人（列表）</th>
                        <td>
                            <template v-if="dataDialog.pledgorList">
                                <span v-for="(item,index) in dataDialog.pledgorList" :key="index">
                                    {{
                                        index + 1 === dataDialog.pledgorList.length ?
                                        item.name : item.name + '、'
                                    }}
                                </span>
                            </template>
                            <template v-else>-</template>
                        </td>
                    </tr>
                    <tr>
                        <th>状态</th>
                        <td>{{dataDialog.state || '-'}}</td>
                        <th>出质人</th>
                        <td>{{dataDialog.pledgor || '-'}}</td>
                    </tr>
                    <tr>
                        <th>质权人证照/证件号码</th>
                        <td>{{dataDialog.certifNumberR || '-'}}</td>
                        <th>出质人证照/证件号码</th>
                        <td>{{dataDialog.certifNumber || '-'}}</td>
                    </tr>
                </table>
        </el-dialog>
    </div>
</template>

<script>
    import pagingMixin from "@pubComponent/eyeSky/components/pagingMixin";
    export default {
        name: "equityPledge",
        data(){
          return {
            modelName:'equityPledge',
          }
        },
        mixins:[pagingMixin]
    }
</script>

<style lang="less">
.eyeSky-equityPledge{
    table{
        tr{
            th,td{
                width: 25%;
            }
        }
    }
}
</style>
