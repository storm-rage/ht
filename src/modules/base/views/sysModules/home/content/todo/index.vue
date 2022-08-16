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
        <!-- <div class="logo">
          <img v-if="index === 0" src="~@assets/img/home/todo/yw_bg.png" />
          <img v-if="index === 1" src="~@assets/img/home/todo/ht_bg.png" />
          <img v-if="index === 2" src="~@assets/img/home/todo/rz_bg.png" />
        </div> -->
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
    width: 220px;
    height: 131px;
    font-weight: bold;
    z-index: 1;
    // .logo,
    // img {
    //   width: 60px;
    // }
    // 业务管理
    &.yw {
      background: url(~@assets/img/home/todo/yw_nbg.png) no-repeat center;
      .num {
        color: #ffa958;
      }
    }
    // 合同管理
    &.ht {
      background: url(~@assets/img/home/todo/ht_nbg.png) no-repeat center;
      .num {
        color: #ff6d6d;
      }
    }
    // 融资审核
    &.rz {
      background: url(~@assets/img/home/todo/rz_nbg.png) no-repeat center;
      .num {
        color: #1ec5a3;
      }
    }
    .todo-info {
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      position: absolute;
      right: 30px;
      bottom: 20px;
      .title {
        margin-left: 15px;
        font-size: 14px;
        color: #303133;
      }
      .num {
        text-align: right;
        font-size: 20px;
      }
    }
  }
  // .todo-block-item + .todo-block-item {
  //   margin-top: 12px;
  // }
}
</style>
