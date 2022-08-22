<template>
  <zj-content-block>
    <zj-content>
      <div class="holiday-title">
        国家法定节假日下载导入模板&nbsp;&nbsp;
        <zj-upload class="zj-inline" ref="upload" :httpRequest="dayUpload">
          <zj-button type="primary" style="width: 100px" size="mini" slot="trigger">上传</zj-button>
        </zj-upload>
        <div>
          提示：该操作将对所有资金方的节假日同步更新&nbsp;&nbsp;
          <zj-button @click="downTemplate" size="mini" style="width: 100px">下载模板</zj-button>
        </div>

      </div>
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
    </zj-content>
  </zj-content-block>
</template>

<script>
/* eslint-disable */
import {LunarFullCalendar} from './lib/LunarFullCalendar.min.js'
import {formatDate} from '@utils/index'

export default {
  components: {
    LunarFullCalendar
  },
  data() {
    let self = this
    return {
      zjControl: {
        getHolidayDirectory: this.$api.holidaySet.getHolidayDirectory,
        getHolidayList: this.$api.holidaySet.getHolidayList,
        getHolidayTemplate: this.$api.holidaySet.getHolidayTemplate,
        importHolidayTemplate: this.$api.holidaySet.importHolidayTemplate,
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
        viewRender(view, element) {
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
    this.getApi();
    this.getDics()
  },
  methods: {
    // 字典
    getDics() {
      this.zjControl.getHolidayDirectory().then(ret => {
        this.isHoliday = ret.data.isHoliday
      })
    },
    // 导出
    downTemplate() {
      this.zjControl.getHolidayTemplate()
    },
    //上传
    dayUpload({file}) {
      let formData = new FormData()
      formData.append('file', file)
      this.zjControl.importHolidayTemplate(formData).then(ret => {
        this.$messageBox({
          type: 'success',
          content: ret.msg || '操作成功',
          messageResolve: () => {
            this.getList({dateStart: this.startDate, dateEnd: this.endDate})
          }
        });
      }).catch(() => {
      })
    },
    dayClick(date, jsEvent, view) {
      // 点击当天的事件
      // alert('农历数据：' + JSON.stringify(window.lunar(date._d)))
      console.log(date, jsEvent, 'dayClick')
    },
    eventSelected(event, jsEvent, view) {
      // 选中事件
      console.log(event, jsEvent, 'eventSelected')
    },
    viewRender(view, element) {
      // console.log(view, element, 'viewRender')
      this.events = []
      this.startDate = formatDate(view.start._d, 'yyyy-MM-dd').replace(/-/g, '')
      this.endDate = formatDate(view.end._d, 'yyyy-MM-dd').replace(/-/g, '')
      this.getList({dateStart: this.startDate, dateEnd: this.endDate})
    },
    getList(params) {
      this.zjControl.getHolidayList(params).then(ret => {
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
    handleTrigger() {
      this.$refs.upload.$refs.zjUpload.$children[0].$refs.input.click()
    }
  }
}
</script>

<style lang="less">
@import "./index.less";
</style>
