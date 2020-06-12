/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
**/

import React, {Component} from 'react';
import {View, Text, StatusBar, Dimensions, StyleSheet,TextInput,Image,TouchableHighlight} from 'react-native';
let { width, height} = Dimensions.get('window')

export default class Password extends Component {
    //构造器
    constructor(props) {
        super(props)
        this.state = {
            location:'绑定',
            inputs:[
                {text:'城市ID', value:null, pla:'请输入城市ID'},
                {text:'门店ID', value:null, pla:'请输入门店ID'},
                {text:'包间ID', value:null, pla:'请输入包间ID'},
                {text:'设备ID', value:null, pla:'请输入设备ID'},
                {text:'服务器地址', value:'12345666767', pla:''},
                {text:'长链接地址', value:'cbeubdcubxuw', pla:''},
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

                {/* 内容 */}
                <View style={styles.content}>
                    {
                        this.state.inputs.map(item=>
                            <View style={styles.alone} key={item.index}>
                                <Text style={styles.txt}>{item.text} :</Text>
                                <TextInput style={styles.input}
                                    autoFocus={false} // 是否呼出键盘
                                    keyboard={'numeric'} // 键盘类型(数字)
                                    placeholderTextColor={'#5B5E6D'}
                                    value={item.value}
                                    secureTextEntry={false} // 内容是否隐藏
                                    maxLength={12} // 最大输入长度
                                    placeholder={item.pla} />
                            </View>
                        )
                    }

                    <Text style={styles.btn} onPress={()=>this.backHome()}> 确认 </Text>
                </View>
                
            </View>
        )
    }

    
    // 返回首页
    backHome(){
        this.props.navigation.navigate('Index')
    }


    // 组件渲染完毕
    componentDidMount = () => {
        
    }

    
    // 控件卸载
    componentWillUnmount(){
       
    }

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


    content:{
        width:width,
        // height:height/10*5,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    // 模板
    alone:{
        width:width/10*6,
        height:height/10*.5,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:30,
    },
    // 文本
    txt:{
        width:'34%',
        fontSize:32,
        color:'#fff',
        textAlign:'center',
    },
    // 输入框
    input:{
        width:'66%',
        height:'100%',
        fontSize:32,
        color:'#fff',
        paddingLeft:16,
        borderWidth:1,
        borderColor:'#5B5E6D',
    },
    // 按钮
    btn:{
        width:width/10*6,
        height: height/10*0.5,
        backgroundColor:'#D54753',
        textAlign:'center',
        lineHeight:height/10*.5,
        borderRadius:20,
        color:'#fff',
        fontSize:32,
        marginTop:50,
    },

});


