/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
**/

import React, {Component} from 'react';
import {View, Text, StatusBar, Dimensions, StyleSheet,ScrollView,Image,TouchableOpacity} from 'react-native';
let { width, height} = Dimensions.get('window')


export default class Pay extends Component {
    //构造器
    constructor(props) {
        super(props)
        this.state = {
            location:'支付',
            timer:{}, // 计时器
            count_time:null,
            default_pay_ico:'../../assets/wx.png',
            payWay:'微信支付',
            orderNum:'123450896378672349', // 订单号
            hintTxt:'请您用微信小程序扫描二维码',
            sum:123,
            isPay_left:'取消支付',
            isPay_right:'查看详情',
            
            order_details_modelShow: false, // 订单详情
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
                {id:6, name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:6, name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:6, name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
                {id:6, name:'测试商品1',type:'500ml', num:1, tatel:'12.5'},
            ],

            pay_succeed_modelShow:false, // 支付成功弹框
            model_count_time:null, // 返回首页倒计时
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


                {/* 倒计时 */}
                <View style={styles.count_down}>
                    <Text style={styles.time}>{this.state.count_time}</Text>
                    <Text style={styles.txt1}>倒计时</Text>
                    <Text style={styles.txt2}>请您在30分钟内支付订单，超过30分钟系统将取消该订单并自动跳转到首页</Text>
                </View>
                

                {/* 二维码盒子 */}
                <View style={styles.code}>
                    {/* 支付方式 订单号 */}
                    <View style={styles.pay_way_box}>
                        <View style={styles.pay_way}>
                            <Image style={styles.pay_ico} source={require('../../assets/wx.png')} /> 
                            <Text style={styles.pay_txt1}>{this.state.payWay }</Text>
                        </View>
                        <Text style={styles.pay_txt2}>订单号:{this.state.orderNum }</Text>
                    </View>

                    {/* 二维码 */}
                    <Image style={styles.code_img} source={require('../../assets/code.png')} /> 

                    <View style={styles.sum}><Text style={styles.hintTxt}>{this.state.hintTxt}</Text></View>
                    <View style={styles.sum}><Text style={styles.sumTxt}>总金额:￥{this.state.sum}</Text></View>
                </View>


                {/* 是否支付 */}
                <View style={styles.isPay}>
                    <TouchableOpacity style={[styles.isPay_btn,styles.left_btn]} activeOpacity={1}
                        onPress={()=>this.cancelPay()} >
                        <Text style={{fontSize:32,color:'#5B5E6D'}}>{this.state.isPay_left}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.isPay_btn,styles.right_btn]} activeOpacity={1}
                        onPress={()=>this.lookDetails()} >
                        <Text style={{fontSize:32, color:'#fff'}}>{this.state.isPay_right}</Text>
                    </TouchableOpacity>
                </View>


                {/* 订单详情弹出框 */}
                {
                    this.state.order_details_modelShow ?
                        <View style={styles.details_model}>
                            <View style={styles.dm_content}>
                                {/* 订单详情 */}
                                <View style={styles.dm_title}>
                                    <Text style={styles.dm_title_txt}>订单详情</Text>
                                    <Text style={styles.dm_title_txt}  
                                        onPress={()=>this.close()}>
                                            关闭
                                    </Text>
                                </View>

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
                                    <View style={styles.oc_title}>
                                        <Text style={styles.dm_title_txt}>订单内容</Text>
                                        <Text style={styles.dm_title_txt}>总金额: 123.12</Text>
                                    </View>

                                    {/* th */}
                                    <View style={styles.cn_th}>
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

                                </View>
                            </View>
                        </View>
                    :<Text></Text>
                }


                {/* 支付成功弹出框 */}
                {
                    this.state.pay_succeed_modelShow ?
                    <View style={styles.model} >
                        <View style={styles.model_box}>
                            <Text style={{fontSize:36, color:'#fff'}}>支付成功</Text>
                            <Text style={styles.model_txt}>
                                亲爱的顾客，您选购的商品已提交至客服，服务人员将在十分钟内将您选购的物品送至您的包间，
                                感谢您的光临，祝您欢唱愉快！
                            </Text>

                            <TouchableOpacity style={styles.model_btn} activeOpacity={1}
                                onPress={()=>this.backHome()} >
                                <Text style={{fontSize:32, color:'#fff'}}>返回首页</Text>
                            </TouchableOpacity>

                            {/* 返回首页倒计时 */}
                            <Text style={{fontSize:24, color:'#fff'}}>{this.state.model_count_time} S 自动返回</Text>
                        </View>
                    </View>
                    :<Text></Text>
                }
               
