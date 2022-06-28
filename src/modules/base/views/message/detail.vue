<template>
  <div class="">

    <el-collapse v-model="activeName" class="collapsable-expand-line" accordion>
      <el-collapse-item name="1" disabled>
        <template slot="title">
          <h4 class="orderTitle">{{detail.messageTitle}}</h4>
        </template>
        <div class="mg-15" v-html="detail.messageContent"></div>
        <div class="mg-15">
          <zj-button class="back" @click="goParent">返回</zj-button>
        </div>
      </el-collapse-item>
    </el-collapse>


  </div>
</template>

<script>
  export default {
    data(){
      return{
        activeName: '1',
        detail: [],
      }
    },
    methods:{
      getDetail (){
        this.$api.message.getDetail({ id: this.$route.params.id, }).then(ret => {
          this.detail = Object.assign({}, ret.data)
        })
      },
    },
    created() {
      this.getDetail()
    },
  }
</script>

<style scoped lang="less">
  @import "less/index.less";
</style>
