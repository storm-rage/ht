<template>
  <div class="home-notice">
    <zj-header title="站内信">
      <el-button slot="right" type="primary" size="mini" style="width: 100px">全部已读</el-button>
    </zj-header>
    <zj-content-block>
      <zj-content>
        <div class="notice-content-block" v-for="(item,index) in list" :key="index">
          <div class="notice-content">
            <div class="left-img">
              <img src="./img/message.png">
            </div>
            <div class="top-content">
              <div class="top">
                <div class="title"><span v-if="!item.isRead" class="not-read"></span>{{item.title}}</div>
                <div class="date"><span v-if="item.sender">Admin&nbsp;&nbsp;|</span>&nbsp;&nbsp;{{item.sendTime}}</div>
              </div>
              <div class="detail-btn" :class="{'not-read': !item.isRead}">
                <el-link type="primary" @click="toViewDetail(item)">详情</el-link>
              </div>
            </div>
          </div>
          <div class="detail-content" :class="{'is-show':selectIds.includes(item.id)}">{{item.content}}</div>
        </div>
        <div class="zj-m-t-15">
          <vxe-pager
            background
            :current-page.sync="currentPage"
            :page-size.sync="pageSize"
            :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump']">
          </vxe-pager>
        </div>
      </zj-content>
    </zj-content-block>

  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {
          id: '1',
          title: '我是公告title',
          isRead: false,
          sender: '张三',
          sendTime: '2022-10-10',
          content: '内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了'
        },
        {
          id: '2',
          title: '不知名的title',
          isRead: false,
          sender: '李四',
          sendTime: '2022-06-10',
          content: '内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了'
        },
        {
          id: '3',
          title: '不知名的title2',
          isRead: true,
          sendTime: '2022-08-10',
          content: '内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了内容来了'
        }
      ],
      selectIds: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    toViewDetail (item) {
      if (!this.selectIds.includes(item.id)) {
        this.selectIds.push(item.id);
      }else {
        const index = this.selectIds.findIndex((id) => id === item.id);
        this.$delete(this.selectIds, index);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.home-notice {
  background: #eff3f6!important;
  padding: 20px 0;
  .notice-content-block {
    padding: 15px 10px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: rgba(255,255,255,.7);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    .notice-content {
      display: flex;
      align-items: center;
      .left-img {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
          height: 100%;
          vertical-align: middle;
        }
      }
      .top-content {
        margin-left: 15px;
        flex: 1;
        justify-content: center;
        overflow: hidden;
        .top {
          .title {
            display: inline-block;
            width: 70%;
            font-size: 16px;
            font-weight: bold;
            .not-read {
              display: inline-block;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background-color: red;
              vertical-align: middle;
              margin-right: 4px;
            }
          }
          .date {
            display: inline-block;
            text-align: right;
            width: 30%;
          }
        }
        .detail-btn{
          &.not-read {
            margin-left: 10px;
          }
        }
      }
    }
    .detail-content {
      display: none;
      height: 0;
      transition: height .2s ease-in;
      &.is-show {
        display: block;
        height: auto;
        padding: 10px 60px;
      }
    }
  }
  .notice-content-block+.notice-content-block {
    margin-top: 10px;
  }
}
</style>
