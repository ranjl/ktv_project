/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
**/

import React, {Component} from 'react';
import {ImageBackground,StatusBar,TouchableOpacity, StyleSheet,View, Text, Dimensions,AsyncStorage,DeviceEventEmitter} from 'react-native';
let { width, height } = Dimensions.get('window')


export default class Await extends Component {
    //构造器
    constructor(props) {
        super(props)
        this.state = {
           rid:0,
           break:0,
        }; 
    }
    

    
    //渲染
    render() {
        return(
            // 背景图片
            <ImageBackground style={{flex:1}} 
                source={require('../../assets/imgs/await.jpg')}>
                {/* 隐藏头部导航 */}
                <StatusBar hidden={true} />
                    {/* 自定义按钮 */}
                    <TouchableOpacity style={{flex:1}} onPress={this.skip.bind(this)} activeOpacity={1}>
                        <View style={styles.box}>
                            <Text style={{color:'#D54753',fontSize:24}}>WELCOME</Text>
                            <Text style={{color:'#fff',fontSize:80}}>Enjoy with your ShowTime</Text>
                        </View>

                        <View style={styles.txt}>
                            <Text style={{fontSize:24, color:'#5B5E6D'}}>触摸屏幕任何地方跳转至欢迎页</Text>
                        </View>
                    </TouchableOpacity>
            </ImageBackground>
        )
    }


    // 组件加载完成
    componentDidMount = () => {
        var _this= this

        // 异步读取rid
        this.read()

        // 注册监听事件
        this.listener = DeviceEventEmitter.addListener('test',function(param){
            // 重新读取rid
            _this.read()
        });
    }

    // 组件卸载
    componentWillUnmount(){
        // 移出监听
        this.listener.remove();
    }

    // 读取数据
    read(){
        AsyncStorage.getItem('object',(error,result)=>{
            if (!error) {
                const res = JSON.parse(result)
                if(res != null ){
                    console.log('异步读取rid',res.data);
                    this.state.rid = res.data.rid
                }else{
                    this.state.rid = ''
                }
                // 执行WebSocket连接
                this.ws()
            }
        })
    }

    // 触摸屏幕任何地方跳转到欢迎页面
    skip(){
        this.props.navigation.navigate('Welcome')
    }
    
    // WebSocket
    ws(){
        var _this = this 
        let rid = this.state.rid
        let webstockUrl = 'ws://192.168.0.249:2345'; // 定义链接地址
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
                console.log(e);
                console.log('catch');
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
                console.log(1,'连接成功'); // -4

                // 心跳检测重置
                heartCheck.start(rid);
            };
            WebSocketObj.onmessage = function (event) {
                // 拿到任何消息都说明当前连接是正常的
                var res = JSON.parse(event.data)
                console.log('服务器主动推送的信息',res)  
                 // 储存订单id
                 AsyncStorage.setItem('order',JSON.stringify(res.data),(error)=>{
                    if (error) {
                        console.log('存储失败')
                    } else  {
                        console.log('存储成功')

                        // 跳转
                        _this.props.navigation.navigate('Dispark',{page:'await'}) 
                        
                    }
                }); 
        
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
            // 没连接上会一直重连,设置延迟避免请求过多(30秒后重新连接)
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

            start: function(rid){ 
                var self = this;

                this.timeoutObj && clearTimeout(this.timeoutObj);
                this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);

                this.timeoutObj = setInterval(function(){
                    // 这里发送心跳
                    if(rid == ''){
                        var data = { value:123}
                    }else{
                        var data = { value:123, rid:rid }
                    }
                    console.log('心跳检测',data)
                    WebSocketObj.send(JSON.stringify(data));
                    // self.serverTimeoutObj = setTimeout(function() {
                    //     console.log(3,'');
                    //     WebSocketObj.close();
                    // }, self.timeout);
                }, this.timeout)
            }
        }

        // 创建WebSocket
        createWebSocket(webstockUrl);  
    }

};


const styles = StyleSheet.create({
    // Enjoy with your XowTime
    box:{
        position:'absolute',
        left:80,
        bottom:300,
        width:'70%',
    },

    // 触摸屏幕任何地方跳转至欢迎页
    txt:{
        width:'100%',
        display:'flex',
        alignItems:'center',
        position:'absolute',
        bottom:60,
    }
});


