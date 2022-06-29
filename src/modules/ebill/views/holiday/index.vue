<template>
  <div class="ml-15 content-wrap">
    <div class="holiday-title w500px">
      国家法定节假日下载导入模板 <zj-upload class="zj-inline" ref="upload" :httpRequest="dayUpload">
      <zj-button slot="trigger">上传</zj-button>
    </zj-upload>
      <div>提示：该操作将对所有资金方的节假日同步更新 <zj-button @click="downTemplate">下载模板</zj-button></div>

    </div>
    <!--<div>
      &lt;!&ndash; 标题区 &ndash;&gt;
      <el-select v-model="dayType">
        <el-option v-for="item in isHoliday" :key="item.code" :label="item.desc" :value="item.code"/>
      </el-select>
      <div class="grey">提示：使用节假日后，开立融单的到期日不会落在节假日</div>
    </div>-->

    <div class="lunarFullCalendar mt-20 mb-20">
      <div class="full-calendar">
        <lunar-full-calendar
          :events="events"
          ref="fullCalendar"
          @event-selected="eventSelected"
          :config="config"
          @day-click="dayClick"
        ></lunar-full-calendar>
      </div>
    </div>

    <!-- 底部按钮区 -->
    <el-row class="detailButtons zj-m-l-15">
      <zj-button class="back" @click="goParent">返回</zj-button>
    </el-row>

    <el-dialog title="上传生效节假日模板" :visible.sync="dialogFormVisible" custom-class="header-shadow" center>

      <span class="trigger-input" @click="handleTrigger"></span>
      <zj-upload class="zj-inline" ref="upload" :httpRequest="dayUpload">
        <zj-button slot="trigger">浏览</zj-button>
      </zj-upload>

      <div class="clear mt-10">该操作对以下资金方生效：</div>
      <el-form :model="form">
        <el-checkbox-group v-model="form.funds">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确认上传</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
    /* eslint-disable */
    import { LunarFullCalendar } from './lib/LunarFullCalendar.min.js'
    import { formatDate } from '@utils/index'
    export default {
        components: {
          LunarFullCalendar
        },
        data() {
            let self = this
            return {
              dialogFormVisible: false,
              form: {
                funds: []
              },
              dayType: '',
              isHoliday: [],
              events: [],
              view: null,
              element: null,
              startDate: null,
              endDate: null,
              config: {
                lunarCalendar: true,
                height: 480,
                locale: 'zh-cn',
                buttonText: {
                  today: '返回今天',
                  month: '月',
                },
                header: {
                  left: 'prev, next',
                  center: 'title',
                  right: 'custom, today'
                },
                // eventOrder:'index',   // 这个是控制事件排序的功能，意思是 按照字段 事件数据中index来排序
                // eventLimitClick: 'day', //点击今天日列表图
                eventLimit: true, // 一天中显示多少条事件，多了隐藏
                firstDay: 0, // 控制周一周日那个在前面
                defaultView: 'month',
                allDaySlot: true, // agenda视图下是否显示all-day
                allDayText: '全天', // agenda视图下all-day的显示文本
                timezone: 'local', // 时区默认本地的
                slotLabelFormat: 'HH:mm', // 周视图和日视同的左侧时间显示
                viewRender (view, element) {
                  console.error('veiw:', view)
                  console.error('element:', element)
                  self.view = view
                  self.element = element
                  self.viewRender(view, element)
                }
              }
            }
        },
        created() {
          this.getDics()
        },
        methods:{
          // 字典
          getDics () {
            this.$api.holiday.getDics().then(ret => {
              this.isHoliday = ret.data.isHoliday
            })
          },
          // 导出
          downTemplate () {
            this.$api.holiday.getTemplate()
          },
          //上传
          dayUpload({file, data}){
            let formData = new FormData()
            formData.append('file',file)
            this.$api.holiday.importTemplate(formData).then(ret => {
              this.$messageBox({
                type: 'success',
                content: ret.msg || '操作成功',
                messageResolve: () => {
                  this.getList({ dateStart: this.startDate, dateEnd: this.endDate })
                }
              });
            }).catch(() => {
            })
          },
          // 注释的是功能是可以修改对应的功能值属性，比如设置  eventLimit为 false
          //  this.$refs.calendar.fireMethod('option',{
          //      eventLimit :false
          //  })
          dayClick (date, jsEvent, view) {
            // 点击当天的事件
            // alert('农历数据：' + JSON.stringify(window.lunar(date._d)))
            console.log(date, jsEvent, 'dayClick')
          },
          eventSelected (event, jsEvent, view) {
            // 选中事件
            console.log(event, jsEvent, 'eventSelected')
          },
          viewRender (view, element) {
            console.log(view, element, 'viewRender')
            this.events = []
            this.startDate = formatDate(view.start._d, 'yyyy-MM-dd').replace(/-/g, '')
            this.endDate = formatDate(view.end._d, 'yyyy-MM-dd').replace(/-/g, '')
            this.getList({ dateStart: this.startDate, dateEnd: this.endDate })
          },
          getList (params) {
            this.$api.holiday.getList(params).then(ret => {
              ret.data.map(item => {
                let obj = {
                  title: '休',
                  allDay: true,
                  start: item.value
                }
                this.events.push(obj)
              })
            })
          },
          handleTrigger () {
            this.$refs.upload.$refs.zjUpload.$children[0].$refs.input.click()
          }
        },
        mounted() {
        },
        computed: {
        }
    }
</script>

<style lang="less">
@import "./index.less";
</style>
