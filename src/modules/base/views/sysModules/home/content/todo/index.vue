<template>
  <!-- <home-content-block class="home-content-todo">
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
  </home-content-block> -->
  <home-content-block class="home-content-todo" v-loading="loading">
    <zj-header title="待办任务">
      <template slot="right">
        <right-more-btn @click.native="toMore"></right-more-btn>
      </template>
    </zj-header>
    <div class="todo-block" >
      <div
        class="todo-block-item yw"
        v-for="(item, index) in list"
        :key="`${index}todo`"
        @click="goToDo(item)"
      >
        <!-- :class="[index === 0 ? 'yw' : index === 1 ? 'ht' : 'rz']" -->
        <!-- <div class="logo">
          <img src="~@assets/img/home/todo/yw_bg.png" />
          <img v-if="index === 1" src="~@assets/img/home/todo/ht_bg.png" />
          <img v-if="index === 2" src="~@assets/img/home/todo/rz_bg.png" />
        </div> -->
        <div class="title">{{ item.name }}</div>
        <div class="num">{{ item.number }}</div>
      </div>
    </div>
  </home-content-block>
</template>
<script>
import HomeContentBlock from '../../components/homeContentBlock'
import RightMoreBtn from '../../components/rightMoreBtn'
import { mapState } from 'vuex'
import { EntType } from '@modules/constant'
export default {
  computed: {
    ...mapState({
      entInfo: state => state.enterprise.entInfo
    })
  },
  components: {
    HomeContentBlock,
    RightMoreBtn
  },
  data () {
    return {
      loading: false,
      zjControl: {
        queryBackLog: this.$api.home.queryBackLog
      },
      EntType: EntType,
      list: []
    }
  },
  mounted () {
    this.getApi()
    this.getList()
  },
  methods: {
    toMore () {
      this.goChild('myTodo')
    },
    goToDo (item) {
      // 核心企业、供应商不跳待办
      this.goChild(
        this.entInfo.entType === EntType.HX || this.entInfo.entType === EntType.GYS
          ? item.router
          : 'myTodo',
        { busType: item.busType }
      )
    },
    getList () {
      this.loading = true
      this.zjControl
        .queryBackLog()
        .then(res => {
          this.loading = false
          this.list = res.data.innerList || []
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="less" scoped>
// 新的样式
.home-content-todo {
  height: 100%;
  .todo-block {
    max-height: 320px;
    overflow: auto;
    margin-right: -20px;
    padding-right: 20px;
  }
  .todo-block-item {
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    // font-weight: bold;
    font-size: 14px;
    .title {
      margin-left: 15px;
      font-weight: 700;
      color: #303133;
    }
    .num {
      text-align: right;
      font-size: 16px;
      color: red;
    }
  }
  .todo-block-item {
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
  }
}

// 原样式
/* .home-content-todo {
  height: 100%;
  .todo-block-item {
    position: relative;
    cursor: pointer;
    border-radius: 4px;
    height: 80px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    font-weight: bold;
    .logo,
    img {
      width: 60px;
    }
    // 业务管理
    &.yw {
      background-color: #fff6ed;
      .num {
        color: #ffa958;
      }
    }
    // 合同管理
    &.ht {
      background-color: #ffefef;
      .num {
        color: #ff6d6d;
      }
    }
    // 融资审核
    &.rz {
      background-color: #e6faff;
      .num {
        color: #1ec5a3;
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
  .todo-block-item {
    margin-top: 12px;
    &:first-child {
      margin-top: 0;
    }
  }
} */
</style>
