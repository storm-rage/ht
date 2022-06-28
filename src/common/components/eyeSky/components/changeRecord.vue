<template>
<div class="eyeSky-changeRecord" v-show="show">
    <p class="time">
        最近更新时间：{{date(createDate || '-') + ' '+ time(createTime || '-')}}
        <zj-button @click="realClick('1')" class="realBtn">重新获取</zj-button>
    </p>
    <!-- 需要分页 -->
    <h3 class="siTitle">
        变更记录
        <label class="blue">{{total}}</label>
    </h3>
    <vxe-table
            header-cell-class-name="headerCell"
            highlight-hover-row
            auto-resize
            border
            align="center"
            :data="tableData"
    >
        <vxe-table-column type="seq" title="序号" width="60"/>
        <vxe-table-column field="changeTime" title="变更日期"/>
        <vxe-table-column field="changeItem" title="变更项目"/>
        <vxe-table-column field="contentBefore" title="变更前">
            <template v-slot="{row,rowIndex}">
                <div class="html" :ref="'before'+rowIndex" :class="beforeList[rowIndex].oy ? 'oy' : ''" v-html="row.contentBefore"></div>
            </template>
        </vxe-table-column>
        <vxe-table-column field="contentAfter" title="变更后">
            <template v-slot="{row,rowIndex}">
                <div class="html" :ref="'after'+rowIndex" :class="afterList[rowIndex].oy ? 'oy' : ''"  v-html="row.contentAfter"></div>
            </template>
        </vxe-table-column>
    </vxe-table>

    <vxe-pager
            align="right"
            :current-page="currentPage"
            :page-size="pageSize"
            @page-change="pageChang"
            :total="total">
    </vxe-pager>
</div>
</template>

<script>
    import pagingMixin from "@pubComponent/eyeSky/components/pagingMixin";
    export default {
        name: "changeRecord",
        mixins:[pagingMixin],
        data(){
          return {
            modelName:'changeRecord',
            // afterList:[{oy:false},{oy:false},{oy:false},{oy:false},{oy:false},{oy:false},{oy:false},{oy:false},{oy:false},{oy:false}],
            // beforeList:[{oy:false},{oy:false},{oy:false},{oy:false},{oy:false},{oy:false},{oy:false},{oy:false},{oy:false},{oy:false}],
            afterList:[],
            beforeList:[]
          }
        },
        methods:{
          reqSuccess(){
            for(let o=0;o<this.pageSize;o++){
              if(this.$refs['after'+o]){
                this.$set(this.afterList[o],'oy',false)
              }
              if(this.$refs['before'+o]){
                this.$set(this.beforeList[o],'oy',false)
              }
            }
            this.$nextTick(() => {
              for(let i=0; i<this.pageSize; i++){
                if(this.$refs['after'+i]){
                  this.$set(
                    this.afterList[i],'oy',this.$refs['after'+i].offsetHeight > 150
                  )
                }
                if(this.$refs['before'+i]){
                  this.$set(
                    this.beforeList[i],'oy',this.$refs['before'+i].offsetHeight > 150
                  )
                }
              }
            })
          }
        },
        created(){
          for(let i=0; i<this.pageSize; i++){
            this.$set(this.afterList,i,{oy:false})
            this.$set(this.beforeList,i,{oy:false})
          }
        }
    }
</script>

<style lang="less">
.eyeSky-changeRecord{
  /*.html{*/
  /*  max-height: 150px;*/
  /*}*/
  .oy{
    overflow-y: scroll;
    height: 150px;
  }
}
</style>
