<template>
  <div class="money-block">
    <img v-if="imgName" :src="loadImg()">
    <span class="text">{{text}}</span>
    <span class="money">{{moneyNoSynbol(amount,'¥ ')}}</span>
    <span class="tips-text" v-if="tipsText">{{tipsText}}</span>
    <slot name="base"></slot>
  </div>
</template>
<script>
export default {
  props: {
    imgName: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    amount: {
      type: [Number, String],
      default: null
    },
    tipsText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {};
  },
  methods: {
    loadImg () {
      return require(`./img/${this.imgName}.png`);
    },
    // mbMoney(num,split){
    //   if (!num){
    //     return ' 0.00'
    //   }
    //   let moneyList = String(num).split('.')
    //   if(moneyList[1]){
    //     if(moneyList[1].length > 2){
    //       moneyList[1] = moneyList[1].slice(0,2)
    //     }
    //     else if(moneyList[1].length < 2){
    //       moneyList[1] = moneyList[1] + '0'
    //     }
    //   }else{
    //     moneyList[1] = '00'
    //   }
    //   moneyList[0] = moneyList[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    //   return `${split || ' '}${moneyList.join('.')}`
    // }
  }
};
</script>
<style lang="less" scoped>
.money-block {
  padding: 6px 15px;
  margin-bottom: 15px;
  background-color: #fff;
  margin-top: -5px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: -16px;
    height: 10px;
    background-color: #eff3f6;
    //width: calc(100% + 30px);
    left: 0;
    right: 0;
  }
  img {
    height: 100%;
    vertical-align: middle;
  }
  .text {
    margin-left: 10px;
    font-size: 14px;
  }
  .money{
    color: #333333;
    font-size: 32px;
    font-weight: 650;
    vertical-align: middle;
  }
  .tips-text {
    /*vertical-align: bottom;*/
    color: #999999;
    padding-left: 0.5em;
    font-size: 14px;
  }
  .btn-slot{
    position: absolute;
    right: 1em;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
