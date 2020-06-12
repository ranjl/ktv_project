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
            location:'输入密码',
            shopName:'KTV门店名称', // 门店名称
            remark:'请输入服务员口令', // 提示语
            value:'', // 输入的口令
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

                {/* 图片 */}
                <Image style={styles.img} source={require('../../assets/test1.jpg')} /> 
                
                {/* 名称名称盒子 */}
                <View style={styles.content_box}>
                    <Text style={styles.shopName}>{this.state.shopName}</Text>
                    {/* 密码输入框 */}
                    <TextInput style={styles.input}
                        autoFocus={false} // 是否呼出键盘
                        keyboard={'numeric'} // 键盘类型
                        placeholderTextColor={'#5B5E6D'}
                        secureTextEntry={true} // 内容是否隐藏
                        maxLength={12} // 最大输入长度
                        placeholder="请输入服务员口令" 
                        value={this.state.value}
                        onChangeText={(value) => this.setState({value})}/>
                    {/* 按钮 */}
                    <TouchableHighlight style={styles.btn} underlayColor={'#D54753'}
                        onPress={()=>this.affirm()} >
                        <Text style={{color:'#fff', fontSize:36}}> 确认 </Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

    
    // 返回首页
    affirm(){
        if(this.state.value == '1234567'){
            this.props.navigation.navigate('BindNum')
        }
        if(this.state.value == '7654321'){
            this.props.navigation.navigate('GoodsPathTest')
        }
        else{
            this.props.navigation.navigate('Index')
        }
        
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
        // backgroundColor:'#C1FFC1'
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
        // backgroundColor:'red'
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


    // ------------------ img ------------------
    img:{
        height:height/10*2,
    },

    // ----------- 内容盒子 --------------
    content_box:{
        height:height/10*6,
        display: 'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    shopName:{
        fontSize:48,
        color:'#fff',
    },
    input:{
        width:'80%',
        height: height/10*.6,
        backgroundColor:'#252730',
        borderRadius:10,
        marginTop:80,
        marginBottom:80,
        fontSize:36,
        color:'#fff',
        paddingLeft:32,
        letterSpacing:16, //字间距
    },
    btn:{
        width:'40%',
        height: height/10*0.5,
        backgroundColor:'#D54753',
        display: 'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
    }
});


