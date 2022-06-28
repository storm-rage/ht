<template>
<el-dialog
  id="ent-eye"
  custom-class="header-shadow"
  title="天眼查信息"
  :visible.sync="show"
  width="70%"
  :close-on-click-modal="false"
  @close="close"
>
  <el-row>
    <zj-button class="zj-f-r" status="primary" @click="confirm">确定</zj-button>
  </el-row>
  <zj-eye-sky ref="eyesky" :mountKey="true" :oneYes="true" :rioFlag="false" :show.sync="show" :entName.sync="entName.trim()" @eyeSkyChange="eyeSkyChange"/>
</el-dialog>
</template>

<script>
    export default {
        name: "eyeDialog",
        props:{
          entName:{
            type:String,
            default:''
          }
        },
        data(){
          return {
            show:false,
            eyeShow:false,
            eyeData:{}
          }
        },
        methods:{
          open(){
            this.show = true
          },
          close(){
            if(!this.show){return}
            this.show = false
          },
          eyeSkyChange(res){
            if(res.modelName && res.modelName === 'basicInfo'){
              this.eyeData = res.data
            }
          },
          confirm(){
            this.$emit('eyeReturn',this.eyeData)
            this.close()
          }
        },
    }
</script>

<style scoped lang="less">
#ent-eye{
  min-width: 1113px;
}
</style>
