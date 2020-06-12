/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
**/

import React, {Component} from 'react';
import {View, Text, StatusBar, Dimensions, StyleSheet,Image,TouchableOpacity,ScrollView,ToastAndroid} from 'react-native';
import httpGetData from '../api/Api.js'
import wsGetData from '../api/Ws.js'


let { width, height} = Dimensions.get('window')

export default class Index extends Component {
    //构造器
    constructor(props) {
        super(props)

        this.state = {
            location:'贩卖机首页',
            upBoxNum:[
                {id:0,},
                {id:1,},
                {id:2,},
                {id:3,},
            ],
            centerBoxNum:[
                {id:4,},
                {id:5,},
                {id:6,},
                {id:7,},
                {id:8,},
                {id:9,},
                {id:10,},
                {id:11,},
                {id:12,},
            ],
            salesSt:'已售', // 售卖状态
            boxNum:'A01', // 盒子编号
            goodsName:'测试商品', // 商品名称
            goodsSet:'500ml x 12', // 商品规格
            price:229.00, // 商品单价
            addCard:'加入购物车', // 加入购物车

            storeEntType:2, // 商城入口处显示类型(默认选择商城入口)
            storeTxt1:'没有看见你想要的？',
            storeTxt2:'商城配送',
            storeTxt3:'点击进入',
            storeTxt4:'十分钟之内送入您房间!',
            urs_store_name:'国旅广场店',
            urs_store_roomNum:'00001',
            urs_store_cabinetNum:'ashib123',
            urs_store_pre:'007',

            tabType:2, // 底部默认显示第一种类型
            card_num:13,
            color_types:[ // 颜色
                {id:0, txt:'需要补货的货道', color:'#D54753'},
                {id:0, txt:'不需要补货的货道', color:'green'},
            ],
            tabBtns:[ // 底部第二种类型按钮
                {id:0, txt:'注销返回',color:'red',right:20},
            ],
            tabHint_show:false,
            tabHint:'完成之前请您先确认仓门是否全部关闭',

            card_lists_show:false, // 购物车列表
            card_lists:[
                {id:0, name:'百威啤酒(罐装)', type:'500ml x 12' , price:'88.8'},
                {id:1, name:'百威啤酒(罐装)', type:'500ml x 12' , price:'88.8'},
                {id:2, name:'百威啤酒(罐装)', type:'500ml x 12' , price:'88.8'},
                {id:3, name:'百威啤酒(罐装)', type:'500ml x 12' , price:'88.8'},
            ],

            // 其它弹出框
            model_show:false,
            model_title:'支付成功',
            model_txt:'亲爱的顾客，您选购A01,A02,A03的商品门已打开，请您根据图形具体位置尽快取出您的商品，谢谢!',
            model_btns:[
                {id:0, txt:'确认'},
                {id:0, txt:'返回测试'},
            ],
            timer:{}, // 计时器
            count_time:null, // 倒计时
            model_hint:'S 自动返回',
        }; 
    }


