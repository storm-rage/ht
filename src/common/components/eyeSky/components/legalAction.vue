<template>
    <div class="eyeSky-legalAction" v-show="show">
        <!-- 更新时间 -->
        <p class="time">
            最近更新时间：{{date(createDate || '-') + ' '+ time(createTime || '-')}}
            <zj-button @click="realClick('1')" class="realBtn">重新获取</zj-button>
        </p>
        <!-- 法律诉讼 -->
        <h3 class="siTitle">法律诉讼<label class="red">{{total}}</label></h3>
        <vxe-table
                header-cell-class-name="headerCell"
                highlight-hover-row
                auto-resize
                border
                align="center"
                :data="tableData"
        >
            <vxe-table-column type="seq" title="序号" width="60"/>
            <vxe-table-column field="submittime" title="日期">
                <template v-slot="{row}">
                    {{tycDates(row.submittime)}}
                </template>
            </vxe-table-column>
            <vxe-table-column field="title" title="案件名称">
                <template v-slot="{row}">
                    <a :href="row.url || '#' " target="_blank">{{row.title || '-'}}</a>
                </template>
            </vxe-table-column>
            <vxe-table-column field="casereason" title="案由">
                <template v-slot="{row}">
                    {{row.casereason || '-'}}
                </template>
            </vxe-table-column>
            <vxe-table-column title="案件身份">
                <template v-slot="{row,rowIndex}">
                    <div :ref="'plaintiffs'+rowIndex" :class="plaintiffsList[rowIndex].oy ? 'oy' : ''">
                      <el-row v-html="row.plaintiffs"></el-row>
                      <el-row v-html="row.defendants"></el-row>
                    </div>
                </template>
            </vxe-table-column>
            <vxe-table-column field="caseno" title="案号"/>
        </vxe-table>
        <!-- 分页 -->
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
        name: "legalAction",
        mixins:[pagingMixin],
        data(){
          return{
            modelName:'legalAction',
            // plaintiffsList:[{oy:false},{oy:false},{oy:false},{oy:false},{oy:false},{oy:false},{oy:false},{oy:false},{oy:false},{oy:false}],
            plaintiffsList:[]
          }
        },
        methods:{
          reqSuccess(){
            for(let o=0;o<this.pageSize;o++){
              if(this.$refs['plaintiffs'+o]){
                this.$set(this.plaintiffsList[o],'oy',false)
              }
            }
            this.$nextTick(() => {
              for(let i=0; i<this.pageSize; i++){
                if(this.$refs['plaintiffs'+i]){
                  this.$set(
                    this.plaintiffsList[i],'oy',this.$refs['plaintiffs'+i].offsetHeight > 150
                  )}
              }
            })
          }
        },
        created(){
          for(let i=0;i<this.pageSize;i++){
            this.$set( this.plaintiffsList,i,{oy:false})
          }
        }
    }
</script>

<style lang="less">
.eyeSky-legalAction{
  .oy{
    overflow-y: scroll;
    height: 150px;
  }
}
</style>
