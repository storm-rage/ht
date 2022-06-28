<template>
<div class="FaceRecognition" v-show="dialogVisible">
    <!--  头部 close是使用关闭按钮 :close="true" @resetState="resetState" -->
    <LoginHeader ref="header" :routerList="headerList" class="faceHeader"/>
    <!--  中间内容  -->
    <div class="faceMain" :style="{paddingTop:!isList ? '3vh' : '7vh'}">
        <div class="centerBox">
            <!--     提示信息       -->
            <div class="centerTitle">
                <h2>
                  <img src="~@pubComponent/messageBox/img/success.png" style="width: 28px;height: 32px;padding-top: 2px"/>
                  恭喜您！已成功注册！
                </h2>
                <span v-if="isList">{{protocolType}}</span>
            </div>
            <!--     解析人脸识别之后服务端传回来的html       -->
            <div></div>
            <!--     当服务端传回html后，代表着人脸识别已经完成，则需把下方的元素隐藏掉       -->
            <!-- 需要人脸识别以及签署协议  -->
            <div class="twoORthree">
                <div class="commonFace" v-if="onlyFace">
                    <div class="commonFace-header"></div>
                    <div>
                        <!--    当为两方协议时需要该有序号    -->
                        <i class="serialNumber" v-if="threeANDtwo">1</i>
                        <div style="text-align: center" :class="threeANDtwo ? 'pLeft' : ''">
                            <p>打开支付宝或微信</p>
                            <p>扫描下方二维码完成人脸识别</p>
                        </div>
                    </div>
                    <img :src="faceCodeSrc"/>
                    <p class="sbwc" @click="newFaceCode" v-show="getNewFace">点击重新识别</p>
                    <p :class=" getNewFace ? 'sbsb' : 'sbcg'">{{faceMsg}}</p>
                </div>
                <div class="userIn" v-if="onlyFace">
                  您当前账户的使用者为：&nbsp;{{userName}} &nbsp;&nbsp;&nbsp; 需本人进行该操作，方能审批通过
                </div>
                <!--  当为三方协议时需把arrows与protocol隐藏掉   -->
                <div class="arrows" v-if="threeANDtwo"></div>
                <div class="protocol" :class="[threeANDtwo ? 'haveFace' : '',!isList ? 'protocolWidth' : '']" v-if="onlyProtocol">
                    <p v-if="isList">
                        <i class="serialNumber" style="transform: translate(-10px,-1px);text-indent: -1px" v-if="threeANDtwo">2</i>
                        <span>签署用户协议</span>
                    </p>
                    <img src="~@assets//img/layout/UserServiceAgreement.png" v-if="isList"/>
                    <div v-if="!isList" class="centerBoxUser">
                      <div class="userAgree zj-p-t-20">
                        <template v-if="agreeType === 'YH_TWO'">
                          <p class="ta-l zj-p-l-0" style="text-indent: 0">您仅剩一步即可完成账户激活，请阅读并签署如下用户服务协议：</p>
                        </template>
                        <template v-if="agreeType === 'YH_THREE'">
                          <el-row class="ta-l zj-p-b-20">
                            <el-radio-group v-model="agreeEntActive" @change="agreeEntChange">
                              <el-radio v-for="(item,index) in agreeList" :key="index"
                                        :label="item.coreEntName">{{item.coreEntName}}</el-radio>
                            </el-radio-group>
                          </el-row>
                          <p class="ta-l zj-p-l-0" style="text-indent: 0" v-if="agreeEntActive">{{mapMethod()}}用户服务协议：</p>
                        </template>
                      </div>
                      <div v-if="agreeEntActive" class="body">
                         <div style="height: 400px;overflow-y: scroll;border: 1px solid #999999;" class="zj-m-b-15">
                           <div v-show="agreeCheckItem.type === 'html'">
                             <div style="margin: 20px 30px" v-html="agreeCheckItem.agreementContent"/>
                           </div>
                           <div v-show="agreeCheckItem.type === 'flow'">
                             <div class="zj-m-b-10 pdfImg">
                               <img :src="agreeCheckItem.viewUrl"  v-show="agreeCheckItem.viewType==='image'"/>
                               <div id="pdfCanvasItem" class="pdfCanvasItem" v-show="agreeCheckItem.viewType==='pdf'" />
                             </div>
                           </div>
                         </div>
                        <zj-button @click="signUserProtocol(agreeCheckItem)">同意并签署</zj-button>
                      </div>
