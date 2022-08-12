<template>
  <home-content-block class="home-content-todo">
    <zj-header title="待办任务">
      <template slot="right">
        <right-more-btn @click="toMore"></right-more-btn>
      </template>
    </zj-header>
    <div class="todo-block">
      <div
        class="todo-block-item"
        v-for="(item, index) in list"
        :key="`${index}todo`"
        :class="[index === 0 ? 'yw' : index === 1 ? 'ht' : 'rz']"
      >
        <div class="logo">
          <img v-if="index === 0" src="~@assets/img/home/todo/yw_bg.png" />
          <img v-if="index === 1" src="~@assets/img/home/todo/ht_bg.png" />
          <img v-if="index === 2" src="~@assets/img/home/todo/rz_bg.png" />
        </div>
        <div class="todo-info">
          <div class="num">{{ item.num }}</div>
          <div class="title">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </home-content-block>
</template>
<script>
import HomeContentBlock from '../../components/homeContentBlock'
import RightMoreBtn from '../../components/rightMoreBtn'
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
    toMore () {}
  }
}
</script>
<style lang="less" scoped>
.home-content-todo {
  height: 100%;
  .todo-block {
    display: flex;
    overflow: hidden;
    justify-content: space-between;
    align-items: center;
  }
  .todo-block-item {
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    height: 80px;
    display: flex;
    // align-items: center;
    padding-top: 5px;
    padding-left: 15px;
    padding-right: 20px;
    padding-bottom: 10px;
    font-weight: bold;
    margin-right: 2px;
    margin-bottom: 2px;
    z-index: 1;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      clip-path: polygon(0 50%,100% 0,100% 100%,0 100%);
      border-radius: 5px;
    }
    .logo,
    img {
      width: 60px;
    }
    // 业务管理
    &.yw {
      // background-color: #fff6ed;
      // box-shadow: 2px 2px 2px #fdba71;
      &::after {
        border: 1px solid #fdba71;
        background-color: #fff6ed;
      }
      .num {
        color: #ffa958;
      }
    }
    // 合同管理
    &.ht {
      // background-color: #ffefef;
      // box-shadow: 2px 2px 2px #fe687c;
      &::after {
        border: 1px solid #fe687c;
        background-color: #ffefef;
      }
      .num {
        color: #ff6d6d;
      }
    }
    // 融资审核
    &.rz {
      // background-color: #e6faff;
      // box-shadow: 2px 2px 2px #45cfb5;
      &::after {
        border: 1px solid #45cfb5;
        background-color: #e6faff;
      }
      .num {
        color: #1ec5a3;
      }
    }
    .todo-info {
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
    }
    .title {
      margin-left: 15px;
      font-size: 14px;
      color: #303133;
    }
    .num {
      // width: 100px;
      text-align: right;
      // flex: auto;
      font-size: 20px;
    }
  }
  // .todo-block-item + .todo-block-item {
  //   margin-top: 12px;
  // }
}
</style>
