<template>
    <ul class="quickQuery inline" ref="quickQuery">
        <li v-for="(item,index) in userQuery" class="quick-item"
            :key="index"
            :class="queryIndex === index ? 'active' : ''"
            @click="quickQuery(item.date,index)"
        >
            {{item.label}}
        </li>
    </ul>
</template>

<script>
    export default {
        name: "ZjQuickQuery",
        props:{
          start:{
            type:String,
            default:''
          },
          end:{
            type:String,
            default:''
          },
          reset:{
            type:Function
          },
          api:{
            type:Boolean,
            default:true
          }
        },
        data(){return{
            userQuery:[
                {label:'全部',date:'all'},  {label:'今日新增',date:0},{label:'近七天新增',date:-6},
                {label:'近30天新增',date:-29},{label:'近180天新增',date:-179},
            ],
            queryIndex:0,
            oldStart:'',
            oldEnd:''
        }},
        methods:{
            // 获取日期 --- 快捷查询
            getDate(time){
                let newDate = new Date()
                newDate.setDate(newDate.getDate()+time) //获取AddDayCount天后的日期
                var y = newDate.getFullYear();
                var m = (newDate.getMonth()+1)<10?"0"+(newDate.getMonth()+1):(newDate.getMonth()+1);//获取当前月份的日期，不足10补0
                var d = newDate.getDate()<10?"0"+newDate.getDate():newDate.getDate();//获取当前几号，不足10补0
                // return y+"-"+m+"-"+d
                return y+''+m+''+d
            },
            // 快捷查询
            quickQuery(date,index){
                if(typeof date !== 'number'){
                    this.oldStart = ''
                    this.oldEnd = ''
                }
                else{
                    this.oldStart = this.getDate(date)
                    this.oldEnd = this.getDate(0)
                }
                this.$emit('update:start',this.oldStart)
                this.$emit('update:end',this.oldEnd)

                this.queryIndex = index
                if(!this.api){return}
                this.$emit('search')
            },
            //监听事件变化
          editDate(){
              // let start = this.start
              // let end = this.end
              // if(end === this.getDate(0)){
              //   let newStartYear = ''
              //   let newEndYear = ''
              //   if(start){
              //     newStartYear = start.slice(0,4)
              //     newEndYear = end.slice(0,4)
              //     if(Number(newStartYear) <= Number(newEndYear)){
              //       let newStart = new Date(start.slice(0,4)+'-'+start.slice(4,6)+'-'+start.slice(6,8));
              //       let newEnd = new Date(end.slice(0,4)+'-'+end.slice(4,6)+'-'+end.slice(6,8));
              //       let num = ( (newEnd - newStart) / (1000 * 60 * 60 * 24) ) * -1
              //       let index = this.userQuery.findIndex(item => item.date === num)
              //       console.log(index)
              //       this.queryIndex = num === -0 ? 1 : index
              //       // this.queryIndex = index >-1 ? index : 0
              //     }
              //   }
              // }
            }
        },
    }
</script>

<style scoped lang="less">
</style>
