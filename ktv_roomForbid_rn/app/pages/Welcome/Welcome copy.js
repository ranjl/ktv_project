/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
**/

import React, {Component} from 'react';
import {StatusBar, TouchableOpacity, Text, View, StyleSheet, Dimensions, ImageBackground,DeviceEventEmitter,AsyncStorage} from 'react-native';


export default class Welcome extends Component {
    //构造器
    constructor(props) {
        super(props)
        this.state = {
            lockState:'已锁',
            room:'A00',
            ktvName:'XowTime',
            roomSize:'大包',
            orders:[], // 订单数据
            rid:0, // 房间ID
            order_id:0, // 订单ID
        }; 
    }


    //渲染
    render() {
        return (
            <ImageBackground style={{flex:1}} 
                source={require('../../assets/imgs/await.jpg')}>
                <StatusBar hidden={true} />
                <TouchableOpacity style={styles.box} onPress={this.skip.bind(this)} activeOpacity={1}>
                    
                    {/* 上 */}
                    <View style={styles.up}>
                        {/* 门锁状态 */}
                        <View style={styles.upUp}>
                            <Text style={{color:'#ccc',fontSize:24}}>门锁状态</Text>
                            <Text style={[styles.analogyBtn,{fontSize:24}]}>{this.state.lockState}</Text>
                        </View>

                        {/* 房间号 */}
                        <View style={styles.room}>
                            <Text style={{fontSize:220,color:'#D54753'}}> {this.state.room} </Text>
                        </View>
                    </View>

                    {/* 下 */}
                    <View style={styles.below}>
                        <View style={styles.flex}>
                            <Text style={styles.welcome}>欢迎光临{this.state.ktvName}</Text>
                            <Text style={{fontSize:50, color:'#fff', marginTop:80}}>祝您欢唱愉快!</Text>
                        </View>

                        <View style={[styles.flex,{marginTop:160}]}>
                            <Text style={{fontSize:80, color:'#D54753'}}>{this.state.roomSize}</Text>
                            {/* <Text style={{fontSize:24, color:'#5B5E6D'}}>包间类型</Text> */}
                        </View>
                        
                        <Text style={{fontSize:36, color:'#5B5E6D'}}>触摸屏幕任何地方输入密码</Text>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        )
    }


    // 触摸屏幕任何地方输入密码
    skip(){
        var that = this 
        // 读取订单信息
        AsyncStorage.getItem('order',(error,result)=>{
            if (!error) {
                that.state.orders = JSON.parse(result)
                console.log('订单数据',that.state.orders);
                if(that.state.orders != null){
                    that.props.navigation.navigate('Dispark')
                }else{
                    that.props.navigation.navigate('Pwd',{page:'wel'})
                }
            }
        })
    }

    
    // 组件渲染完毕
    componentDidMount = () => {
        var _this = this 

        // 读取门店信息和订单数据
        this.read()

        // 设置页面返回
        this.listener = DeviceEventEmitter.addListener('test',function(param){
            console.log('绑定包间页面返回欢迎页面')
            // 重新读取门店信息
            _this.read()
        });

        // 非设置页面返回
        this.listener = DeviceEventEmitter.addListener('back',function(param){
            console.log('非设置页面返回欢迎页面')
            // 读取订单信息
            AsyncStorage.getItem('order',(error,result)=>{
                if (!error) {
                    var res = JSON.parse(result)
                    console.log('订单数据',res)
                    if(res != null){
                        _this.setState({
                            lockState:'开放'
                        })
                    }else{
                        _this.setState({
                            lockState:'已锁'
                        })
                    }
                }
            })
        });


        // 模拟的订单数据
        // var order = {}
        // order.code = 'A08',
        // order.close_tim =  0,
        // order.da =  "2019-10-28",
        // order.description = null,
        // order.end = "23:00",
        // order.end_tim =  1572260400,
        // order.exp_statu =  0,
        // order.exp_time = 1572231021,
        // order.flag = 1,
        // order.hour = ["13:00","14:00","15:00","16:00","17:00","18:00","19:00"],
        // order.hour_coun =  6,
        // order.id = 1607,
        // order.order_id = 1714,
        // order.package_id = 16,
        // order.part_ke =  null,
        // order.pay_status = 1,
        // order.pid = 31,
        // order.pwd = "5937",
        // order.rid = 56,
        // order.room_status = 2,
        // order.sid = 8,
        // order.start = "13:00",
        // order.status = 4,
        // order.type = 1,
        // order.use_id = 2
        // var _this = this
        // setTimeout(function(){
        //     console.log('测试',order)
        //     // 存储订单ID
        //     _this.setState({ 
        //         order_id:order.order_id
        //     })

        //     AsyncStorage.setItem('order',JSON.stringify(order),(error)=>{
        //         if (error) {
        //             console.log('测试存储失败')
        //         }else{
        //             console.log('测试存储成功')
        //             // 跳转
        //             _this.props.navigation.navigate('Dispark')
        //         }
        //     }); 


        //     var timer = setTimeout(function(){
        //         AsyncStorage.getItem('order',(error,result)=>{
        //             if (!error) {
        //                 var judge = JSON.parse(result)
        //                 if(judge != null){ // 没有提前结束欢唱并保洁
        //                     // 向后台推消息
        //                     _this.welWs()
        //                 }
        //             }
        //         })
        //         // 关闭计时器
        //         clearTimeout(timer) 
        //     },120000)
        // },20000)
    }

    
    // 控件卸载
    componentWillUnmount(){
        // 移出监听
        this.listener.remove();
    }


