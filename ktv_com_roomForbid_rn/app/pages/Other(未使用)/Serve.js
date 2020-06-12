/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
**/

import React, {Component} from 'react';
import {View,Text, StyleSheet, Dimensions, TouchableHighlight, Button} from 'react-native';
let { width, height } = Dimensions.get('window')



export default class Serve extends Component {
    //构造器
    constructor(props) {
        super(props)
        //初始化视频播放
        this.state = {
            room:'A05',
            lockState:'密码错误',
            lockStateIsShow:false,
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
                {value:'退格',id:11},
            ],
            values:[], // 保存输入的密码
           
        };    
    }


    //渲染
    render() {
        return (
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
                        <Text style={{fontSize:24,color:'#5B5E6D'}}>请输入工号</Text>
                    </View>

                    {/* 密码显示 */}
                    <View style={[styles.show,styles.flex]}>
                        <View style={styles.input}>
                            {
                                this.state.values.map(item =>
                                    <Text style={styles.showNum} key={item}>
                                        {item}
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
                                        <Text style={{fontSize: 36, fontWeight:"700", color: '#fff'}}>{item.value}</Text>
                                    </TouchableHighlight>
                                )
                            }
                        </View>
                    </View>
                    
                    {/* 返回确认 */}
                    <View style={[styles.backBox,styles.flex]}>
                        <View style={styles.backsure}>
                            <TouchableHighlight underlayColor={'green'} style={[styles.back,styles.flex]} onPress={this.back.bind(this)}>
                                <Text style={{color:'#5B5E6D',fontSize:36}}>返回</Text>
                            </TouchableHighlight> 
                            <TouchableHighlight underlayColor={'#D54753'} style={[styles.sure,,styles.flex]} onPress={this.sure.bind(this)}>
                                <Text style={{color:"#fff",fontSize:36}}>确认</Text>
                            </TouchableHighlight> 
                        </View>
                    </View>
                </View>
            </View>  
        )
    }

    // 输入密码和确定事件
    skip(e){
        if(e=='清除'){
            this.setState({
                values: []
            })
        }else if(e=='退格'){
            this.state.values.pop()
            this.setState({
                values: this.state.values
            })
        }else{
            this.state.values.push(e)
            this.setState({
                values: this.state.values
            })
        }
    }

    // 返回
    back(){
        this.props.navigation.navigate('Dispark')
    }

    // 确定
    sure(){
        console.log('最终密码',this.state.values)
        this.setState({
            lockStateIsShow: true
        })
        this.props.navigation.navigate('Select')
    }

    // 生命周期
    componentDidMount = () => {
        
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
        backgroundColor:'#000'
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
    },

    // 返回确认
    backBox:{
        height:'12%',
        marginTop:20,
    },
    backsure: {
        width:'60%',
        height:'100%',
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    back:{
        width:'30%',
        height:'80%',
        borderWidth:1,
        borderColor:'#D54753',
        borderRadius:4,
    },
    sure:{
        width:'65%',
        height:'80%',
        borderWidth:1,
        borderColor:'#D54753',
        borderRadius:4,
    },


});


