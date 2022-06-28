<template>
<div id="newFaceRecognition">
  <!--  头部 close是使用关闭按钮 :close="true" @resetState="resetState" -->
  <LoginHeader ref="header" :routerList="headerList" class="faceHeader"/>
  <!--  中间内容  -->
  <div class="faceMain" :style="{paddingTop:!isList ? '3vh' : '7vh'}">
    <div class="centerBox">
      <!--     标题      -->
      <div class="centerTitle">
        <h2 :style="{display:agreeType === 'YH_THREE' ? 'none' : 'block'}" >
          <template v-if="frtFlag">
            <img src="~@assets/img/faceRecognition/success.png"/>
            恭喜您！已成功注册！
          </template>
          <template v-else>
            <img src="~@assets/img/faceRecognition/warningRrror.png" style="transform: translateY(0.8vh)"/>
            <span style="color: red">发生错误！请联系管理员！</span>
          </template>

        </h2>
      </div>
      <!--     身体       -->
      <div class="centerBody" :class="[ !onlyFace && !threeANDtwo ? 'w80' : '',onlyFace ? 'ta-c' : '']">
        <div class="floatBox">
          <!-- 人脸识别 -->
          <div class="faceBox" v-if="onlyFace" :class=" onlyFace && !threeANDtwo && !onlyProtocol ? 'oneHaveFace' : ''">
            <div class="faceBox-header">
              <div class="number" v-if="threeANDtwo">①</div>
              <div class="content">
                <p>打开支付宝或微信</p>
                <p>扫描下方二维码完成人脸识别</p>
              </div>
            </div>
            <div class="faceBox-body">
              <img :src="faceCodeSrc"/>
              <div class="resetBox">
                <zj-button class="resetFace" @click="newFaceCode" v-show="getNewFace">点击重新识别</zj-button>
                <p class="faceMsg" :class=" getNewFace ? 'error' : 'success'">{{faceMsg}}</p>
              </div>

            </div>
          </div>
          <!-- 向右箭头 -->
          <div class="arrowsBox" v-if="threeANDtwo">
            <img src="~@assets/img/faceRecognition/arrows.png" :class=" getNewFace ? 'resetArrows' : ''"/>
          </div>
          <!-- 协议图片 -->
          <div class="protocolBox" :class="[ !onlyFace && !threeANDtwo ? 'protocolWidth' : '']" v-if="onlyProtocol">
            <!-- 标题 -->
            <div class="protocolBox-header" v-if="isList">
              <div class="number" v-if="threeANDtwo">②</div>
              <div class="content">签署用户服务协议</div>
            </div>
            <!-- 身体 -->
            <div class="protocolBox-body" v-if="isList">
              <img src="~@assets/img/faceRecognition/protocol.png"/>
            </div>

            <!-- 签署协议 -->
            <div v-if="!isList" class="ratifyAccord">
              <div class="entList">
                <div class="company" v-for="(item,index) in agreeList" :key="index" @click="agreeEntClick(item)"
                     :class="agreeEntActive === item.coreEntName || agreeEntActive === item.entName ? 'entCheck' : ''"
                >
                  {{item.coreEntName || item.entName}}
                </div>
              </div>
              <p class="hint">
                {{ agreeType === 'YH_TWO' ? '您仅剩一步即可完成账户激活，请阅读并签署如下用户服务协议：'
                : agreeType === 'YH_THREE' ? '请阅读并签署如下用户服务协议：'
                : ''
                }}
              </p>
              <div v-if="agreeEntActive" class="protocolContent">
                <div style="overflow-y: scroll;border: 1px solid #999999;" class="zj-m-b-15 h400px">
                  <div v-show="agreeCheckItem.type === 'html'">
                    <div class="zj-m-y-20 zj-m-x-30" v-html="agreeCheckItem.agreementContent"/>
                  </div>
                  <div v-show="agreeCheckItem.type === 'flow'">
                    <div class="zj-m-b-10 pdfImg">
<!--                      <img :src="agreeCheckItem.viewUrl"  v-show="agreeCheckItem.viewType==='image'"/>-->
                      <div id="pdfCanvasItem" class="pdfCanvasItem" v-show="agreeCheckItem.viewType==='pdf'" />
                    </div>
                  </div>
                </div>
                <div class="btnSign">
                  <zj-button status="primary" @click="signUserProtocol(agreeCheckItem)">同意并签署</zj-button>
                </div>
              </div>

            </div>
          </div> <!-- protocolWidth -->
        </div>
        <!-- 人脸识别用户提示 -->
        <div class="faceMsg ta-c" v-if="onlyFace">
          您当前账户的使用者为：&nbsp;{{userName}} <b/>需本人进行该操作，方能审批通过
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
import newFaceRecognition from "./js/newFaceRecognition";
export default newFaceRecognition
</script>

