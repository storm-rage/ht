<template>
    <el-dialog :visible.sync="dialogVisible"  center width="500px"
      title="中登手工登记" custom-class="mbi-editDialog"  top="6vh">
      <el-form ref="formModel" class="mbi-form" 
        label-width="140px">
       
        
      </el-form>

      <el-row slot="footer" class="dialog-footer">
        <!-- <zj-button status="primary" @click="save">保存</zj-button> -->
        123
        <!-- <zj-button class="back" @click="dialogVisibleTo">取消</zj-button> -->
      </el-row>
    </el-dialog>
</template>

<script>
    // import pagingMixin from "@pubComponent/eyeSky/components/pagingMixin";
    export default {
        name: "artRegister",
        props:[dialogVisible],
        data(){
          return {

          }
        },

    }
</script>

<style scoped lang="less">

</style>