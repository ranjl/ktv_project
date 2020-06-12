/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
**/

import React, {Component} from 'react';
import {View,Text, StyleSheet, Dimensions, TouchableHighlight, AsyncStorage,ImageBackground,StatusBar,DeviceEventEmitter,Alert} from 'react-native';


export default class Select extends Component {
    //构造器
    constructor(props) {
        super(props)
        //初始化视频播放
        this.state = {
            room:'A00',
            operations:[
                {txt:'开门',id:1},
                {txt:'关门',id:2},
                {txt:'结束欢唱',id:3},
            ],
            res:{}, // 缓存数据
            par:0, // 服务人员id
            page:null, // 记录是否是待清洁状态
        };    
    }


    //渲染
    render() {
        return (
            <ImageBackground style={{flex:1}} 
                source={require('../../assets/imgs/await.jpg')}>
                <StatusBar hidden={true} />
                    <View style={styles.box}>
                        {/* 上 */}
                        <View style={styles.up}>
                            <Text></Text>
                            <Text style={{fontSize:220,color:'#D54753'}}>{this.state.room}</Text>
                        </View>

                        {/* 下 */}
                        <View style={styles.below}>
                            <View style={[styles.txt,styles.flex]}>
                                <Text style={{color:'#5B5E6D',fontSize:30}}>请选择您的操作</Text>
                            </View>

                            {/* 操作 */}
                            <View style={styles.operation}>
                                {
                                    this.state.operations.map(item =>
                                        <TouchableHighlight underlayColor={'#D54753'} key={item.id} style={[styles.btn,styles.flex]}
                                            onPress={()=>this.skip(item.id)}>
                                                <Text style={{color:'#fff',fontSize:36}}>{item.txt}</Text>
                                        </TouchableHighlight>
                                    )
                                }
                            </View>

                            {/* 返回 */}
                            <View style={styles.backBox}>
                                <TouchableHighlight underlayColor={'#D54753'} style={[styles.back,styles.flex]}
                                    onPress={this.back.bind(this)}>
                                    <Text style={{color:'#5B5E6D',fontSize:36}}>返回</Text>
                                </TouchableHighlight> 
                            </View>
                        </View>
                    </View>  
            </ImageBackground>
        )
    }


    // 选择
    skip(e){
        var parameter = {}
        parameter.value = ''
        parameter.type = '2'
        parameter.flag = '3'
        parameter.staff_id = this.state.par
        if(this.state.res == null){
            parameter.cid= '0'
            parameter.sid = '0'
            parameter.rid = '0'
        }else{
            parameter.cid= this.state.res.data.cid
            parameter.sid = this.state.res.data.sid
            parameter.rid = this.state.res.data.rid
        }

        if(e==1){ // 开门
            parameter.status = '1'
            this.ws(parameter)
        }else if(e==2){ // 关门
            parameter.status = '0'
            this.ws(parameter)
        }else if(e==3){ // 结束欢唱
            // 读取订单id
            AsyncStorage.getItem('order',(error,result)=>{
                if (!error) {
                    var res = JSON.parse(result)
                    console.log('读取订单id',res);
                    if(res == null){
                        alert('该房间未预定,无法结束欢唱')
                    }else{
                        parameter.status = '1'
                        parameter.order_id = res.order_id
                        this.ws(parameter)
                    }
                }
            })
        }
    }


    // 返回
    back(){
        var that = this 
        // 读取订单信息
        AsyncStorage.getItem('order',(error,result)=>{
            if (!error) {
                that.state.orders = JSON.parse(result)
                console.log('读取订单数据',that.state.orders);
                console.log('房间状态',that.state.page)
                if(that.state.orders != null){
                    if(that.state.page != 'cle'){
                        that.props.navigation.navigate('Dispark')
                    }else if(that.state.page == 'cle'){
                        that.props.navigation.navigate('Clean',{par:'end',num:'12345678900'})
                    }
                }else{ 
                    // 调用事件通知Welcome组件
                    DeviceEventEmitter.emit('back','parameter');
                    that.props.navigation.navigate('Welcome')
                }
            }
        })
    }


    // 生命周期
    componentDidMount = () => {
        // 读取数据
        this.read()

        // 接受参数
        this.state.par = this.props.navigation.state.params.staff_id 
        this.state.page = this.props.navigation.state.params.page
    }


    // 读取数据
    read(){
        AsyncStorage.getItem('object',(error,result)=>{
            if (!error) {
                this.state.res = JSON.parse(result)
                console.log('读取数据成功',this.state.res);
                if(this.state.res == null){
                    // 不执行操作
                }else{
                    this.setState({
                        room: this.state.res.data.code,
                    })
                }
            }
        })
    }


    // 连接
    ws(e){
        // 定义地址
        var ws = new WebSocket('ws://47.108.69.204:2345');

        console.log('参数',e)

        // 打开连接并发送消息
        ws.onopen = () => { 
            console.log('连接成功') 
            ws.send(JSON.stringify(e)); 
        };

        
        // 接收到了一个消息
        ws.onmessage = (e) => {  
            const res = JSON.parse(e.data)
            console.log('接收到的消息',res);
            if(res.code == 200 ){
                if(res.data.navigate == 1){ // 结束欢唱
                    // 关闭连接
                    ws.onclose()
                    this.props.navigation.navigate('Clean',{par:'end',num:'12345678900'}) // 跳转至待清洁页面
                }
                if(res.data.navigate == 2){ // 开门
                    alert('开门成功')

                    // 关闭连接
                    ws.onclose()
                }
                if(res.data.navigate == 3){ // 关门跳转到欢迎页面
                    // 关闭连接
                    ws.onclose()

                    Alert.alert(
                        '', //提示标题
                        `关门成功,是否确定返回欢迎页面？`, //提示内容
                        [ //按钮集合 
                            { 
                                text: '取消', 
                                onPress: () => console.log('点击取消') 
                            },
                            {
                                text: '确定', 
                                onPress:  () =>  {
                                    console.log('点击确定')
                                    // 调用事件通知Welcome组件
                                    DeviceEventEmitter.emit('back','parameter');
                                    this.props.navigation.navigate('Welcome')
                                }
                            }
                        ] 
                    )
                }
            }
        };

        // 发生了错误
        ws.onerror = (e) => {  
            console.log('连接错误',e);
        };
        
        // 关闭连接
        ws.onclose = (e) => {
            console.log('关闭连接');
        };
    }
};


const styles = StyleSheet.create({
    flex: {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    box: {
        flex:1,
        // backgroundColor:'#000',
        backgroundColor:'rgba(0,0,0,.5)',
    },

    up:{
        height:'30%',
        borderBottomWidth:1,
        borderBottomColor:'#2D2F36',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    below:{
        height:'70%', 
    },
    txt: {
        height:'10%',
    },

    operation:{
        height:'50%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',
        paddingTop:80,
    },
    btn: {
        width:'50%',
        height:'20%',
        borderWidth:1,
        borderColor:'#D54753',
        borderRadius:4,
    },


    backBox:{
        height:'10%',
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-end',
        marginTop:30,
    },
    back:{
        width:'50%',
        height:'80%',
        borderWidth:1,
        borderColor:'#D54753',
        borderRadius:4,
    }
    
});


