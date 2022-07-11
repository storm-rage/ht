<template>
  <zj-content-container>
    <zj-top-header title="企业注册审核"></zj-top-header>
    <el-collapse v-show="workflow === 'sqxx'">
      <biz-apply-info></biz-apply-info>
    </el-collapse>
    <el-collapse v-show="workflow === 'shxx'">
      
    </el-collapse>
    <!--  业务申请信息  -->
    <!-- 底部工作流状态 -->
    <zj-workflow v-model="workflow" :list="workflowList">
      <!-- 审核时 -->
      <el-row slot="right" v-if="$route.name === 'registerAuditApplyAudit'">
        <el-row v-show="workflow === 'sqxx'" class="btn-w85">
          <zj-button class="back" @click="goParent">返回</zj-button>
        </el-row>
        <el-row v-show="workflow === 'spxx'" class="btn-w85">
          <zj-button class="back" @click="goParent">返回</zj-button>
          <zj-button status="primary" @click="holdSave">暂存</zj-button>
          <zj-button class="pass" @click="auditPass">审核通过</zj-button>
          <zj-button class="retort" @click="auditReject">审核驳回</zj-button>
          <zj-button class="reject" @click="registerRefuse">注册拒绝</zj-button>
        </el-row>
      </el-row>
    </zj-workflow>
    <!-- 协议时 -->
    <zj-content-footer v-if="$route.name === 'registerAuditProtocolAudit'">
      <zj-button class="back" @click="goParent">返回</zj-button>
      <zj-button class="pass" @click="confirm" :api="zjBtn.submitConfirm"
        >确认提交</zj-button
      >
    </zj-content-footer>
  </zj-content-container>
</template>

<script>
import registerAudit from "./commom/registerAudit";
export default registerAudit;
</script>

<style scoped lang="less">
#newApplyAudit {
  .projectText {
    color: #ee9712;
    padding: 5px 0 20px 50px;
  }

  .info-body {
    padding: 20px 0;
    .el-col {
      > label,
      > span {
        display: inline-block;
      }
      > label {
        width: 130px;
        text-align: right;
        color: #999999;
      }
      > span {
        width: calc(100% - 130px);
      }
    }
  }

  //操作用户信息
  .userInfo-body {
    table {
      width: 100%;
      td,
      th {
        text-align: center;
        width: 12.5%;
      }
      th {
        //background-color: rgb(226,241,255);
        height: 32px;
        background-color: #e8e8e8;
      }
      p {
        cursor: default;
      }
    }
  }
  //相关附件资料
  .attach-body {
    .attach-bar {
      &:after {
        content: "";
        display: block;
        clear: both;
      }
      li {
        float: left;
        color: gray;
        cursor: pointer;
        margin-left: 30px;
      }
      .check {
        color: #1199c4; //#409eff
      }
    }
    .attach-box {
      margin: 10px 20px;
      padding-top: 8px;
      border-radius: 10px;
      border: 1px solid gainsboro;
      text-align: center;
      //标题
      .attach-box-bar {
        table {
          width: 100%;
          table-layout: fixed;
          td {
            //text-align: center;
          }
          label {
            color: gray;
          }
        }
      }
      //图片承载区
      .attach-box-img {
        height: 400px;
        width: 100%;
        margin: 15px 0;
        overflow: hidden;

        //background-color: #8cc5ff;
        position: relative;
        .file-container {
          width: 713px;
          background: #f7f7f7;
          height: 100%;
          margin: 0 auto;
          .img-opt-block {
            display: flex;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10;
            position: absolute;
            width: inherit;
            bottom: 0px;
            height: 50px;
            line-height: 50px;
            padding-left: 20px;
            padding-right: 20px;
            .item-title {
              flex: 0 0 20%;
              text-align: left;
              color: #ffffff;
            }
            .item-img {
              flex: 0 0 80%;
              text-align: right;
              img {
                vertical-align: middle;
                cursor: pointer;
              }
              img + img {
                margin-left: 10px;
              }
            }
          }
        }
        img {
          box-shadow: 2px 2px 12px #7b7f8480;
        }
        img,
        #pdfCanvasItem {
          position: absolute;
          left: 50%;
          top: 50%;
          max-height: 380px;
          //transform: translate(-50%,-50%);
          //width: 100%;
          width: 600px;
        }
        .previous,
        .next {
          display: block;
          width: 30px;
          height: 30px;
          font-size: 24px;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.2);
          color: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          transform: translate(0, -50%);
          z-index: 9;
        }
        .previous {
          left: 20%;
        }
        .next {
          right: 20%;
        }
        .previous:hover,
        .next:hover {
          background-color: rgba(0, 0, 0, 0.4);
        }
      }
    }
  }

  //注册初审审批信息
  .spxx {
  }
}
</style>
<style lang="less">
#newApplyAudit {
  .sqxx,
  .spxx {
    background: white;
  }
  .zjcoll {
    .el-collapse-item__header {
      padding-left: 1em;
    }
  }
  .el-collapse-item__wrap {
    padding-left: 0;
    padding-right: 0;
  }
  .history {
    //步骤条
    .el-steps {
      margin-left: 20px;
      .el-step__head {
        width: 14px;
        //竖线
        .el-step__line {
          left: 5px;
          transform: translateY(6px);
          border-color: #999999;
        }
        //小圆圈
        .el-step__icon {
          width: 12px;
          height: 12px;
          transform: translateY(2px);
          opacity: 0;
          border-color: #999999;
          background: #999999;
          .el-step__icon-inner {
            display: none;
          }
        }
      }
      .el-step__main {
        .history-content {
          font-size: 12px;
          color: #999999;
          //最后一项
          &.last {
            color: #333333;
          }
          label,
          span,
          i,
          b {
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            margin-right: 8px;
          }
        }
      }
      //最后一项
      .is-flex {
        .el-step__icon {
          opacity: 1;
        }
      }
    }
  }

  .el-collapse-item__wrap {
    overflow: inherit;
  }
  //供应商类型
  .s130 {
    label {
      display: inline-block;
      width: 60px !important;
    }
    span {
      display: inline-block;
      width: calc(100% - 60px) !important;
    }
  }

  //隶属企业
  .el-icon-circle-close {
    transform: translateY(0px);
  }
  //间接供应商表格
  .supplierType-item {
    .zj-table {
      width: 50%;
    }
  }
}
</style>
<style lang="less">
//工作流
#newApplyAudit {
  .sqxx,
  .spxx {
    padding-bottom: 60px;
  }
  //工作流
  &.registerAuditApply {
    #ZjWorkflow {
      ul {
        width: 210px;
      }
      .right {
        text-align: center;
        width: calc(100% - 210px);
      }
    }
  }
  &.registerAuditProtocol {
    #ZjWorkflow {
      .right {
        text-align: center;
        width: 100%;
      }
    }
  }
}
</style>
