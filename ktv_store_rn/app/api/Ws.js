import React,{Component} from 'react';

// 网络请求的工具类
export default class NetUtils extends Component{
  //构造函数，默认的props，以及state 都可以在这里初始化了
  constructor(props){
    super(props); 
  }

  static ws(params,callback){
    let webstockUrl='ws://47.108.69.204:2345';
    let WebSocketObj=null;
    var lockReconnect = false;//避免重复连接
    var tt;

    // 创建
    function createWebSocket() {
      try {
        WebSocketObj= new WebSocket(webstockUrl);
        console.log('初始化');
        init();
      } catch(e) {
        console.log('重新链接');
        reconnect(webstockUrl);
      }
    }

    // 初始化
    function init() {
      WebSocketObj.onclose = function () {
        console.log('链接关闭');
        reconnect(webstockUrl);
      };
      WebSocketObj.onerror = function() {
        console.log('发生异常了');
        reconnect(webstockUrl);
      };
      WebSocketObj.onopen = function () {
        //心跳检测重置
        heartCheck.start();
      };
      WebSocketObj.onmessage = function (event) {
        //拿到任何消息都说明当前连接是正常的
        heartCheck.start();
        callback(event)
      }
    }

    // 尝试重连
    function reconnect(url) {
        console.log('尝试重连',lockReconnect);
        if(lockReconnect) {
            return;
        };
        lockReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多
        tt && clearTimeout(tt);
        tt = setTimeout(function () {
            createWebSocket(url);
            lockReconnect = false;
        }, 5000);
    }

    //心跳检测
    var heartCheck = {
      timeout: 5000,
      timeoutObj: null,
      serverTimeoutObj: null,
      start: function(){
        var self = this;
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(function(){
          //这里发送一个心跳，后端收到后，返回一个心跳消息，
          console.log('前端的参数',params)
          WebSocketObj.send( JSON.stringify(params) );
          self.serverTimeoutObj = setTimeout(function() {
            console.log('');
            WebSocketObj.close();
          }, self.timeout);
        }, this.timeout)
      }
    }
    
    createWebSocket(webstockUrl);
  }
}