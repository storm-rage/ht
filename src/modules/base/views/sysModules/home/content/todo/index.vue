<template>
  <home-content-block class="home-content-todo">
    <zj-header title="待办任务">
      <template slot="right">
        <right-more-btn @click="toMore"></right-more-btn>
      </template>
    </zj-header>
    <div class="todo-block">
      <div class="todo-block-item yw" v-for="(item,index) in list" :key="`${index}todo`" :class="[index===0?'yw':index===1?'ht':'rz']">
        <div class="item">
          <div class="num">{{item.num}}</div>
          <div class="desc">{{item.title}}</div>
        </div>
      </div>
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
  .todo-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .todo-block-item {
      flex: 0 0 30%;
      height: 130px;
      text-align: right;
      position: relative;
      // 业务管理
      &.yw {
        background: url("~@assets/img/home/todo/yw_bg.png") no-repeat;
        color: #FFA958;
      }
      // 合同管理
      &.ht {
        background: url("~@assets/img/home/todo/ht_bg.png") no-repeat;
        color: #FF6D6D;
      }
      // 融资审核
      &.rz {
        background: url("~@assets/img/home/todo/rz_bg.png") no-repeat;
        color: #1EC5A3;
      }
      .item {
        position: absolute;
        right: 30px;
        bottom: 30px;
        .title {
          font-weight: 400;
          font-size: 15px;
          color: #303133;
        }
        .num {
          font-weight: bold;
          font-size: 30px;
        }
      }
    }
  }
}
</style>