    // 读取数据
    read(){
        var that = this 

        // 读取门店信息
        AsyncStorage.getItem('object',(error,result)=>{
            if (!error) {
                const res = JSON.parse(result)
                console.log('门店信息',res.data);
                if(res != null){
                    that.setState({
                        room: res.data.code,
                        ktvName:res.data.shop_name,
                        roomSize:res.data.name,
                        rid:res.data.rid,
                    })
                    // 执行长链接
                    that.ws()
                }else{
                    // 不执行操作
                }
            }
        })

        // 读取订单数据
        AsyncStorage.getItem('order',(error,result)=>{
            if (!error) {
                var res = JSON.parse(result)
                console.log('订单数据',res)
                if(res != null){
                    that.setState({
                        lockState:'开放'
                    })
                }else{
                    that.setState({
                        lockState:'已锁'
                    })
                }
            }
        })
    }


    // WebSocket
    ws(){
        var _this = this 
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
                if(res.code == 200 ){
                    // 异步储存订单信息
                    AsyncStorage.setItem('order',JSON.stringify(res.data),(error)=>{
                        if (error) {
                            console.log('存储失败')
                        }else{
                            console.log('存储成功')
                            // 跳转
                            _this.props.navigation.navigate('Dispark')
                        }
                    }); 

                    // 存储订单ID
                    _this.setState({ 
                        order_id:res.data.order_id
                    })

                    // 订单时间结束跳转到待清洁页面并通知后台改变状态
                    var nowTime = (new Date()).getTime();
                    console.log('开门时间-时间戳',new Date(),nowTime)
                    var t = Number ( res.data.end_time + '000' )
                    console.log('订单结束的时间戳',t)
                    var time = Number ( t - nowTime )
                    console.log('中间经历的毫秒数',time)

                    var timer = setTimeout(function(){
                        AsyncStorage.getItem('order',(error,result)=>{
                            if (!error) {
                                var judge = JSON.parse(result)
                                if(judge != null){ // 没有提前结束欢唱并保洁
                                    // 向后台推消息
                                    _this.welWs()
                                }
                            }
                        })
                        // 关闭计时器
                        clearTimeout(timer) 
                    },time)
                }else{
                    // 不执行操作
                }

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
            }, 50000);
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

                this.timeoutObj = setTimeout(function(){
                    // 这里发送心跳
                    var data = { value:123, rid:rid }
                    console.log('前端(心跳检测)推送的消息',data)
                    WebSocketObj.send(JSON.stringify(data))

                    self.serverTimeoutObj = setTimeout(function() {
                        console.log('关闭secket');
                        WebSocketObj.close();
                    }, self.timeout);
                },this.timeout)
            }
        }

        // 创建WebSocket
        createWebSocket(webstockUrl); 
    }


    // stateWs
    welWs(){
        const wel_ws = new WebSocket('ws://47.108.69.204:2345');

        var data1 = {
            value:'',
            type:3,
            order_id:this.state.order_id
        }

        wel_ws.onopen = () => {
            console.log('通知后台-链接成功,参数',data1)
            wel_ws.send(JSON.stringify(data1)); 
        };

        wel_ws.onmessage = (e) => {
            const res1 = JSON.parse(e.data)
            console.log('通知后台切换状态',res1)
            
            if(res1.code == 200){
                // 跳转至待清洁页面
                this.props.navigation.navigate('Clean',{par:'end',num:'12345678900'})
            }

            // 关闭本链接
            wel_ws.onclose()
        };

        wel_ws.onerror = (e) => { console.log('链接错误',e)};
        wel_ws.onclose = (e) => { console.log('关闭链接',e)};
    }

};


const styles = StyleSheet.create({
    flex: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    box: {
        flex:1,
        backgroundColor:'rgba(0,0,0,.5)',
    },

    // 上部分
    up: {
        height: '30%',
    },
    // 门锁状态
    upUp: {
        height:'15%',
        display:'flex',
        flexDirection: 'row',
        justifyContent:'flex-end',
        paddingRight:80,
        alignItems: 'center',
    },
    // 门锁状态标签
    analogyBtn: {
        backgroundColor:'linear-gradient(209deg,rgba(245,89,56,1) 0%,rgba(231,58,104,1) 100%)',
        color:'#fff',
        marginLeft:10,
        borderRadius: 8,
        paddingTop:3,
        paddingBottom:5,
        paddingLeft:15,
        paddingRight:15,
    },
    // 包间号
    room:{
        height:'85%',
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
    },




    // 下部分
    below:{
        height:'70%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    // 欢迎
    welcome:{
        fontSize:60, 
        color:'#fff',
        textAlign:'center',
    }
});


