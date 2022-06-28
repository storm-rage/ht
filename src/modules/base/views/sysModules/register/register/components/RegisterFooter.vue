<template>
    <footer class="sw_footer">
        <div class="top">
            <div class="left">
                <div class="tel">
                  <img src="@assets/img/login/phone.png" class="icon-service-phone" style="vertical-align: middle;">
                    <label> {{serviceTelephone}} </label>
                </div>
                <div class="time">
                    <label> （工作时间：{{workingTime}}） </label>
                </div>
                <div class="email">
                  <img src="@assets/img/login/email.png" class="el-icon-message" style="vertical-align: middle;">
                    <label> 客服邮箱：{{zejinEmail}} </label>
                </div>
            </div>
            <div class="right">
                <div class="customer">
                    <img src="~@assets/img/layout/WeChatService.png"/>
                    <label>微信客服</label>
                </div>
            </div>
        </div>
        <div class="copyright bottom">深圳市前海泽金互联网金融服务有限公司 ©版权所有 粤ICP备15066239号-1 v1.9.1.0</div>
    </footer>
</template>
<script>
    export default {
        name: "LoginFooter",
        data () {
            return {
                serviceTelephone: '400-995-2122', // 客服电话
                workingTime: '9:00-18:00', // 工作时间
                zejinEmail: 'kefu@izejin.com', // 客服邮箱
            }
        }
    }
</script>

<style lang="less" scoped>
    /*@import "~@assets/css/AlibabaFontIcon.css";*/
    .sw_footer {
      position: relative;
      min-width: 850px;
      height: 149px;
      width: 100%;
      box-sizing: border-box;
      box-shadow: 0 -1px 1px rgba(155, 155, 155, 0.43);
      background-color: white;
      .top{
        width: 40%;
        margin: 0 auto;
      }
      .top:after{
        content: "";
        display: block;
        clear: both;
      }
      .left,
      .right {
        height: 100%;
        box-sizing: border-box;
        padding: 10px 0 15px 0;

        &>div:after {
          content: "";
          display: block;
          clear: both;
        }
      }

      .left {
        float: left;
        /*margin: 0 5% 0 30%;*/
        transform: translateX(-10%);
        font-size: 14px;
        >div{
          padding: 3px 0;
        }
        label{
          opacity: 0.54;
          font-family: PingFangTC-Medium;
          font-size: 14px;
          color: #434343;
        }
        .tel{
          .icon-service-phone{
            float:left;
            font-size: 28px;
            height: 28px;
            margin:-2px 8px 0 0;
            opacity: 0.7;
            vertical-align: middle;
            margin-top: 5px;
          }
          label{
            float:left;
            font-size:24px
          }
        }
        .time{
          padding:0 5px 0 34px;
          label{
            float:left;
            font-size:14px;
            opacity: 0.4;
          }
        }
        .email{
          .el-icon-message{
            float:left;
            font-size: 18px;
            margin:7px 15px 0 5px;
          }
          label{
            float:left;
            line-height:30px
          }
        }
      }

      .right {
        float: right;
        /*margin: 0 30% 0 5%;*/
        .customer{
          float: right;
          font-family: PingFangTC-Regular;
          font-size: 14px;
          color: #434343;
          text-align: center;
          img{
            display: block;
            width: 90px;
            height: 90px;
          }
          label{
            opacity: 0.6;
          }
        }
      }
      .copyright{
        background-color: #E7E7E7;
        height: 29px;
        line-height: 29px;
        text-align: center;
        font-size: 12px;
        color: #B0B0B0;
        position: absolute;
        bottom: 0;
        width: 100%;
      }

      //自适应
      /*@media all and (max-height: 670px){*/
      /*  height: 125px;*/
      /*  .left{*/
      /*    padding: 0;*/
      /*    .tel{*/
      /*      i{font-size: 24px!important;}*/
      /*      label{font-size: 20px!important;}*/
      /*    }*/
      /*    .time{*/
      /*      label{font-size: 12px!important;}*/
      /*    }*/
      /*    .email{*/
      /*      i{font-size: 14px!important;}*/
      /*      label{font-size: 12px!important;}*/
      /*    }*/
      /*  }*/
      /*  .right{*/
      /*    padding:5px 0 0 0;*/
      /*    .customer{*/
      /*      img{*/
      /*        height: 70px;*/
      /*        width: 70px;*/
      /*      }*/
      /*    }*/
      /*  }*/

      /*}*/
    }
</style>
