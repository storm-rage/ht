<template>
    <div class="eyeSky-shareholdersInfo" v-show="show">
        <!-- 更新时间 -->
        <p class="time">
            最近更新时间：{{date(createDate || '-') + ' '+ time(createTime || '-')}}
            <zj-button @click="realClick('1')" class="realBtn">重新获取</zj-button>
        </p>
        <!-- 股东信息 -->
        <h3 class="siTitle">股东信息<label class="blue">{{total}}</label></h3>
        <div class="auto">
            <table class="zj-static-table" cellspacing="0" cellpadding="0"
                   v-for="(item,index) in tableData" :key="index"
            >
                <tr>
                    <td class="title-td">序号</td>
                    <td class="title-td">股东发起人</td>
                    <td class="title-td">出资比例</td>
                    <td class="title-td">认缴出资额</td>
                    <td class="title-td">认缴出资日期</td>
                </tr>
                <tr class="numImg">
                    <td :rowspan="item.rowspan">
                        {{index+1}}
                    </td>
                    <td :rowspan="item.rowspan">
                        <img :src="item.logo"/>
                        <p>{{item.name}}</p>
                    </td>
                    <td>{{item.capitalOne ? item.capitalOne.percent : ''}}</td>
                    <td>{{item.capitalOne ? item.capitalOne.amomon : ''}}</td>
                    <td>{{item.capitalOne ? item.capitalOne.time : ''}}</td>
                </tr>
                <!--  认缴  -->
                <tr v-for="(citem,cindex) in item.capital" :key="cindex">
                    <td>{{citem.percent || ''}}</td>
                    <td>{{citem.amomon || ''}}</td>
                    <td>{{citem.time || ''}}</td>
                </tr>
                <tr>
                    <td colspan="3"></td>
                </tr>
                <!--  认缴  -->
                <tr>
                    <td class="title-td">出资比例</td>
                    <td class="title-td">实缴出资额</td>
                    <td class="title-td">实缴出资日期</td>
                </tr>
                <tr v-for="(citem,cindex) in item.capitalActl" :key="cindex">
                    <td>{{citem.percent}}</td>
                    <td>{{citem.amomon}}</td>
                    <td>{{citem.time}}</td>
                </tr>
                <tr>
                    <td colspan="3"></td>
                </tr>
            </table>
        </div>
        <!-- 分页 -->
        <vxe-pager
                align="center"
                :current-page="currentPage"
                :page-size="pageSize"
                @page-change="pageChang"
                v-if="total > 0"
                :total="Number(total)">
        </vxe-pager>
    </div>
</template>

<script>
    import pagingMixin from "@pubComponent/eyeSky/components/pagingMixin";
    export default {
        name: "shareholdersInfo",
        mixins:[pagingMixin],
        data(){return{
          modelName:'shareholdersInfo',
            //股东信息标志
            isSi:true,
            pageSize:2,//每页展示条数
        }},
    }
</script>

<style scoped lang="less">
.eyeSky-shareholdersInfo{
    .auto{
        width: 650px;
        margin: auto;
    }
    table{
        min-width: 500px;
        margin-bottom: 10px;
        tr{
            height: 30px;
            th,td{
                padding: 2px 6px;
            }
            td{
                text-align: center;
                //序号
                &:nth-of-type(1){
                    width: 60px;
                }
                //股东发起人
                &:nth-of-type(2){
                    width: 120px;
                    img{
                        width: 80px;
                        height: 80px;
                    }
                }
                //出资比例
                &:nth-of-type(3){
                    width: 120px;
                }
                //出资额
                &:nth-of-type(4){
                    width: 180px;
                }
                //出资日期
                &:nth-of-type(5){
                    width: 120px;
                }
            }
        }
    }
}
</style>
