/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
**/

import React, {Component} from 'react';
import {View, Text, StatusBar, Dimensions, StyleSheet,ScrollView,Image,TouchableOpacity} from 'react-native';

let { width, height} = Dimensions.get('window')


export default class Order extends Component {
    //构造器
    constructor(props) {
        super(props)
        this.state = {
            location:'订单',
            shopName:'默认门店地址',
            roomNum:'默认A01',
            roomType:'默认类型(0-100人)',
            ingTime:'默认黄金档',
            orderDay:'0000-00-00',
            orderTime:'00:00',
            order_lists:[
                {id:1, name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:2, name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:3, name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:4, name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:5, name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:6, name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:7, name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:8, name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:9, name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:10, name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:11, name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:12, name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:13, name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:14,name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:15,name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:16,name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:17,name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:18,name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:19,name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:20,name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:21,name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:22,name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:23,name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:24,name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:25,name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:26,name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:27,name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
            ],
            pay_ways:[
                {id:1,img:'',txt:'微信支付',active:true},
                {id:2,img:'',txt:'支付宝支付',active:false},
                {id:3,img:'',txt:'钱包支付',active:false},
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



                {/* 内容盒子 */}
                <View style={styles.content}>
                    {/* 订单信息 */}
                    <View style={styles.order_info}>
                        <Text style={styles.info_title}>订单信息</Text>
                        <View style={styles.roomInfo}>
                            <Text style={styles.roomInfoTxt}>{this.state.shopName}</Text>
                            <Text style={styles.roomInfoTxt}>{this.state.roomNum}</Text>
                            <Text style={styles.roomInfoTxt}>{this.state.roomType}</Text>
                            <Text style={styles.roomInfoTxt}>{this.state.ingTime}</Text>
                        </View>
                        {/* 订单时间 */}
                        <View style={styles.info_time}>
                            <Text style={styles.info_time_txt}>订单时间 :  {this.state.orderDay}</Text>
                            <Text style={styles.info_time_txt}>{this.state.orderTime}</Text>
                        </View>
                    </View>


                    {/* 订单内容 */}
                    <View style={styles.order_content}>
                        <Text style={[styles.info_title]}>订单内容</Text>
                        {/* th */}
                        <View style={[styles.cn_th]}>
                            <Text style={[styles.cn_th_txt,styles.cn_th_txt_1,{paddingLeft:'5%'}]}>名称</Text>
                            <Text style={styles.cn_th_txt}>规格</Text>
                            <Text style={styles.cn_th_txt}>数量</Text>
                            <Text style={styles.cn_th_txt}>小计</Text>
                        </View>

                        {/* ScrollView */}
                        <ScrollView style={styles.cn_tbody}>
                            {
                                this.state.order_lists.map(item =>
                                    <View style={[styles.cn_th]} key={item.id}>
                                        <Text style={[styles.cn_th_txt,styles.cn_th_txt_1]}>{item.name}</Text>
                                        <Text style={styles.cn_th_txt}>{item.type}</Text>
                                        <Text style={styles.cn_th_txt}>x{item.num}</Text>
                                        <Text style={styles.cn_th_txt}>￥{item.tatel}</Text>
                                    </View>
                                )
                            }
                        </ScrollView>

                        {/* 合计 */}
                        <Text style={styles.cn_totel}>合计 ￥000</Text>
                    </View>


                    {/* 支付方式选择 */}
                    <View style={styles.order_pay_way}>
                        <Text style={styles.info_title}>点击选择支付方式</Text>

                        {/* 方式选择盒子 */}
                        <View style={styles.pay_way_box}>
                            {
                                this.state.pay_ways.map(item =>
                                    <TouchableOpacity activeOpacity={1} 
                                        style={[styles.pay_way_alone, item.active ? styles.pay_way_alone_active : " "]} 
                                        key={item.id}
                                        onPress={()=>this.selectPayWay(item.id)}>
                                        <Image style={styles.pay_ico} source={require('../../assets/wx.png')} /> 
                                        <Text style={styles.pay_way_txt}>{item.txt}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </View>
                </View>



                {/* 返回上一页 去支付 */}
                <View style={styles.back_pay}>
                    <TouchableOpacity style={[styles.back_pay_btn,{backgroundColor:'#252730'}]} activeOpacity={1}
                        onPress={()=>this.backHome()} >
                        <Text style={{fontSize:32, color:'#5B5E6D'}}>返回上一页</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.back_pay_btn,{backgroundColor:'#D54753'}]} activeOpacity={1}
                        onPress={()=>this.Pay()} >
                        <Text style={{fontSize:32, color:'#fff'}}>去支付</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    // 选择支付方式
    selectPayWay(e){
        var index = e-1
        this.state.pay_ways.map((v,i)=>{
            v.active = false
        })
        this.state.pay_ways[index].active = true
        this.forceUpdate() 
    }

    // 返回首页
    backHome(){
        this.props.navigation.navigate('Index')
    }
    // 去支付
    Pay(){
        this.props.navigation.navigate('Pay')
    }

    // 组件渲染完毕
    componentDidMount = () => {
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


    // ====================== 中间内容盒子 ===================================
    content:{
        width:'90%',
        height:height/10*9,
        marginLeft:'5%',
    },
    // --------------- 订单信息盒子 -------------
    order_info:{
        height:height/10*1.5,
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
    info_time:{
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
    },
    // 时间文本
    info_time_txt:{
        fontSize:26,
        color:'#D54753',
        marginRight:50,
    },


    // ---------------- 订单内容 --------------
    order_content:{
        height:height/10*5,
        paddingTop:height/10*.2,
        paddingBottom:height/10*.2,
        borderWidth:1,
        borderColor:'transparent',
        borderBottomColor:'#2D2F36',
        // borderWidth:1,
        // borderColor:"#fff"
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
    cn_th_txt_1:{
        width:'40%',
        textAlign:'left',
    },
    // 订单具体内容
    cn_tbody:{},
    // 合计
    cn_totel:{
        height:height/10*.3, 
        lineHeight:height/10*.3,
        fontSize:28,
        color:'#D54753',
        textAlign:'right',
        paddingRight:'5%',
    },


    // ------------- 订单支付方式选择 -----------
    order_pay_way:{
        height:height/10*2.5,
        paddingTop:height/10*.2,
        display:'flex',
        flexDirection: 'column',
        alignItems:'center',
    },
    pay_way_box:{
        width:'100%',
        marginTop:'2.5%',
        display:'flex',
        flexDirection: 'row',
        justifyContent:'space-around'
    },
    // 单独的一种支付方式
    pay_way_alone:{
        width:width/10*2,
        height:width/10*2,
        display:'flex',
        flexDirection: 'column',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#252730',
        borderRadius:20,
    },
    pay_way_alone_active:{
        backgroundColor:'#5B5E6D',
    },

    pay_ico:{
        width:'60%',
        height:'60%',
    },
    pay_way_txt:{
        fontSize:28,
        color:'#fff',
    },




    // ============================ 返回上一页 去支付 =====================
    back_pay:{
        height:height/10*.5,
        display: 'flex',
        flexDirection: 'row',
    },
    back_pay_btn:{
        width:'50%',
        height:'100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },

});