<!--                      <el-collapse ref="elCollapse" class="agreeCollapse" v-model="agreeActive" @change="agreeChange">-->
<!--                        <el-collapse-item v-for="(item,index) in agreeList" :key="index" :name="index"-->
<!--                                          :class="index !== agreeList.length -1 ? 'no-he-bo' : ''">-->
<!--                          <template slot="title">-->
<!--                            <el-row class="header">{{item.coreEntName ? item.coreEntName :item.agreementName}}</el-row>-->
<!--                          </template>-->
<!--                          <div class="body">-->
<!--                            &lt;!&ndash; html &ndash;&gt;-->
<!--                            <template v-if="item.type === 'html'">-->
<!--                              <div style="margin: 20px 30px" v-html="item.agreementContent"/>-->
<!--                              <el-row class="ta-c zj-p-t-20">-->
<!--                                <zj-button @click="signUserProtocol(item)">同意并签署</zj-button>-->
<!--                              </el-row>-->
<!--                            </template>-->
<!--                            &lt;!&ndash; flow &ndash;&gt;-->
<!--                            <template v-if="item.type === 'flow'">-->
<!--                              <div class="zj-m-b-10 pdfImg">-->
<!--                                <img :src="item.viewUrl"  v-if="item.viewType==='image'"/>-->
<!--                                <div :id="'pdfCanvasItem'+index" class="pdfCanvasItem" v-if="item.viewType==='pdf'" />-->
<!--                              </div>-->
<!--                              <el-row class="ta-c fot-btn-row">-->
<!--                                <zj-button @click="signUserProtocol(item)">同意并签署</zj-button>-->
<!--                              </el-row>-->
<!--                            </template>-->
<!--                          </div>-->
<!--                        </el-collapse-item>-->
<!--                      </el-collapse>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--  底部  -->
    <LoginFooter ref="footer" class="faceFooter"/>

    <!-- 云证书签章 -->
    <zj-certuficate ref="certuficate" @confirm="signConfirm"/>
</div>
</template>

<script>
import faceRecognition from "./js/faceRecognition";
export default faceRecognition
</script>
<style scoped lang="less">
  .FaceRecognition{
    width: 100%;
    height: 100%;
    //position: absolute;
    //left: 0;
    //top: 0;
    background-color: white;
    min-width: 900px;
    min-height: 720px;
    z-index: 9;
    .protocolWidth{
      width: 800px!important;
    }
    .faceHeader{
      position: relative;
      top: 0;
    }
    .faceMain{
      position: relative;
      min-height: calc(100% - 68px - 165px) !important;
      box-sizing: border-box;
      padding: 7vh 0 3vh 0;
      color: #333;
      span,p{
        font-size: 12px;
      }
      .centerBox{
        margin:0 auto;
        height: 100%;
        width: 70%;
        .centerTitle{
          text-align: center;
          h2{
            color: #8ec31f;
            font-weight: normal;
            text-indent: 3px;
          }
          span{
            color: #333;
            display: inline-block;
            padding: 10px 0 15px 0;
          }
        }
        .twoORthree{
          text-align: center;
          .commonFace,.arrows,.protocol{
            display: inline-block;
          }
          .commonFace{
            text-align: center;
            .pLeft{
              text-indent: -14px;
            }
            img{
              width: 200px;
              height: 200px;
            }
            .sbwc{
              color:#169BD5;
              text-decoration:underline;
              cursor: pointer;
              margin: 6px 0 8px 0;
            }
            .userIn{
              text-align: left;
              &:after{
                content: "";
                display: block;
                clear: both;
              }
              p{
                text-align: center;
                color: rgba(10,180,40,1);
                font-size: 14px;
                &:after{
                  content: "";
                  display: block;
                  clear: both;
                }
              }
            }
            .sbsb,.sbcg{
              margin-top: 8px;
              font-weight: bold;
            }
            .sbsb{
              color: red;
            }
            .sbcg{
              color: green;
            }
          }
          /* 中间箭头 */
          .arrows{
            width: 180px;
            transform: translateY(-110px);
            &:before,&:after{
              content: "";
              display: inline-block;
              background-color: rgba(150,150,150,0.6);
            }
            &:before{
              height: 5px;
              width: 76%;
              transform: translateY(-10px);
            }
            &:after{
              width: 0px;
              height: 0px;
              border-width: 12px 12px 12px 12px;
              border-color: white white white rgba(150,150,150,0.5);
              border-style: solid;
            }
          }
          /*  协议  */
          .protocol{
            img{
              width: 150px;
              height: 130px;
              margin-top: 3px;
            }
          }
          .haveFace{
            text-align: left;
            text-indent: 5px;
            transform: translateY(-190px);
            img{
              transform: translateX(15px);
            }
          }
          .noFace{
            text-align: center;
            img{
              transform: translateX(13px);
            }
          }
        }
      }
      .serialNumber{
        font-style: normal;
        width: 26px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        font-weight: bold;
        border: 1px solid gray;
        border-radius: 50%;
        margin-right: 5px;
        float: left;
        &:first-child{
          transform: translate(-5px,6px);
        }
      }
    }
    .faceFooter{
      position: relative;
      bottom: 0;
    }
  }
</style>

<style lang="less">
.agreeCollapse{
  .el-collapse-item{
    border: 1px solid gray;
    //有下边框
    &.is-active{
      .el-collapse-item__header{
        border-bottom: 1px solid gray;
      }
    }
    //无下边框
    &.no-he-bo{
      border-bottom: none!important;
      &.is-active{
        border-bottom: none!important;
      }
    }

    //头部
    .el-collapse-item__header{
      height: 30px;
      position: relative;
      overflow: hidden;
      .el-collapse-item__arrow{
        position: absolute;
        right: 8px;
        margin-left: 0!important;
      }
      .header{
        position: absolute;
        width: 100%;
        text-align: center!important;
        /*background-color: #d08b8b;*/
      }
    }
    //查看器
    .pdfImg{
      position: relative;
      padding-bottom: 30px;
      .pdfCanvasItem{
        height: 400px;
        overflow-y: scroll;
      }
      .fot-btn-row{
        position: absolute;
        height: 30px;
        border-bottom: 0;
      }
    }
  }
}
  .FaceRecognition{
    .centerBoxUser{
      .userAgree{
        .header{

        }
      }
    }

  }
</style>
