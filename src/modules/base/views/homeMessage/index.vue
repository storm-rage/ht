<template>
  <div ref="homeNotice" class="home-notice">
    <zj-header title="站内信">
      <el-button
        slot="right"
        type="primary"
        size="mini"
        @click="handleAllReade"
        style="width: 100px"
        >全部已读</el-button
      >
    </zj-header>
    <zj-content-block v-loading="loading" style="padding-bottom: 0;">
      <zj-content>
        <!-- <div class="notice-content-block" v-for="(item,index) in list" :key="index">
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
        </div> -->
        <el-collapse
          v-model="collActive"
          @change="handleCollapseChange"
          class="notice-content-box"
          :style="{ maxHeight: listMaxHeight }"
        >
          <el-collapse-item
            class="notice-content-item"
            v-for="item in list"
            :key="item.id"
            :name="item.id"
          >
            <template slot="title">
              <div class="notice-header">
                <i
                  :class="[
                    'left-icon',
                    'el-collapse-item__arrow',
                    'el-icon-arrow-right',
                    collActive.includes(item.id) ? 'is-active' : ''
                  ]"
                ></i>
                <div class="header-title">
                  <div class="title-type">系统公告</div>
                  <div
                    class="title-theme"
                    :class="{ 'is-reade': item.isReadFlag == '1' }"
                  >
                    {{ item.messageTitle }}
                  </div>
                </div>
                <div class="right-info">
                  <span v-if="item.creator"
                    >{{ item.creator }}&nbsp;&nbsp;|</span
                  >&nbsp;&nbsp;{{ item.sendDatetime }}
                </div>
              </div>
            </template>
            <div>{{ item.messageContent }}</div>
          </el-collapse-item>
        </el-collapse>
        <div class="zj-m-t-15">
          <vxe-pager
            background
            :current-page.sync="currentPage"
            :page-size.sync="pageSize"
            :layouts="[
              'PrevJump',
              'PrevPage',
              'JumpNumber',
              'NextPage',
              'NextJump',
              'Sizes',
              'FullJump'
            ]"
            @page-change="getList"
          >
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
      loading: false,
      collActive: [],
      isReadeColl: [], // 已读coll集合
      zjControl: {
        getMoreMessage: this.$api.home.getMoreMessage,
        getMessageDetail: this.$api.home.getMessageDetail,
        postMessageRead: this.$api.home.postMessageRead
      },
      list: [],
      selectIds: [],
      currentPage: 1,
      pageSize: 10,
      listMaxHeight: ''
    }
  },
  mounted () {
    this.listMaxHeight = this.$refs.homeNotice
      ? this.$refs.homeNotice.clientHeight - 38 - 63 - 60 + 'px'
      : ''
    this.getApi()
    this.getList()
  },
  methods: {
    toViewDetail (item) {
      if (!this.selectIds.includes(item.id)) {
        this.selectIds.push(item.id)
      } else {
        const index = this.selectIds.findIndex(id => id === item.id)
        this.$delete(this.selectIds, index)
      }
    },
    getList () {
      this.loading = true
      let data = { page: this.currentPage, rows: this.pageSize }
      this.zjControl
        .getMoreMessage(data)
        .then(res => {
          this.list =
            res.data.rows.map(item => {
              if (
                this.$route.query.rowId &&
                item.id == this.$route.query.rowId
              ) {
                this.collActive.push(item.id)
                item.isReadFlag == '0' && this.handleCollapseChange(item.id)
              }
              return item
            }) || []
          this.isReadeColl = this.list
            .filter(item => item.isReadFlag == '1')
            .map(item => item.id)
          this.loading = false
        })
        .catch(err => {
          this.loading = false
        })
    },
    handleCollapseChange (val) {
      // window.console.log('val', val);
      // window.console.log('this.isReadeColl', this.isReadeColl);
      if (val.length) {
        let newReadeIndex = val.findIndex(item =>
          this.isReadeColl.every(ele => ele != item)
        )
        newReadeIndex != -1 && this.getDetail(val[newReadeIndex])
      }
    },
    // 点击的是未读的，调详情接口保存已读状态
    getDetail (id) {
      let item = this.list.find(item => item.id == id)
      item && (item.isReadFlag = '1')
      this.zjControl
        .getMessageDetail({ id })
        .then(res => {
          this.isReadeColl.push(id)
          this.$store.dispatch('user/setMessageTipNum')
        })
        .catch(err => {})
    },
    // 全部已读
    handleAllReade () {
      let ids = this.list.map(item => item.id).join(',')
      this.zjControl
        .postMessageRead({ ids })
        .then(res => {
          if (res.code == 200 || res.code == 0) {
            this.isReadeColl = this.list.map(item => {
              item.isReadFlag = '1'
              return item.id
            })
          }
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="less" scoped>
.home-notice {
  background: #eff3f6 !important;
  padding: 20px 0 0 !important;
  .notice-content-block {
    padding: 15px 10px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
        .detail-btn {
          &.not-read {
            margin-left: 10px;
          }
        }
      }
    }
    .detail-content {
      display: none;
      height: 0;
      transition: height 0.2s ease-in;
      &.is-show {
        display: block;
        height: auto;
        padding: 10px 60px;
      }
    }
  }
  .notice-content-block + .notice-content-block {
    margin-top: 10px;
  }
  /deep/ .notice-content-box {
    overflow: auto;
    .el-collapse-item__header > .el-collapse-item__arrow {
      display: none;
    }
    .notice-content-item {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-collapse-item {
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      .el-collapse-item__header {
        height: auto;
      }
      .el-collapse-item__content {
        border-top: 1px solid #dcdfe6;
        padding: 15px 55px;
        background: #f5f7fa;
      }
    }
    .notice-header {
      display: flex;
      align-items: center;
      width: 100%;
      line-height: 1.5;
      padding: 10px 15px 5px;
      .left-icon {
        border: 1px solid #dcdfe6;
        border-radius: 2px;
        padding: 2px;
        margin-right: 20px;
      }
      .header-title {
        flex: 1;
        .title-type {
          color: #606266;
          font-size: 12px;
          margin-bottom: 5px;
        }
        .title-theme {
          font-size: 14px;
          font-weight: bold;
          &.is-reade {
            color: #606266;
          }
        }
      }
      .right-info {
        margin-right: 5px;
        color: #606266;
        span {
          color: inherit;
        }
      }
    }
  }
}
</style>