    //渲染
    render() {
        return (
            <View style={styles.box}>
                {/* 全屏 */}
                <StatusBar hidden={true} />
                {/* 页面定位及呼出按钮 */}
                <View style={styles.location}>
                    <Text style={styles.loc_btn}></Text>
                    <Text style={styles.loc_txt}>{this.state.location}</Text>
                    <Text style={styles.loc_btn} onLongPress={()=>this.onLongPress()} ></Text>
                </View>


                {/* 商品上部分 */}
                <View style={styles.up}>
                    {/* 左 */}
                    <View style={styles.up_left}>
                        {
                            this.state.upBoxNum.map(item =>
                                <View style={styles._alone} key={item.id}>
                                    <View style={styles.al_status}>
                                        <Text style={styles.al_status_txt}>{this.state.salesSt}</Text>
                                        <Text style={styles.al_status_txt}>{this.state.boxNum}</Text>
                                    </View>
                                    
                                    <View style={styles.al_img}>
                                        {/* 商品图片 */}
                                        <Image 
                                            source={{uri:item.url}}
                                            style={styles.al_img_img}></Image>
                                        {/* 商品介绍 */}
                                        <View style={styles.goodsTxt}>
                                            <Text style={styles.goods_txt}>{item.name}</Text>
                                            <Text style={[styles.goods_txt,{fontSize:20,color:'#484B58'}]}>{item.id}</Text>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.al_ope}>
                                        <View style={styles.al_ope_price}><Text style={{color:'#D54753',fontSize:26}}>{this.state.price}</Text></View>
                                        <TouchableOpacity style={[styles.al_ope_price,{backgroundColor:'#D54753'}]} activeOpacity={1} onPress={()=>this.addCard()}>
                                            <Text style={{color:'#fff',fontSize:24}}>{this.state.addCard}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }
                    </View>

                    {/* 右 */}
                    <View style={styles.up_right_box}>
                        {
                            this.state.storeEntType == 2 
                            ?
                            // 商城入口
                            <View style={styles.up_right}>
                                <Text style={[styles.up_right_txt,{}]}>{this.state.storeTxt1}</Text>
                                <Text style={[styles.up_right_txt,{fontSize:30}]}>{this.state.storeTxt2}</Text>
                                <Image source={require('../assets/def_img.jpg')} style={styles.up_right_img}></Image>
                                <TouchableOpacity style={styles.up_right_btn} activeOpacity={1} onPress={()=>this.enterStore()}>
                                    <Text style={[styles.up_right_txt,{fontSize:24,color:'#fff'}]}>{this.state.storeTxt3}</Text>
                                </TouchableOpacity>
                                <Text style={[styles.up_right_txt,{fontSize:24,color:'#484B58'}]}>{this.state.storeTxt4}</Text>
                            </View>
                            :
                            // 补货员信息
                            <View style={styles.up_right_sup}>
                                <Text style={styles.urs_txt}>名店名称:{this.state.urs_store_name}</Text>
                                <Text style={styles.urs_txt}>包间:{this.state.urs_store_roomNum}</Text>
                                <Text style={styles.urs_txt}>货柜编号:{this.state.urs_store_cabinetNum}</Text>
                                <Text style={styles.urs_txt}>补货人:{this.state.urs_store_pre}</Text>
                            </View>
                        }
                        
                    </View>
                </View>


                {/* 商品中间部分 */}
                <View style={styles.center}>
                    {
                        this.state.centerBoxNum.map(item =>
                            <View style={styles._alone} key={item.id}>
                                <View style={styles.al_status}>
                                    <Text style={styles.al_status_txt}>{this.state.salesSt}</Text>
                                    <Text style={styles.al_status_txt}>{this.state.boxNum}</Text>
                                </View>
                                
                                <View style={styles.al_img}>
                                    {/* 商品图片 */}
                                    <Image source={{uri:item.url}} style={styles.al_img_img}></Image>
                                    {/* 商品介绍 */}
                                    <View style={styles.goodsTxt}>
                                        <Text style={styles.goods_txt}>{item.name}</Text>
                                        <Text style={[styles.goods_txt,{fontSize:18,color:'#484B58'}]}>{item.id}</Text>
                                    </View>
                                </View>
                                
                                <View style={styles.al_ope}>
                                    <View style={styles.al_ope_price}><Text style={{color:'#D54753',fontSize:26}}>{this.state.price}</Text></View>
                                    <TouchableOpacity style={[styles.al_ope_price,{backgroundColor:'#D54753'}]} activeOpacity={1} onPress={()=>this.addCard()}>
                                        <Text style={{color:'#fff',fontSize:24}}>{this.state.addCard}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                </View>


                {/* 下面操作部分 */}
                <View style={styles.below}>
                    {
                        this.state.tabType == 2
                            ?
                            //  第一种 
                            <View style={styles.pay_box_1}>
                                <View style={[styles.pay_alone_1,{backgroundColor:'#252730'}]}>
                                    <Image style={styles.card} source={require('../assets/card.png')}></Image>
                                    {/* 数量 */}
                                    <Text style={[styles.card_num,{color:"#fff", fontSize:24}]}>{this.state.card_num}</Text>
                                </View>
                                <Text style={[styles.pay_alone,{backgroundColor:'#252730',fontSize:32, color:'#fff'}]}
                                    onPress={()=>this.showCardLists()}>
                                    总金额<Text style={{fontSize:36, color:'#D54753'}} >￥888.88</Text>
                                </Text>
                                <Text style={[styles.pay_alone,{backgroundColor:'#708090', fontSize:32, color:'#5B5E6D'}]}
                                    >
                                    清空购物车
                                </Text>
                                <Text style={[styles.pay_alone,{backgroundColor:'#D54753', fontSize:32, color:'#fff'}]}
                                    onPress={()=>this.affirmPay()}>
                                    确认支付
                                </Text>
                            </View> 
                            :
                            // 第二种
                            <View style={styles.box_2}>
                                {/* 颜色标识 */}
                                <View style={styles.color_type}>
                                    {
                                        this.state.color_types.map(item=>
                                            <View style={styles.color_alone} key={item.id}>
                                                <Text style={[styles.color_bg,{backgroundColor:item.color}]}></Text>
                                                <Text style={styles.color_txt}>{item.txt}</Text>
                                            </View>
                                        )
                                    }
                                </View>

                                {/* 按钮 */}
                                <View style={styles.tabBtn_box}>
                                    {
                                        this.state.tabBtns.map(item=>
                                            <Text key={item.id}
                                                style={[styles.tabBtn,{backgroundColor:item.color, marginRight:item.right}]}>
                                                {item.txt}
                                            </Text>
                                        )
                                    }
                                </View>

                                {/* 提示语 */}
                                <Text style={styles.tabHint}>{this.state.tabHint}</Text>
                            </View>
                    }
                </View>


                {/* 购物车商品列表 */}
                {
                    this.state.card_lists_show ? 
                        <View style={styles.card_model}>
                            <View style={styles.cm_content}>
                                {/* 订单详情 */}
                                <View style={styles.dm_title}>
                                    <Text style={styles.dm_title_txt}>订单详情</Text>
                                    <Text style={styles.dm_title_txt}  
                                        onPress={()=>this.closeOrderList()}>
                                            关闭
                                    </Text>
                                </View>

                                {/* 订单列表 */}
                                {/* ScrollView */}
                                <ScrollView style={styles.cn_tbody}>
                                    {
                                        this.state.card_lists.map(item =>
                                            <View style={[styles.cn_th]} key={item.id}>
                                                <Text style={[styles.cn_th_txt,styles.cn_th_txt_1]}>{item.name}</Text>
                                                <Text style={styles.cn_th_txt}>{item.type}</Text>
                                                <Text style={styles.cn_th_txt}>￥{item.price}</Text>
                                            </View>
                                        )
                                    }
                                </ScrollView>
                            </View>
                        </View> 
                        : <Text></Text>
                }


                {/* 其它操作弹框 */}
                {
                    this.state.model_show ?
                        <View style={styles.model}>
                            {/* 内容 */}
                            <View style={styles.model_content}>
                                {/* title */}
                                <Text style={{fontSize:36, color:'#fff'}}> {this.state.model_title} </Text>
                                {/* txt */}
                                <Text style={{fontSize:28, color:'#fff',marginTop:'8%', marginBottom:'8%'}}> {this.state.model_txt} </Text>
                                {/* 按钮框 */}
                                <View style={styles.model_btns}>
                                    {
                                        this.state.model_btns.map(item=>
                                            <Text style={styles.model_btn} key={item.id} 
                                                onPress={()=>this.model_btn(item.id, item.txt)} > {item.txt} </Text>
                                        )
                                    }
                                </View>
                                {/* 提示 */}
                                <Text style={[styles.model_hint,{fontSize:28, color:'#fff'}]}>
                                    {this.state.count_time}
                                    {this.state.model_hint}
                                </Text>
                            </View>
                        </View>
                        : <Text></Text>
                }
            </View>
        )
    }


    // 长按事件
    onLongPress(){
        this.props.navigation.navigate('Password')
    }

    // 添加至购物车
    addCard(){
        ToastAndroid.showWithGravity(
            "加入购物车",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    // 点击进入商城
    enterStore(){
        this.props.navigation.navigate('Store')
    }

    // 确认支付
    affirmPay(){
        this.props.navigation.navigate('Order')
    }

    // 显示购物车列表
    showCardLists(){
        this.setState({
            card_lists_show: true
        })
    }
    // 关闭订单列表
    closeOrderList(){
        this.setState({
            card_lists_show: false
        })
    }

    // 弹出框按钮
    model_btn(){
        this.setState({
            model_show: false
        })
    }

    // 返回首页倒计时
    count_down(e){
        var that = this
        const countDown = (second) => {
            const s = second % 60;
            const m = Math.floor(second / 60);
            return `${`00${s}`.slice(-2)}`;
        };
        let time = e * 60;
        that.state.timer = setInterval(() => {
            that.setState({
                count_time:countDown(time--)
            })
            if(time < 0) {
                clearInterval(that.state.timer);
                that.setState({
                    model_show:false
                })
            }
        }, 1000);
    }

 
    // 组件渲染完毕
    componentDidMount = () => {
        // 30s返回首页
        this.count_down(.5)
        
        // 得到数据
        this.httpGetData()
        
        // 执行长链接
        // this.websocket()
    }

    // 控件卸载
    componentWillUnmount(){}

    // 获取数据
    httpGetData(){
        const that = this
        httpGetData.get('http://111.229.118.122:8080/qiaoqin/wx/product/getAll','',(res)=>{
            console.log('返回的数据',res)
            const goods = res.data[0].list 
            const arr = []
            for(let a=0; a<4; a++){
                arr.push(goods[a])
            }
            // const arr1 = []
            // for(let a1=4; a1<13; a1++){
            //     arr1.push(goods[a1])
            // }
            that.setState({
                upBoxNum:arr,
                // centerBoxNum:arr1
            })
            // that.forceUpdate() 
            console.log(that.state.upBoxNum,that.state.centerBoxNum)
        })
    }


    // websocket
    websocket(){
        const that = this
        var data = { value:123, rid:31 }
        wsGetData.ws(data,function(res){
            console.log(res)
        })
    }

};


const styles = StyleSheet.create({
    box:{
        flex:1,
        backgroundColor:'#111217',
    },

    // =================================  下面操作部分 ==================================
    below:{
        width:width,
        height:height/10*0.9,
        paddingLeft:30,
        paddingRight:30,
        // borderWidth:1,
        // borderColor:'#D8BFD8'
    },

    // --------------- 底部tab(第一种显示类型) -------------------
    pay_box_1:{
        position:'absolute',
        width:width,
        height:height/10*0.6,
        bottom:0,
        display:'flex',
        flexDirection: 'row',
    },
    pay_alone_1:{
        width:'10%',
        height:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    card:{
        height:height/10*.4,
        width:height/10*.4,
    },
    card_num:{
        position:'absolute',
        top:0,
        left:height/10*.3,
        width:width/10*.4,
        height:width/10*.4,
        textAlign:'center',
        lineHeight:width/10*.4,
        backgroundColor:'#D54753',
        borderRadius:100,
    },
    pay_alone:{
        width:'30%',
        height:height/10*0.6,
        textAlign:'center',
        lineHeight:height/10*0.6,
        display:'flex',
        flexDirection: 'row',
    },
    // ++++++++ 购物车商品列表 ++++++++++++++
    card_model:{
        width:width,
        height:height/10*9.4,
        position:'absolute',
        top:0,
        backgroundColor:'rgba(0,0,0,.7)',
    },
    // 内容
    cm_content:{
        width:width,
        position:'absolute',
        bottom:0,
        height:height/10*3,
        backgroundColor:'#5B5E6D',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    //  title close 
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

    // 列表 
    cn_th:{
        height:height/10*.4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    cn_th_txt:{
        height:'100%',
        width:'30%',
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
    cn_tbody:{
        paddingLeft:'5%',
        paddingRight:'5%',
    },

    // --------------- 底部tab(第二种显示类型) -------------------
    box_2:{
        width:'100%',
        height:height/10*.9,
    },
    // 颜色标识栏
    color_type:{
        width:'100%',
        height:height/10*.25,
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    color_alone:{
        height:'100%',
        marginRight:30,
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-end',
    },
    // 颜色
    color_bg:{
        width:height/10*.3,
        height:height/10*.15,
        marginRight:10,
        borderRadius:8,
    },
    // 文本
    color_txt:{
        fontSize:24,
        color:'#fff',
    },
    // 按钮栏
    tabBtn_box:{
        width:width/10*8,
        width:'100%',
        height:height/10*.45,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    // 按钮
    tabBtn:{
        fontSize:32,
        color:'#fff',
        width:width/10*3,
        height:height/10*.35,
        textAlign:'center',
        lineHeight:height/10*.35,
        borderRadius:20,
    },
    // 提示语
    tabHint:{
        width:'100%',
        height:height/10*.2,
        fontSize:24,
        color:'#5B5E6D',
        textAlign:'center',
        // lineHeight:height/10*.2,
    },






    // ==================================== 弹窗 ===================================
    model:{
        width:width,
        height:height,
        position:'absolute',
        top:0,
        backgroundColor:'rgba(0,0,0,.7)',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    // 背景色部分
    model_content:{
        width:width/10*7,
        height:width/10*5,
        backgroundColor:'#5B5E6D',
        borderRadius:20,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:'5%',
        paddingRight:'5%',
    },
    // 按钮框
    model_btns:{
        display:'flex',
        width:width/10*5,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginBottom:'5%',
    },
    // 按钮
    model_btn:{
        fontSize:28,
        color:'#D54753',
        backgroundColor:'#fff',
        borderRadius:10,
        width:width/10*2,
        height:width/10*.6,
        textAlign:'center',
        lineHeight:width/10*.6,
    },




    // ----------- 页面定位及呼出按钮 ------------------
    location:{
        width:'100%',
        height:height/10*0.5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center',
        // backgroundColor:'#FF7F24',
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



    // --------------- 商品上部分 -------------------
    up:{
        width:width,
        height:height/10*3.5,
        paddingLeft:width/20*.5,
        paddingRight:width/20*.5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        // backgroundColor:'#C1FFC1',
    },

    // 左侧商品格子盒子
    up_left:{
        width:width/20*12.5,
        height:'100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        alignItems:'baseline',
        // backgroundColor:'red',
    },
    // 右侧商城入口盒子
    up_right_box:{
        width:width/20*6.5,
        height:'100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'flex-end',
        // backgroundColor:'green',
    },
    up_right:{
        width:width/10*3,
        height:height/10*3.34,
        backgroundColor:'#252730',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems:'center',
    },
    // ++++++++ 商城入口 +++++++++++++++
    // 图片
    up_right_img:{
        height:'36%',
        width:'60%',
        borderRadius: 10,
    },
    // 文本
    up_right_txt:{
        color:'#fff',
        fontSize:32
    },
    // 点击进入按钮
    up_right_btn:{
        width:'50%',
        height:'10%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center',
        backgroundColor:'#D54753'
    },
    // +++++++++++ 补货员信息 +++++++++++++++++
    up_right_sup:{
        width:width/10*3,
        height:height/10*3.34,
        backgroundColor:'#252730',
        paddingLeft:20,
    },
    urs_txt:{
        fontSize:24,
        color:'#fff',
        marginTop:30,
        marginBottom:10,
    },



    // ----------------- 商品格子 ---------------------
    _alone:{
        width:width/10*3,
        height:height/10*1.6,
        marginBottom:width/20*.5,
        backgroundColor:'#252730',
    },
    // 售卖状态及格子编号
    al_status:{
        width:'100%',
        height:'20%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:20,
        paddingRight:20,
    },
    // 商品售卖状态及格子标号文本
    al_status_txt:{
        color:'#fff',
        fontSize:30,
    },

    // 商品图片及介绍盒子
    al_img:{
        width:'100%',
        height:'60%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:20,
        paddingRight:20,
    },
    // 图片
    al_img_img:{
        height:'70%',
        width:'50%',
        borderRadius: 10,
    },
    // 商品介绍盒子
    goodsTxt:{
        height:'80%',
        width:'50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        paddingLeft:20,
    },
    // 商品介绍文本
    goods_txt:{
        color:'#fff',
        fontSize:26, 
    },

    // 价格和加入购物车盒子
    al_ope:{
        width:'100%',
        height:'20%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center',
    },
    // 价格/加入购物车
    al_ope_price:{
        width:'50%',
        height:'100%',
        display: 'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        color:'#fff',
        fontSize:26,
    },
   

    // ------------------ 商品中间部分 -----------------
    center:{
        width:width,
        height:height/10*5.1,
        paddingLeft:width/20*.5,
        paddingRight:width/20*.5,
        display: 'flex',
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        alignItems:'baseline',
        // backgroundColor:'#9F79EE',
    },

   

});


