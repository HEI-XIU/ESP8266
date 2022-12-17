//index.js
//获取应用实例
const app = getApp()
var mqtt = require('../../utils/mqtt.js');

Page({
  data: {
    button_type: 'primary',
    sub_text: '订阅',
    sub_state: 'false',
    topic: 'espZK',
    topics: [],
    msg: '',
    ht: ''
  },
  TopicButton: function (e) {
    this.setData({
      topic: e.target.dataset.topic,
      sub_state: e.target.dataset.state
    })
  },
  TopicInput: function (e) {
    this.setData({
      topic: e.detail.value
    })
  },
  mqttsub_on: function () {
    var that = this;
    let n = {
      tpc: that.data.topic,
      state: false,
    };
    this.setData({
      topics: that.data.topics.concat(n)
    });
    app.globalData.client.subscribe(this.data.topic);
    that.setData({
      sub_state: true,
      state: true,
    })
  },
  // onShow: function () {
  //   var that = this;
  //   app.globalData.client.on('message', function (topic, payload, packet) {
  //     that.setData({
  //       msg: topic + " | " + packet.qos.toString() + " | " + payload + " | " + '<br>' + that.data.msg
  //     })
  //     var humiString = payload.toString();
  //     // var humiMap = eval("("+humiString+")");
  //     // var temphumi = humiMap.humi
  //     var jsObj = JSON.parse(humiString);

  //     console.log("开始");
  //     console.log(payload.toString());
  //     // console.log(jsObj.humi);
  //     app.globalData.Humidity = jsObj.humi;
  //     app.globalData.Temperature = jsObj.temp;

  //     console.log(app.globalData.humi);
  //     console.log(app.globalData.temp);
  //   })
  // },
  onLoad: function () {
    var that = this;
    app.globalData.client.on('message', function (topic, payload, packet) {
      that.setData({
        msg: topic + " | " + packet.qos.toString() + " | " + payload + " | " + '<br>' + that.data.msg
      })
      var humiString = payload.toString();
      // var humiMap = eval("("+humiString+")");
      // var temphumi = humiMap.humi
      var jsObj = JSON.parse(humiString);

      console.log("开始");
      console.log(payload.toString());
      console.log(jsObj);
      app.globalData.humi = jsObj.SoilHumidity;
      app.globalData.temp = jsObj.Temperature;
      app.globalData.lx = jsObj.LX;

      console.log(app.globalData.humi);
      console.log(app.globalData.temp);
    })
  },
  mqttsub_off: function () {
    var that = this;
    let number = this.data.topics.findIndex(o => o.tpc == that.data.topic);
    let list = this.data.topics
    list.splice(number, 1);
    this.setData({
      topics: list
    })
    delete this.data[number];
    app.globalData.client.unsubscribe(this.data.topic);
    that.setData({
      button_type: 'primary',
      sub_text: '订阅',
      sub_state: false,
      state: false
    });
    // app.globalData.client.end();
  }
})