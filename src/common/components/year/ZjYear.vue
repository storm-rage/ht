<template>
  <el-select v-model="yearsModel" filterable @change="yearChange" placeholder="请选择" class="sw-year-select"
             :popper-append-to-body="false"
  >
    <el-option
      v-for="item in yearsList"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    name: 'ZjYear',
    props:{
      year:{
        type:Number,
        default:30
      }
    },
    data() {
      return {
        yearsModel: null,
        yearsList: []
      }
    },
    created() {
      this.init()
    },
    methods:{
      init(){
        let date = new Date()
        let year = date.getFullYear() //获取当前年份
        for (let i = 0; i<this.year; i++){
          this.yearsList.push({
            label: (year - i)+'年',
            value: year - i
          })
        }
        this.yearsModel = year //赋予默认年份
      },
      yearChange(){
        this.$emit('change',this.yearsModel)
      },
    }
  }
</script>
<style lang="less">
  .sw-year-select{
    width: auto!important;
    .el-input__inner,.el-input{
      width: 100px!important;
    }
  }
</style>
