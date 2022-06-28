<template>
<div class="AppendTendency">

    <div class="addEnterCenterBox">
        <el-row>
            <label>选择年份：</label>
            <zj-year @change="yearChang" :year="50"/>
            <span class="zj-m-l-15" >注册客户总数：{{totalCount}}家</span>
        </el-row>

        <div id="myChart" class="myChart" />

        <table class="registeredStatistical" border>
            <tr>
                <td>月份</td>
                <td v-for="(item,index) in monthList" :key="index">{{item}}</td>
            </tr>
            <tr>
                <td>注册总数</td>
                <td v-for="(item,index) in monthtotalCount" :key="index">{{item}}</td>
            </tr>
            <tr>
                <td>核心企业</td>
                <td v-for="(item,index) in coreCount" :key="index">{{item}}</td>
            </tr>
        </table>
      <zj-button class="back zj-m-t-20"  @click="goParent">返回</zj-button>
<!--        <div class="detailButtons">-->
<!--          <el-button type="info" @click="goParent">返回</el-button>-->
<!--        </div>-->

    </div>

</div>
</template>

<script>
import appendTendency from "./js/appendTendency.js";
export default appendTendency
</script>

<style scoped lang="less">
  .AppendTendency{
    width: 100%;
    height: 100%;
    padding-top: 10px;
  }
  .addEnterCenterBox{
    /*margin: 20px auto 0;*/
    text-align: center;
    .myChart{ /* echars */
      width: 800px;
      height: 470px;
      margin: 10px auto 0;
    }
    .registeredStatistical{ /*统计表格*/
      border-spacing: 0;
      margin: -20px auto 0;
      tr{
        td{
          text-align: center;
          padding: 2px 11px;
        }
      }
    }
    .el-button{
      margin-top: 10px;
      padding: 8px 20px;
    }
  }

</style>
