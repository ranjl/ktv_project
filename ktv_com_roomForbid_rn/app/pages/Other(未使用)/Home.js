/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
**/

import React, {Component} from 'react';
import {View,Text, StyleSheet, Dimensions, TouchableHighlight, Button,ImageBackground,DeviceEventEmitter} from 'react-native';
let { width, height } = Dimensions.get('window')



export default class Home extends Component {
    //构造器
    constructor(props) {
        super(props)
        //初始化视频播放
        this.state = {
            room:'A05',
            lockState:'密码错误',
            lockStateIsShow:false,
            passwordValue:[], // 替代密码
            btns:[
                {value:1,id:1},
                {value:2,id:2},
                {value:3,id:3},
                {value:4,id:4},
                {value:5,id:5},
                {value:6,id:6},
                {value:7,id:7},
                {value:8,id:8},
                {value:9,id:9},
                {value:'清除',id:10},
                {value:0,id:0},
                {value:'确认',id:11},
            ],
            value:[], // 真实密码
            num:0,
            ws:{},
        };    
    }


    //渲染
    render() {
        return (
            <ImageBackground style={{flex:1}} 
                source={require('../../assets/imgs/await.jpg')}>
                <View style={styles.box}>
                    {/* 上 */}
                    <View style={styles.up}>
                        <Text></Text>
                        <Text style={{fontSize:320,color:'#D54753'}}>{this.state.room}</Text>
                    </View>

                    {/* 下 */}
                    <View style={styles.below}>
                        {/* 提示语 */}
                        <View style={[styles.hint,styles.flex]}>
                            <Text style={{fontSize:24,color:'#5B5E6D'}}>请输入密码</Text>
                        </View>

                        {/* 密码显示 */}
                        <View style={[styles.show,styles.flex]}>
                            <View style={styles.input}>
                                {
                                    this.state.passwordValue.map(item =>
                                        <Text style={styles.showNum} key={item.id}>
                                            {item.value0}
                                        </Text>
                                    )
                                }
                            </View>
                        </View>
                        
                        {/* 密码错误 */}
                        <View style={[styles.flex,{height:'5%'}]}>
                            {
                                this.state.lockStateIsShow ?
                                <Text style={{fontSize:18,color:'#D54753'}}>{this.state.lockState}</Text>:
                                <Text></Text>
                            }
                            
                        </View>

                        {/* 输入密码 */}
                        <View style={[styles.btnBox,styles.flex]}>
                            <View style={styles.btnSmallBox}>
                                {
                                    this.state.btns.map(item =>
                                        <TouchableHighlight underlayColor={'#D54753'} style={[styles.btn,styles.flex]} key={item.id}
                                            onPress={()=>this.skip(item.value)}>
                                            <Text  style={{fontSize: 36, fontWeight:"700", color: '#fff'}}>{item.value}</Text>
                                        </TouchableHighlight>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                </View>  
            </ImageBackground>
        )
    }

    // 输入密码和确定事件
    skip(e){
        if(e=='清除'){
            this.state.passwordValue.pop()  // 删除最后一位替代密码
            this.setState({
                passwordValue: this.state.passwordValue
            })

            // 删除最后一位真实密码
            this.state.value.pop() 
        }else if(e=='确认'){
            console.log('最终密码',this.state.value)
            this.setState({
                lockStateIsShow: true
            })
            this.props.navigation.navigate('Dispark')
            // 调用事件通知
            // DeviceEventEmitter.emit('refresh');
            
        }else{ // 数字键
            this.setState({
                num:this.state.num + 1
            })
            this.state.passwordValue.push({value0:'*',id:this.state.num}) // 添加替代密码
            this.state.value.push(e)  // 添加真实密码
            this.setState({
                passwordValue: this.state.passwordValue
            })
            
        }
    }

    // 生命周期
    componentDidMount = () => {
        
    }

    // 页面卸载
    componentWillUnmount(){
        
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
        backgroundColor:'rgba(0,0,0,.8)'
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
    

    hint: {
        height:'10%',
    },
    show: {
        height:'10%',
        display:'flex',
        alignItems: 'center',
    },
    showNum: {
        fontSize: 36, 
        marginLeft: 10, 
        marginRight: 10, 
        marginTop: 10, 
        color: '#D54753'
    },
    input: {
        width:'60%',
        height:'80%',
        borderWidth:1,
        borderColor:'#D54753',
        borderRadius: 4,
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    btnBox: {
        height:'50%',
        marginTop:5,
    },
    btnSmallBox: {
        width:'60%',
        height:'100%',
        display:'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    btn: {
        width:'30%',
        height:'20%',
        borderWidth: 1,
        borderColor: '#D54753',
        borderRadius: 4,
        marginBottom:30,
    }
});


