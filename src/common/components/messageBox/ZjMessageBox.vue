<template>
  <div>
    <div class="mask" v-show="show"></div>
    <transition-group name="bounce" tag="div">
      <div class="zj-message-box" :class="`border-${type}`" key="1" v-show="show" style="z-index:9999999999;">
        <div class="zj-message-box--title" :class="`msg-${type}`">
          {{title}}
          <div class="title-close-btn" @click="toClose">X</div>
        </div>
        <div class="zj-message-box--content" :class="{center}">
          <div class="content-container" :class="{center}">
            <div v-if="type!='default'" class="img">
              <img :src="loadImg(type)" alt="">
            </div>
            <slot>
              <div class="text" v-if="useHTMLString" v-html="content"></div>
              <div class="text" v-else>{{content}}</div>
            </slot>
          </div>
          <!--      <div class="zj-message-box&#45;&#45;other-info" v-if="otherContent">
                  <div class="text" v-if="useHTMLString" v-html="otherContent"></div>
                  <div class="text" v-else>{{otherContent}}</div>
                </div>-->
        </div>
        <div class="zj-message-box--footer">
          <div class="footer-tip" v-if="tipContent">
            {{tipContent}}
          </div>
          <div class="footer-btns" v-if="showCancelButton||showConfirmButton">
            <div class="confirm btn" @click="toConfirm" :class="`msg-${type}`" v-if="showConfirmButton">{{confirmText}}</div>
            <div class="cancel btn" @click="toCancel" :class="`msg-${type}`" v-if="showCancelButton">{{cancelText}}</div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>

</template>
<script>
export default {
  name: 'ZjMessageBox',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    },
    content: String,
    otherContent: String,
    title: {
      type: String,
      default: '提示'
    },
    showClose:Boolean,
    tipContent: String,
    showCancelButton: Boolean,
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    useHTMLString:Boolean,
    center: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    };
  },
  created() {
  },
  methods: {
    toClose () {
      this.messageReject(false);
      this.show = false;
    },
    resetData () {
      this.type = 'default';
      this.content = '';
      this.otherContent = '';
      this.showClose = false;
      this.tipContent = '';
      this.showCancelButton = false;
      // this.showConfirmButton = false;
      this.cancelText = '取消';
      this.confirmText = '确认';
      // this.center = false;
    },
    loadImg (type) {
      return require(`./img/${type}.png`);
    },
    toCancel () {
      this.messageReject(false);
      this.show = false;
    },
    toConfirm () {
      this.messageResolve(true);
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
@btn-border-color:#c2c2c2;
@success:#0FCE96;
@warning:#EF6666;
@default:#5494F2;
@info:#D3B366;
@box-width: 350px;
@content-width:~"calc(@{box-width} - 20px)";
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: #000;
  z-index: 4000;
}
.bounce-enter-active {
  //-webkit-animation: bounce-in 0.1s;
  //animation: bounce-in 0.1s;
}
.bounce-leave-active {
  //-webkit-animation: bounce-in 0.03s reverse;
  //animation: bounce-in 0.03s reverse;
}
@-webkit-keyframes bounce-in {
  0% {
    transform: scale(0.1);
    opacity: 0.1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes bounce-in {
  0% {
    transform: scale(0.2);
    opacity: 0.1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
  .zj-message-box {
    position: fixed;
    width: @box-width;
    margin: auto;
    z-index: 4000;
    left: 50%;
    top: 50%;
    overflow: hidden;
    transform: translate(-50%, -50%);
    //left: 0;
    //right: 0;
    //bottom: 0;
    //top: 0;
    background: #fff;
    border-radius: 6px;
    display: table;
    border: 1px solid @default ;
    box-shadow: 2px 2px 12px #7B7F8480;
    &.border-success {
      border-color: @success;
    }
    &.border-warning,&.border-error{
      border-color: @warning;
    }
    &.border-info,&.border-confirm{
      border-color: @info;
    }
    .zj-message-box--title {
      text-align: center;
      color: #fff;
      font-size: 15px;
      font-family: 'PingFangSC-Medium';
      line-height: 20px;
      padding: 6px 0;
      //border-radius: 6px 6px 0 0;
      &.msg-default {
        background: @default;
      }
      &.msg-success {
        background: @success;
      }
      &.msg-warning,&.msg-error {
        background: @warning;
      }
      &.msg-info,&.msg-confirm {
        background: @info;
      }
      .title-close-btn {
        font-family:Verdana;
        color: #fff;
        float: right;
        padding-right: 10px;
        cursor: pointer;
        font-size: 13px;
      }
    }
    .zj-message-box--content{
      padding: 20px 10px;
      &.center {
        width: @content-width;
        margin: 0 auto;
      }
      //text-align: center;
      .content-container {
        display: flex;
        justify-content: center;
        &.center {
          align-items: center;
        }
        .img {
          margin-right: 20px;
        }
        .text {
          ont-family: PingFangSC-Regular;
          font-size: 14px;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
    }
    .zj-message-box--other-info {
      margin-top: 12px;
      ont-family: PingFangSC-Regular;
      font-size: 14px;
    }
    .zj-message-box--footer {
      text-align: center;
      padding: 0 10px 20px;
      .footer-btns {
        display: flex;
        justify-items: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-around;
        .btn {
          height: 35px;
          line-height: 30px;
          flex: 0 0 45%;
          /*min-width: 140px;*/
          background: #FFFFFF;
          border: 1px solid @btn-border-color;
          border-radius: 6px;
          padding: 2px 0;
          cursor:pointer;
          font-size: 14px;
          &.msg-success {
            //color: @success;
            &:hover {
              color: @success;
              border-color: @success;
            }
          }
          &.msg-default {
            //color: @default;
            &:hover {
              color: @default;
              border-color: @default;
            }
          }
          &.msg-warning,&.msg-error {
            //color: @warning;
            &:hover {
              color: @warning;
              border-color: @warning;
            }
          }
          &.msg-info,&.msg-confirm {
            //color: @info;
            &:hover {
              color: @info;
              border-color: @info;
            }
          }
        }
      }
      .footer-tip {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
      }
    }
  }
</style>
