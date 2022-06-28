<template>
    <div class="eyeSky-theNewsPublicOpinion" v-show="show">
        <!-- 更新时间 -->
        <p class="time">
            最近更新时间：{{date(createDate || '-') + ' '+ time(createTime || '-')}}
            <zj-button @click="realClick('1')" class="realBtn">重新获取</zj-button>
        </p>
        <!-- 新闻舆情 -->
        <h3 class="siTitle">新闻舆情<label class="blue">{{total}}</label></h3>
        <div class="auto">
            <ul class="newUl">
                <li v-for="(item,index) in tableData" :key="index" :data-id="item.docid" >
                    <a target="_blank" :href="item.uri">{{item.title}}</a>
                    <p class="content" v-html="item.abstracts"></p>
                    <p class="source">
                        <label>来源：{{item.website || '-'}}</label>
                        <span>发布日期:{{tycDates(item.rtm)}}</span>
                    </p>
                </li>
            </ul>
        </div>
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
        name: "theNewsPublicOpinion",
        mixins:[pagingMixin],
        data(){
          return{
            modelName:'theNewsPublicOpinion',
          }
        },
        watch:{
            tableData:{
                deep:true,
                handler(){
                    this.tableData.forEach(item =>{
                        item.abstracts = item.abstracts.replace(/\s/g,'')
                    })
                }
            }
        }
    }
</script>

<style lang="less">
.eyeSky-theNewsPublicOpinion{
    .siTitle{
        margin-left: 50px;
        margin-bottom: 15px;
    }
    .auto{
        width: 1000px;
        margin: 10px auto;
        .newUl{
            li{
                a{
                    font-size: 18px;

                    color: #6882e2;
                    &:hover{
                        color: #a1b5fc;
                    }
                }
                p{

                    &.content{
                        text-indent: 2em;
                        cursor:default;
                        padding: 5px 10px 5px 10px;
                        em{
                            font-style: normal;
                            color: red;
                        }
                    }
                    &.source{
                        padding-bottom: 10px;
                        &:after{
                            content: "";
                            display: block;
                            clear: both;
                        }
                        label,span{
                            color: silver;
                        }
                        label{
                            float: left;
                        }
                        span{
                            float: right;
                            padding-right: 15px;
                        }
                    }
                }
            }
        }
    }
    .vxe-pager{
        width: 1000px;
        margin: auto;
    }
}
</style>