<style lang="less">
  #newFaceRecognition{
    width: 100%;
    height: 100%;
    background-color: white;
    min-width: 900px;
    min-height: 720px;
    z-index: 9;
    //头部
    .faceHeader{
      position: relative;
      top: 0;
    }
    //底部
    .faceFooter{
      position: relative;
      bottom: 0;
    }
    //主体内容
    .faceMain{
      position: relative;
      min-height: calc(100% - 68px - 165px) !important;
      box-sizing: border-box;
      padding: 7vh 0 3vh 0;
      color: #333;
      /*span,p{*/
      /*  font-size: 12px;*/
      /*}*/
      //居中内容
      .centerBox{
        margin:0 auto;
        height: 100%;
        width: 65%;
        //标题
        .centerTitle{
          text-align: center;
          padding-bottom: 15px;
          h2{
            color: #8ec31f;
            font-weight: normal;
            text-indent: 3px;
            img{
              width: 28px;
              height: 30px;
              padding-top: 2px
            }
          }
          span{
            color: #333;
            display: inline-block;
            padding: 10px 0 15px 0;
          }
        }
        //身体
        .centerBody{
          width: 70%;
          margin: auto;
          /*text-align: center;*/
          &.w80{
            width: 80%;
          }
          .floatBox{
            display: flex;
            justify-items: center;
            //人脸识别
            .faceBox{
              display: inline-block;
              width: 40%;
              &.oneHaveFace{
                margin: auto;
              }
              .faceBox-header{ //标题
                .number{
                  display: inline-block;
                  font-size: 22px;
                  vertical-align: top;
                }
                .content{
                  display: inline-block;
                  padding: 7px 0 0 5px;
                  text-align: left;
                  p{
                    color: #333333;
                    font-size: 14px;
                    font-weight: bold;
                  }
                }
              }
              .faceBox-body{
                /*padding: 10px 0;*/
                img{
                  width: 160px;
                  height: 160px;
                  margin-left: 5px;
                }
                .resetBox{
                  text-align: center;
                  padding-bottom: 10px;
                  .resetFace{
                    background-color: #1566A2!important;
                    color: white!important;
                    border-radius: 12px;
                    width: 140px;
                  }
                  .faceMsg{
                    padding-top: 2px;
                    font-size: 14px;
                  }
                }

              }
            }
            //向右箭头
            .arrowsBox{
              width: 20%;
              display: flex;
              align-items: center;
              justify-content: center;
              /*height: 200px;*/
              /*padding-top: 120px;*/
              img{
                width: 45px; //45
                height: 53px; //53
                /*padding-bottom: 40px;*/
                &.resetArrows{
                  width: 45px; //45
                  height: 93px; //53
                  padding-bottom: 40px;
                }
              }
            }
            //协议图片
            .protocolBox{
              vertical-align: top;
              display: inline-block;
              width: 40%;
              &.protocolWidth{
                width: 100%;
              }
              //标题
              .protocolBox-header{
                .number{
                  display: inline-block;
                  font-size: 22px;
                  vertical-align: top;
                  color: #d0d0d0;
                }
                .content{
                  display: inline-block;
                  padding: 7px 0 0 5px;
                  text-align: left;
                  color: #d0d0d0;
                  /*font-weight: bold;*/
                }
              }
              //身体
              .protocolBox-body{
                img{
                  width: 120px; //100
                  padding: 25px 0 0 20px;
                  height: 130px;//105px
                }
              }

              //签署协议
              .ratifyAccord{
                .entList{
                  text-align: left;
                  .company{
                    display: inline-block;
                    cursor: pointer;
                    height: 29px;
                    font-weight: bold;
                    font-size: 14px;
                    line-height: 32px;
                    text-indent: 29px;
                    margin-right: 55px;
                    background: url("~@assets/img/faceRecognition/ent.png") left center no-repeat;
                    &.entCheck{
                      color: #5494f2;
                      background: url("~@assets/img/faceRecognition/entO.png") left center no-repeat;
                    }
                  }
                }
                .hint{ //提示
                  text-align: left;
                  padding: 8px 0 5px;
                  font-size: 12px;
                }
                .protocolContent{ //协议框
                  .pdfImg{
                    position: relative;
                    padding-bottom: 30px;
                    .pdfCanvasItem{
                      height: 400px;
                      /*overflow-y: scroll;*/
                    }
                    .fot-btn-row{
                      position: absolute;
                      height: 30px;
                      border-bottom: 0;
                    }
                  }
                  .btnSign{
                    text-align: center;
                    button{
                      width: 125px;
                    }
                  }
                }
              }
            }
          }
          //人脸识别身份
          .faceMsg{
            text-align: center;
            color: #999999;
            font-size: 14px;
            padding-top: 20px;
            b{
              display: inline-block;
              width: 22px;
            }
          }
        }
      }
    }
  }
  .commonFace{

  }
</style>
