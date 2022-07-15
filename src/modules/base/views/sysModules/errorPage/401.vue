<template>
  <div class="errPage-container" style="width: 800px">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          你没有权限去该页面
        </h1>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <router-link to="/home">
              <el-button type="primary" style="width: 100px" size="mini">回首页</el-button>
            </router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from '@assets/img/401_images/401.gif'

export default {
  name: 'Page401',
  data () {
    return {
      errGif: errGif + '?' + +new Date()
    }
  }
}
</script>

<style lang="less" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
  padding: 100px 0;
  font-size: 16px;
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
    margin: .67em 0;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
  }
}
</style>
