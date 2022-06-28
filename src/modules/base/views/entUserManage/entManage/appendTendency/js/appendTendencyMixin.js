import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
import 'echarts/map/js/china.js';
export default {
    name: "AppendTendency",
    created() {
        let date = new Date()
        this.year = date.getFullYear() //获取当前年份
    },
    mounted() {
        this.getAddYearData()
    },
    methods:{
        // echars绘画
        drawLine(monthCountArr) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({  //等同于option
                title:{
                    text:'注册趋势统计',
                    left:'center'
                },
                xAxis: {
                    type: 'category',
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']
                },
                yAxis: {
                    type: 'value',
                    name: '注册数/家',
                },
                series: [{
                    data: monthCountArr,
                    type: 'line',
                    itemStyle:{
                        normal:{
                            color:'red',
                            lineStyle:{
                                color:'pink'
                            }
                        }
                    }
                }],
                tooltip:{
                    show:true,
                    triggerOn:'onmousemove',
                    axisPointer: {
                        type: 'cross'
                    }
                }
            });
        }
    }
}
