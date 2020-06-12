/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
**/

import React, {Component} from 'react';
import {View, Text, StatusBar, Dimensions, StyleSheet,ScrollView,TouchableOpacity} from 'react-native';


let { width, height} = Dimensions.get('window')


export default class Supplement extends Component {
    //构造器
    constructor(props) {
        super(props)
        this.state = {
            location:'补货清单',
            shopName:'默认门店地址',
            roomNum:'默认A01',
            roomType:'默认类型(0-100人)',
            // ingTime:'默认黄金档',
            orderDay:'0000-00-00',
            // orderTime:'00:00',
            order_lists:[
                {id:1, way:'A01', name:'测试商品1',type:'500ml', num:1},
                {id:2, way:'A01', name:'测试商品1',type:'500ml', num:1},
                {id:3, way:'A01', name:'测试商品1',type:'500ml', num:1},
                {id:4, way:'A01', name:'测试商品1',type:'500ml', num:1},
                {id:5, way:'A01', name:'测试商品1',type:'500ml', num:1},
                {id:6, way:'A01', name:'测试商品1',type:'500ml', num:1},
                {id:7, way:'A01', name:'测试商品1',type:'500ml', num:1},
            ],
           
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


                {/* 内容盒子 */}
                <View style={styles.content}>
                    {/* 订单信息 */}
                    <View style={styles.order_info}>
                        <Text style={styles.info_title}>房间信息</Text>
                        <View style={styles.roomInfo}>
                            <Text style={styles.roomInfoTxt}>{this.state.shopName}</Text>
                            <Text style={styles.roomInfoTxt}>{this.state.roomNum}</Text>
                            <Text style={styles.roomInfoTxt}>{this.state.roomType}</Text>
                            {/* <Text style={styles.roomInfoTxt}>{this.state.ingTime}</Text> */}
                        </View>
                    </View>


                    {/* 订单内容 */}
                    <View style={styles.order_content}>
                        <Text style={[styles.info_title]}>补货内容</Text>
                        {/* th */}
                        <View style={[styles.cn_th]}>
                            <Text style={[styles.cn_th_txt]}>货道</Text>
                            <Text style={[styles.cn_th_txt,styles.cn_th_txt_2]}>需补货名称</Text>
                            <Text style={styles.cn_th_txt}>规格</Text>
                            <Text style={styles.cn_th_txt}>需补货数量</Text>
                        </View>

                        {/* ScrollView */}
                        <ScrollView style={styles.cn_tbody}>
                            {
                                this.state.order_lists.map(item =>
                                    <View style={[styles.cn_th]} key={item.id}>
                                        <Text style={[styles.cn_th_txt]}>{item.way}</Text>
                                        <Text style={[styles.cn_th_txt,styles.cn_th_txt_2]}>{item.name}</Text>
                                        <Text style={styles.cn_th_txt}>x{item.type}</Text>
                                        <Text style={styles.cn_th_txt}>￥{item.num}</Text>
                                    </View>
                                )
                            }
                        </ScrollView>
                    </View>
                    
                    {/* 返回补货主页面按钮 */}
                    <Text style={styles.back_btn}
                        onPress={()=>this.backHome()}
                    >
                        返回补货主页面
                    </Text>
                   

                </View>

            </View>
        )
    }


    // 返回补货主页面
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


    // ====================== 中间内容盒子 ===================================
    content:{
        width:'90%',
        height:height/10*9,
        marginLeft:'5%',
    },
    // --------------- 订单信息盒子 -------------
    order_info:{
        height:height/10*1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        borderWidth:1,
        borderColor:'transparent',
        borderBottomColor:'#2D2F36',
    },
    // 包间信息盒子
    roomInfo:{
        height:'40%',
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
    },
    // title
    info_title:{
        fontSize:32, 
        color:'#D54753',
    },
    // 包间信息文本
    roomInfoTxt:{
        fontSize:28,
        color:'#fff',
        marginRight:50,
    },


    // ---------------- 订单内容 --------------
    order_content:{
        height:height/10*3,
        paddingTop:height/10*.2,
        paddingBottom:height/10*.2,
        borderWidth:1,
        borderColor:'transparent',
        borderBottomColor:'#2D2F36',
    },
    // 内容th
    cn_th:{
        height:height/10*.3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    cn_th_txt:{
        height:'100%',
        width:'20%',
        fontSize:28,
        color:'#5B5E6D',
        textAlign:'center',
        lineHeight:height/10*.3,
    },
    cn_th_txt_2:{
        width:'40%',
    },
    // 订单具体内容
    cn_tbody:{},


    // ----------------------- 返回补货主页面 -----------------
    back_btn:{
        width:width/10*5,
        height:height/10*.5,
        backgroundColor:'#D54753',
        borderRadius:20,
        fontSize:36,
        color:'#fff',
        marginLeft:width/10*2.5,
        marginTop:height/10*.5,
        textAlign:'center',
        lineHeight:height/10*.5,

    },
   
});


