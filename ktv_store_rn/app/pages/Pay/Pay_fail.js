/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
**/

import React, {Component} from 'react';
import {View, Text, StatusBar, Dimensions, StyleSheet,TextInput,Image,TouchableOpacity} from 'react-native';
let { width, height} = Dimensions.get('window')


export default class PayFail extends Component {
    //构造器
    constructor(props) {
        super(props)
        this.state = {
            location:'支付失败',
            fail_cause:'可能是余额不足吧', 
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

                {/* bg */}
                <View style={styles.bg}>
                    <Image style={styles.pay_ico} source={require('../../assets/wx.png')} /> 
                    <Text style={{fontSize:42, color:"#fff"}}>支付失败</Text>
                    <Text style={{fontSize:32, color:"#fff"}}>失败原因:{this.state.fail_cause}</Text>
                </View>

                {/* 按钮盒子 */}
                <View style={styles.btn_box}>
                    <TouchableOpacity style={[styles.btn,{backgroundColor:'#252730'}]} activeOpacity={1}>
                        <Text style={{fontSize:32, color:'#fff'}}>返回首页</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btn,{backgroundColor:'#D54753'}]} activeOpacity={1}>
                        <Text style={{fontSize:32, color:'#fff'}}>重新支付</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
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

    // 背景
    bg:{
        width:'90%',
        height:'30%',
        marginLeft:'5%',
        marginTop:'10%',
        marginBottom:'10%',
        backgroundColor:'#252730',
        borderRadius:20,
        display: 'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',
    },

    // 按钮盒子
    btn_box:{
        width:'90%',
        height:'5%',
        marginLeft:'5%',
        paddingLeft:'5%',
        paddingRight:'5%',
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    btn:{
        width:'45%',
        height:height/10*.5,
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
    },


});


