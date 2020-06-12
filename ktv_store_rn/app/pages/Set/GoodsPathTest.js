/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
**/

import React, {Component} from 'react';
import {View, Text, StatusBar, Dimensions, StyleSheet,TextInput,DeviceEventEmitter,TouchableHighlight} from 'react-native';
// 引入读取串口js
import RNSerialPortManager, { SerialPortManager } from '../../RNSerialPortManager';

let { width, height} = Dimensions.get('window')

export default class GoodsPathTest extends Component {
    //构造器
    constructor(props) {
        super(props)
        this.state = {
            location:'货道测试',
            lists:[
                {id:0,txt:1,value:''},
                {id:1,txt:2,value:''},
                {id:2,txt:3,value:''},
                {id:3,txt:4,value:''},
                {id:4,txt:5,value:''},
                {id:5,txt:6,value:''},
                {id:6,txt:7,value:''},
                {id:7,txt:8,value:''},
                {id:8,txt:9,value:''},
                {id:9,txt:10,value:''},
                {id:10,txt:11,value:''},
                {id:11,txt:12,value:''},
                {id:12,txt:13,value:''},
            ]
        }; 
    }


    //渲染
    render() {
        return (
            <View style={styles.box}>
                {/* 全屏 */}
                <StatusBar hidden={true} />
                {/* 页面定位 */}
                <View style={styles.location}>
                    <Text style={styles.loc_btn}></Text>
                    <Text style={styles.loc_txt}>{this.state.location}</Text>
                    <Text style={styles.loc_btn}></Text>
                </View>

                {/* 货道列表 */}
                <View style={styles.content}>
                    {/* 表头 */}
                    <View style={styles.list}>
                        {/* 序号 */}
                        <Text style={[styles.num,styles.txt]}>序号</Text>

                        {/* 操作 */}
                        <View style={styles.operation}>
                            <Text style={styles.txt} >操作</Text>
                        </View>
                        
                          
                        {/* 输入框 */}
                        <Text style={[styles.input]}>记录该货柜序列号</Text>
                    </View>
                    
                    {/* 列表 */}
                    {
                        this.state.lists.map(item=>
                            // alone
                            <View key={item.id} style={styles.list}>
                                {/* 序号 */}
                                <Text style={[styles.num,styles.txt]}>
                                    { item.txt }
                                </Text>

                                {/* 操作 */}
                                <View style={styles.operation}>
                                    <TouchableHighlight underlayColor={'#f60'} style={styles.opbtn} onPress={()=>this.open(item.id)}> 
                                        <Text style={styles.txt} >打开</Text>
                                    </TouchableHighlight>
                                </View>

                                {/* 输入框 */}
                                <TextInput style={styles.input} 
                                    placeholder='请输入' placeholderTextColor={'#5B5E6D'}
                                    value={item.value}
                                    onChangeText={(value)=>this.value(item.id,value)}
                                />
                            </View>
                        )
                    }
                    
                    {/* 按钮 */}
                    <Text style={styles.btn} onPress={()=>this.submit()} >货道测试完成</Text>
                </View>

            </View>
        )
    }

    //获取串口列表
    getSerialPortDevicePath = async () => {
        let devicePathList = await SerialPortManager.getDeviceLsit()
        console.log('设备列表:', devicePathList);
        // 打开虚拟串口
        this.openSerialPort(devicePathList[7],'9600')
    }

    // 打开虚拟串口
    openSerialPort(portStr, Baudrates){
        SerialPortManager.openSerialPort(portStr, Baudrates)
    }

    // 发送数据
    sendSerialPortData(data) {
        SerialPortManager.writeByteData(data)
    }


    // 打开
    open(e){
        const i = e+1
        console.log('打开'+i+'号箱')
        // 发送数据
        this.sendSerialPortData([0x00, 0x00, 0x00, 0x01])
    }
    
    value(e,value){
        this.state.lists[e].value = value
        this.forceUpdate() 
        console.log("输入的内容",value);
    }
    // 提交
    submit(){
        console.log('数据',this.state.lists)
        this.props.navigation.navigate('Index')
    }
    
    

    // 组件渲染完毕
    componentDidMount = () => {
        // 获取设备列表
        this.getSerialPortDevicePath()
    }

   
    // 控件卸载
    componentWillUnmount(){}


    
};


const styles = StyleSheet.create({
    box:{
        flex:1,
        backgroundColor:'#111217',
    },

    // ----------- 页面定位 ------------------
    location:{
        width:'100%',
        height:height/10*0.5,
        paddingLeft:30,
        paddingRight:30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center',
    },
    // 位置
    loc_txt:{
        fontSize:30,
        color:'#fff',
    },
    // 长按
    loc_btn:{
        height:'100%',
        width:'20%',
    },


    // 内容
    content:{
        width:width,
        height:height/10*9.5,
        paddingLeft:130,
        paddingRight:130,
        paddingTop:30,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    // 列表模板
    list:{
        width:'100%',
        height:height/10*.5,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    // 序号盒子
    num:{
        width:'30%',
        height:'100%',
        textAlign:'center',
        lineHeight:height/10*.5,
        borderWidth:1,
        borderColor:'#fff'
    },
    // 操作盒子
    operation:{
        width:'40%',
        height:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#fff'
    },
    // 操作按钮
    opbtn:{
        width:'40%',
        height:'66%',
        backgroundColor:'#D54753',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
    },
    // 输入框
    input:{
        width:'30%',
        height:'100%',
        textAlign:'center', 
        lineHeight:height/10*.5,
        fontSize:28,
        color:'#fff',
        borderWidth:1,
        borderColor:'#fff',
    },
    txt:{
        fontSize:28,
        color: '#fff',
    },


    // 确定按钮
    btn:{
        width:'100%',
        height:height/10*.5,
        backgroundColor:'#D54753',
        fontSize:32,
        color:'#fff',
        textAlign:'center',
        lineHeight:height/10*.5,
        borderRadius:20,
        marginTop:height/10*.5,
    }
});


