/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
**/

import React, {Component} from 'react';
import {View, Text, StatusBar, Dimensions, StyleSheet,ScrollView,Image} from 'react-native';

import httpGetData from '../../api/Api.js'
let { width, height} = Dimensions.get('window')


export default class Pay extends Component {
    //构造器
    constructor(props) {
        super(props)
        this.state = {
            location:'商城',
            card_num:88, 
            cacheGoods:[], // 临时缓存的商品数据
            menus:[ // 左侧菜单
                // {id: 0, good:'测试商品1', active:1},
            ],
            goods:[ // 商品
                // {id:0, img:'', name:'测试商品', type:'500ml x 12', price:88.8, num:0},
            ],
            card_lists_show:false,
            card_lists:[
                {id:0, name:'百威啤酒(罐装)', type:'500ml x 12' , price:'88.8', num:1,},
                {id:1, name:'百威啤酒(罐装)', type:'500ml x 12' , price:'88.8', num:1,},
                {id:2, name:'百威啤酒(罐装)', type:'500ml x 12' , price:'88.8', num:1,},
                {id:3, name:'百威啤酒(罐装)', type:'500ml x 12' , price:'88.8', num:1,},
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

                {/* 图片 */}
                <Image style={styles.img} source={require('../../assets/test1.jpg')} />


                {/* 商城商品 */}
                <View style={styles.content}>
                    {/* 左侧菜单 */}
                    <ScrollView style={styles.left}>
                        {
                            this.state.menus.map(item=>
                                <Text 
                                    key={item.id}
                                    style={[styles.left_alone,item.active == 0 ? styles.left_alone_active :'']}
                                    onPress={()=>this.selectClass(item._id)} >
                                    {item.good}
                                </Text>
                            )
                        }
                    </ScrollView>

                    {/* 右侧盒子 */}
                    <ScrollView style={styles.right}>
                        <View style={styles.test}>
                        {
                            this.state.goods.map(item=>
                                <View style={styles.goods_box}>
                                    {/* 图片盒子 */}
                                    <View style={styles.img_box}>
                                        <Image source={{uri:item.url}} style={styles.good_img}></Image>
                                    </View>

                                    {/* 商品名称 规格 */}
                                    <View style={styles.goods_txt_box}>
                                        <Text style={styles.goods_txt}>{item.name}</Text>
                                        <Text style={[styles.goods_txt,{fontSize:24,color:'#484B58'}]}>{item.id}</Text>
                                    </View>


                                    {/* 选择商品数量盒子 */}
                                    <View style={styles.good_num_box}>
                                        <Text style={{fontSize:32, color:'#D54753'}}>{item.price}</Text>
                                        <View style={styles.select_num}>
                                            <Text style={styles.add_jian} 
                                                onPress={()=>this.reduce(item.id)}>-
                                            </Text>
                                            <Text style={styles.good_num}>{item.num}</Text>
                                            <Text style={styles.add_jian} 
                                                onPress={()=>this.add(item.id)}>+
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                        </View>
                    </ScrollView>
                </View>


                {/* 底部tab */}
                <View style={styles.tab}>
                    <View style={[styles.pay_alone_1,{backgroundColor:'#252730'}]}>
                        <Image style={styles.card} source={require('../../assets/card.png')}></Image>
                        {/* 数量 */}
                        <Text style={[styles.card_num,{color:"#fff", fontSize:24}]}>{this.state.card_num}</Text>
                    </View>
                    <Text style={[styles.pay_alone,{backgroundColor:'#252730',fontSize:32, color:'#fff'}]}
                        onPress={()=>this.showCardLists()} >
                        总金额<Text style={{fontSize:36, color:'#D54753'}} >￥888.88</Text>
                    </Text>
                    <Text style={[styles.pay_alone,{backgroundColor:'#708090', fontSize:32, color:'#5B5E6D'}]}
                        >
                        取消订单
                    </Text>
                    <Text style={[styles.pay_alone,{backgroundColor:'#D54753', fontSize:32, color:'#fff'}]}
                        onPress={()=>this.affirmPay()}>
                        确认支付
                    </Text>
                </View>
            
                {/* 购物车 */}
                {
                    this.state.card_lists_show 
                    ? 
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

                                            <View 
                                                style={[styles.select_num,{width:'20%', justifyContent:'flex-end'}]}>
                                                <Text style={styles.add_jian} 
                                                    onPress={()=>this._reduce(item.id)}>-
                                                </Text>
                                                <Text style={styles.good_num}>{item.num}</Text>
                                                <Text style={styles.add_jian} 
                                                    onPress={()=>this._add(item.id)}>+
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                }
                            </ScrollView>
                        </View>
                    </View> 
                    : <Text></Text>
                }

            </View>
        )
    }


    // 选择左侧分类
    selectClass(e){
        console.log(e)
        // 激活样式
        this.state.menus.map((v,i)=>{
            v.active = 1
        })
        this.state.menus[e].active = 0

        // 数据
        this.setState({
            goods:this.state.cacheGoods[e].list
        })
        // 更新渲染
        this.forceUpdate() 
    }


    // 添加
    add(e){
        this.state.goods[e].num ++
        this.forceUpdate()
    }
    // 减少
    reduce(e){
        if(this.state.goods[e].num == 0){
            return false
        }else{
            this.state.goods[e].num --
        }
        this.forceUpdate()
    }
    _add(e){
        this.state.card_lists[e].num ++
        this.forceUpdate()
    }
    _reduce(e){
        if(this.state.card_lists[e].num == 0){
            return false
        }else{
            this.state.card_lists[e].num --
        }
        this.forceUpdate()
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


    // 组件渲染完毕
    componentDidMount = () => {
        // 获取商品数据
        this.getGoodsData()
    }

    // 控件卸载
    componentWillUnmount(){
       
    }


    // 获取商品数据
    getGoodsData(){
        const that = this
        httpGetData.get('http://111.229.118.122:8080/qiaoqin/wx/product/getAll','',(res)=>{
            console.log('返回的数据',res)
            // 缓存数据
            that.state.cacheGoods = res.data 

            // 处理菜单数据
            var menus = []
            that.state.cacheGoods.map((v,i)=>{
                menus.push({'_id':i,'id':v.productCategoryId,'good':v.productCategoryName,'active':1})
                v.list.map((k,l)=>{
                    k['num'] = 0
                })
            })
            menus[0].active = 0
            that.setState({
                menus:menus, // 菜单数据
                goods:that.state.cacheGoods[0].list // 默认的商品数据
            })
            that.forceUpdate() 
            console.log(that.state.menus,that.state.goods)
        })
    }

};


const styles = StyleSheet.create({
    box:{
        flex:1,
        backgroundColor:'#111217',
    },

    // ==============================  页面定位 =================================
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

    // ====================================== img ===============================
    img:{
        height:height/10*2,
    },

    // =================================== 商城商品 =============================
    content:{
        height:height/10*6.9,
        display:'flex',
        flexDirection:'row',
    },
    // 左侧盒子
    left:{
        width:width/10*2.5,
        display:'flex',
        flexDirection:'column',
    },
    // 左侧商品分类
    left_alone:{
        width:width/10*2.5,
        height:height/10*.6,
        fontSize:32,
        color:'#fff',
        textAlign:'center',
        lineHeight:height/10*.6,
    },
    left_alone_active:{
        backgroundColor:'#252730',
    },

    // 右侧盒子
    right:{},
    test:{
        width:width/10*7.5,
        backgroundColor:'#252730',
        paddingLeft:width/20*.7,
        paddingRight:width/20*.7,
        paddingTop:width/20*.7,
        paddingBottom:width/20*.7,
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
    },
    // 商品盒子
    goods_box:{
        width:width/10*2,
        height:400,
        display:'flex',
        flexDirection:'column',
        // borderWidth:1,
        // borderColor:'red',
    },
    // 图片盒子
    img_box:{
        width:width/10*2,
        height:width/10*2,
        backgroundColor:'#fff',
        borderRadius:20,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    // 商品图片
    good_img:{
        width:width/10*1.6,
        height:width/10*1.6,
        borderRadius:20,
    },
    // 商品介绍盒子
    goods_txt_box:{
        marginTop:10,
        marginBottom:10,   
    },
    // 商品介绍文本
    goods_txt:{
        color:'#fff',
        fontSize:28, 
    },
    // 商品价格 数量选择盒子
    good_num_box:{
        // borderWidth:1,
        // borderColor:'blue',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    // 数量选择盒子
    select_num:{
        // borderWidth:1,
        // borderColor:'green',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    // 符号
    add_jian:{
        width:36,
        height:36,
        borderWidth:1,
        borderColor:'#D54753',
        borderRadius:30,
        textAlign:'center',
        lineHeight:38,
        color:'#D54753',
        fontSize:36,
    },
    good_num:{
        color:'#D54753',
        fontSize:28,
        marginLeft:10,
        marginRight:10,
    },



    // ================================ 底部tab =================================
    tab:{
        position:'absolute',
        width:width,
        height:height/10*0.6,
        bottom:0,
        display:'flex',
        flexDirection: 'row',
    },
    // 购物车盒子
    pay_alone_1:{
        width:'10%',
        height:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
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
    // 后面三个盒子
    pay_alone:{
        width:'30%',
        height:height/10*0.6,
        textAlign:'center',
        lineHeight:height/10*0.6,
        display:'flex',
        flexDirection: 'row',
    },


    // ===========================  购物车商品列表 =========================
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
    cn_tbody:{
        paddingLeft:'5%',
        paddingRight:'5%',
    },
});


