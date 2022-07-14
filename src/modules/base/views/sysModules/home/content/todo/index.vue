<template>
  <home-content-block class="home-content-todo">
    <zj-header title="待办任务">
      <template slot="right">
        <right-more-btn @click="toMore"></right-more-btn>
      </template>
    </zj-header>
    <div class="todo-block-item yw"
         v-for="(item,index) in list"
         :key="`${index}todo`"
         :class="[index===0?'yw':index===1?'ht':'rz']">
      <div class="logo">
        <img v-if="index===0" src="~@assets/img/home/todo/yw_bg.png">
        <img v-if="index===1" src="~@assets/img/home/todo/ht_bg.png">
        <img v-if="index===2" src="~@assets/img/home/todo/rz_bg.png">
      </div>
      <div class="title"> {{item.title}}</div>
      <div class="num">{{item.num}}</div>
    </div>
  </home-content-block>
</template>
<script>
import HomeContentBlock from '../../components/homeContentBlock';
import RightMoreBtn from '../../components/rightMoreBtn';
export default {
  components: {
    HomeContentBlock,
    RightMoreBtn
  },
  data () {
    return {
      list: [
        {
          title: '业务管理',
          num: 9
        },
        {
          title: '合同管理',
          num: 100
        },
        {
          title: '融资审核',
          num: 20
        }
      ]
    }
  },
  methods: {
    toMore () {

    }
  }
};
</script>
<style lang="less" scoped>
.home-content-todo {
  height: 100%;
  .todo-block-item {
    position: relative;
    cursor: pointer;
    border-radius: 4px;
    height: 62px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    font-weight: bold;
    // 业务管理
    &.yw {
      background-color: #FFF6ED;
      .num {
        color: #FFA958;
      }
    }
    // 合同管理
    &.ht {
      background-color: #FFEFEF;
      .num {
        color: #FF6D6D;
      }
    }
    // 融资审核
    &.rz {
      background-color: #E6FAFF;
      .num {
        color: #1EC5A3;
      }
    }
    .title {
      margin-left: 15px;
      font-size: 16px;
      color: #303133;
    }
    .num {
      width: 100px;
      text-align: right;
      flex: auto;
      font-size: 30px;
    }
  }
  .todo-block-item+ .todo-block-item{
    margin-top: 12px;
  }
}
</style>
