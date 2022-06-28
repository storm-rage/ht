<template>
  <div class="">

    <el-collapse v-model="activeName" class="collapsable-expand-line" accordion>
      <el-collapse-item name="1" disabled>
        <template slot="title">
          <h4 class="orderTitle">站内信</h4>
        </template>

        <ul class="msg-wrap">
          <li
            v-for="item in messageList"
            :key="item.id"
          >
            <span class="message-title zj-f-l" @click="toDetail(item.id)" v-html="item.messageTitle"></span>
            <span class="message-time zj-f-r">{{date(item.sendDatetime)}}</span>
          </li>
        </ul>
        <vxe-pager
          class="mr-15"
          align="right"
          :current-page="currentPage"
          :page-size="pageSize"
          @page-change="pageChang"
          :total="total">
        </vxe-pager>

      </el-collapse-item>
    </el-collapse>


  </div>
</template>

<script>
  export default {
    data(){
      return{
        activeName: '1',
        dictionary: {},

        messageList: [],
        //分页
        total: 0,
        currentPage: 1,
        pageSize: 20,
      }
    },
    methods:{
      getList (page=1){
        this.$api.message.getMore({
          page: page,
          rows: this.pageSize
        }).then(ret => {
          this.messageList = ret.data.rows
          this.total = parseInt(ret.data.total)
        })
      },
      //分页按钮发生改变时
      pageChang(data){
        this.currentPage = data.currentPage //更换当前页
        this.getList(this.currentPage)
      },
      toDetail (id) {
        this.$router.push({ name: 'messageDetail', params: { id: id } })
      }
    },
    created() {
      this.getList()
    },
  }
</script>

<style scoped lang="less">
  @import "less/index.less";
</style>
