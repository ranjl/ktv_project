import React, { Component } from 'react';


// 封装websocket 
export default class websocket extends Component {

    static request(){
        let rid = this.state.rid
        let webstockUrl = 'ws://47.108.69.204:2345'; // 定义链接地址
        let WebSocketObj = null; // 定义WebSocket对象
        var lockReconnect = false; // 避免重复连接
        var tt;

        // 创建WebSocket
        function createWebSocket() {  
            try {
                WebSocketObj = new WebSocket(webstockUrl);
                console.log('初始化成功');
                init(); // 初始化成功则创建连接
            } catch(e) {
                console.log('初始化失败');
                reconnect(webstockUrl); // 初始化失败则重新连接
            }
        }

        // 创建连接
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
                console.log('连接成功'); 

                // 心跳检测重置
                heartCheck.start(rid);
            };
            WebSocketObj.onmessage = function (event) {
                // 拿到任何消息都说明当前连接是正常的
                var res = JSON.parse(event.data)
                console.log('服务器返回的信息',res)  

                

                // 又进行心跳检测
                heartCheck.start(rid);
            }
        }

        // 尝试重连
        function reconnect(url) {
            console.log('尝试重连',lockReconnect);
            if( lockReconnect ) {
                return;
            };
            lockReconnect = true;
            // 没连接上会一直重连,设置延迟避免请求过多
            tt && clearTimeout(tt);

            tt = setTimeout(function () {
                createWebSocket(url);
                lockReconnect = false;
            }, 5000);
        }

        //心跳检测
        var heartCheck = {
            timeout: 50000,
            timeoutObj: null,
            serverTimeoutObj: null,

            start: function(rid){ 
                var self = this;

                this.timeoutObj && clearTimeout(this.timeoutObj);
                this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);

                this.timeoutObj = setInterval(function(){
                    // 这里发送心跳
                    var data = { value:123, rid:rid }
                    console.log('前端(心跳检测)推送的消息',data)
                    WebSocketObj.send(JSON.stringify(data));

                }, this.timeout)
            }
        }

        // 创建WebSocket
        createWebSocket(webstockUrl); 
       
    }
}