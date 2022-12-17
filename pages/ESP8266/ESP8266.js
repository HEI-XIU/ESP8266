import * as echarts from '../../ec-canvas/echarts';
const app = getApp()
Page({
  data: {
    lx:'20',
    ec: {
      lazyLoad: true,
    },
    ec2: {
      lazyLoad: true,
    },
  },
  onLoad: function () {
    this.lazyComponent = this.selectComponent('#mychart-dom-gauge')
    this.lazyComponent2 =  this.selectComponent('#mychart-dom-gauge2')
    //模拟请求
    var that=this
    setInterval(function () {
      that.init()
      that.init2()
      // that.selectPageShufflingText();
      // console.log("轮播请求1秒触发一次");
    }, 2000)    //代表1秒钟发送一次请求
  },
  init() { //手动初始化
    this.lazyComponent.init((canvas, width, height, dpr) => {
      let chart1 = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      // let option = getOption() //
      this.setData({
        lx:app.globalData.lx
      })
    let option={
        series: [{
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            splitNumber: 12,
            itemStyle: {
              color: '#FFAB91'
            },
            progress: {
              show: true,
              width: 30
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 30
              }
            },
            axisTick: {
              distance: -45,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              distance: -52,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: -20,
              color: '#999',
              fontSize: 15
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              width: '50%',
              lineHeight: 30,
              borderRadius: 6,
              offsetCenter: [0, '-15%'],
              fontSize: 30,
              fontWeight: 'bolder',
              formatter: '{value} °C',
              color: 'auto'
            },
            data: [{
              value: 20,
            }]
          },
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            itemStyle: {
              color: '#FD7347'
            },
            progress: {
              show: true,
              width: 8
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{
              value: 20,
            }]
          }
        ]
      };
      chart1.setOption(option)
      chart1.setOption({
        series: [{
            data: [{
              value: app.globalData.temp
            }]
          },
          {
            data: [{
              value: app.globalData.temp
            }]
          }
        ]
      })
      this.chart1 = chart1 //将图表实例绑定到this，方便函数访问
      return chart1
    })
  },

  init2() { //手动初始化
    this.lazyComponent2.init((canvas, width, height, dpr) => {
      let chart2 = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });

    let option={
        series: [{
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 20,
            itemStyle: {
              color: '#B3F0DE'
            },
            progress: {
              show: true,
              width: 30
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 30
              }
            },
            axisTick: {
              distance: -45,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              distance: -52,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: -20,
              color: '#999',
              fontSize: 15
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              width: '50%',
              lineHeight: 30,
              borderRadius: 6,
              offsetCenter: [0, '-15%'],
              fontSize: 30,
              fontWeight: 'bolder',
              formatter: '{value} %',
              color: 'auto'
            },
            data: [{
              value: 20,
            }]
          },
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            itemStyle: {
              color: '#00BFFF'
            },
            progress: {
              show: true,
              width: 8
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{
              value: 20,
            }]
          }
        ]
      };
      chart2.setOption(option)
      chart2.setOption({
        series: [{
            data: [{
              value: app.globalData.humi
            }]
          },
          {
            data: [{
              value: app.globalData.humi
            }]
          }
        ]
      })
      this.chart2 = chart2 //将图表实例绑定到this，方便函数访问
      return chart2
    })
  },
})