            </View>
        )
    }

    // 倒计时
    count_down(e){
        var that = this
        const countDown = (second) => {
            const s = second % 60;
            const m = Math.floor(second / 60);
            return `00 : ${`00${m}`.slice(-2)} : ${`00${s}`.slice(-2)}`;
        };
        let time = e * 60;
        that.state.timer = setInterval(() => {
            that.setState({
                count_time:countDown(time--)
            })
            if(time < 0) {
                clearInterval(that.state.timer);
            }
        }, 1000);
    }

    // 返回首页 倒计时
    back_count_down(e){
        var that = this
        const countDown = (second) => {
            const s = second % 60;
            const m = Math.floor(second / 60);
            return `${`00${s}`.slice(-2)}`;
        };
        let time = e * 60;
        that.state.timer = setInterval(() => {
            that.setState({
                model_count_time:countDown(time--)
            })
            if(time < 0) {
                clearInterval(that.state.timer);
            }
        }, 1000);
    }

    // 取消支付
    cancelPay(){
        this.setState({
            pay_succeed_modelShow:true
        })
    }

    // 查看详情
    lookDetails(){
        this.setState({
            order_details_modelShow: true
        })
    }

    // 返回首页
    backHome(){
        this.props.navigation.navigate('Index')
    }

    // 关闭订单详情
    close(){
        this.setState({
            order_details_modelShow:false
        })
    }

    // 组件渲染完毕
    componentDidMount = () => {
        // 倒计时开始
        this.count_down(30)
        this.back_count_down(1)
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

    // ========================================== 订单详情 ===================================
    details_model:{
        position:'absolute',
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,.6)',
    },

    dm_content:{
        height:height/10*5,
        position:'absolute',
        bottom:height/10*.5,
        width:'100%',
        backgroundColor:'#5B5E6D',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

    // ---------------title colse ----------------
    dm_title:{
        height:height/10*.5,
        display:'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:'5%',
        paddingRight:'5%',
    },
    dm_title_txt:{
        fontSize:28,
        color:'#fff',
    },
    // --------------- 订单信息盒子 -------------
    order_info:{
        height:height/10*1.2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'space-around',
        borderWidth:2,
        borderColor:'transparent',
        borderBottomColor:'#FFFFFF',
        paddingLeft:'5%',
        paddingRight:'5%',
        paddingBottom:20,
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
        color:'#fff',
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
        color:'#fff',
        marginRight:50,
    },

    // --------- 订单内容 -------------------
    order_content:{
        height:height/10*3.3,
        paddingLeft:'5%',
        paddingRight:'5%',
    },
    oc_title:{
        height:height/10*0.5,
        borderWidth:1,
        borderColor:'transparent',
        borderBottomColor:'#FFFFFF',
        display:'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    // 内容th
    cn_th:{
        height:height/10*.4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    cn_th_txt:{
        height:'100%',
        width:'20%',
        fontSize:28,
        color:'#fff',
        textAlign:'center',
        lineHeight:height/10*.3,
    },
    cn_th_txt_1:{
        width:'40%',
        textAlign:'left',
    },
    // 订单具体内容
    cn_tbody:{},


    // ======================================== 支付成功弹出框 ================================
    model:{
        position:'absolute',
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
    },
    model_box:{
        width:'80%',
        height:'40%',
        backgroundColor:'#5B5E6D',
        borderRadius:20,
        display: 'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:'10%',
        paddingRight:'10%',
    },
    model_txt:{
        fontSize:24, 
        color:'#fff', 
        textAlign:'center',
        marginTop:50,
        marginBottom:50,
    },
    model_btn:{
        width:'50%',
        height:'10%',
        backgroundColor:'#D54753',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:20,
        marginBottom:20,
    },




    // ==============================  页面定位 =============================================
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


    // ======================================= 倒计时盒子 =======================================
    count_down:{
        width:'90%',
        height:'25%',
        marginLeft:'5%',
        display: 'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'transparent',
        borderBottomColor:'#e6e6e6'
    },
    // 时间
    time:{
        fontSize:100,
        color:'#fff',
        fontWeight:'600',
    },
    txt1:{
        color:'#fff',
        fontSize:36,
        marginTop:36,
        marginBottom:80,
    },
    txt2:{
        color:'#5B5E6D',
        fontSize:24,
    },



    // ==================================  二维码盒子=========================================
    code:{
        height:'65%',
        // borderWidth:1,
        // borderColor:'blue',
        display: 'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    pay_way_box:{
        height:'20%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',
    },
    pay_way:{
        display:'flex',
        height:'60%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    pay_ico:{
        height:width/20*2.5,
        width:width/20*2.5,
    },
    pay_txt1:{
        color:"#fff",
        fontSize:36,
        marginLeft:20,
    },
    pay_txt2:{
        color:'#5B5E6D',
        fontSize:36,
    },

    // 二维码
    code_img:{
        height:height/10*3,
        width:height/10*3,
        marginTop:height/10*.4,
        marginBottom:height/10*.4,
    },

    sum:{
        height:height/10*.5,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    hintTxt:{
        color:"#fff",
        fontSize:36,
    },
    sumTxt:{
        color:'#D54753',
        fontSize:36,
    },


    // ================================ 取消支付 确定支付 =========================================
    isPay:{
        height:'5%',
        display: 'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    isPay_btn:{
        height:'100%',
        width:'50%',
        display: 'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    left_btn:{
        backgroundColor:'#252730',
    },
    right_btn:{
        backgroundColor:'#D54753',
    },


});


