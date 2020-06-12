/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
**/

import React, {Component} from 'react';
import {View,Text, StyleSheet,TouchableHighlight,ImageBackground,StatusBar,DeviceEventEmitter,AsyncStorage} from 'react-native';


export default class Pwd extends Component {
    //构造器
    constructor(props) {
        super(props)
        //初始化视频播放
        this.state = {
            room:'A00',
            lockState:'密码错误',
            lockStateIsShow:false,
            btns:[ // 按键
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
            num:0, // 渲染*的个数
            fakePwds:[], // 替代密码
            values:[], // 真实密码
            res:{}, // 缓存
            page:'test', // 记录从哪个页面跳转到本页面的(暂未使用)
            timer:{}, // 计时器
            phone:null, // 缓存的保洁工号
            order_id:0, // 订单id
            isPush:1, // 是否再次推送消息
        };    
    }


    //渲染
    render() {
        return (
            <ImageBackground style={{flex:1}} 
                source={require('../../assets/imgs/await.jpg')}>
                <StatusBar hidden={true} />
                    <View style={styles.box}>
                        {/* 上 */}
                        <View style={styles.up}>
                            <Text></Text>
                            <Text style={{fontSize:220,color:'#D54753'}}>{this.state.room}</Text>
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
                                        this.state.fakePwds.map(item =>
                                            <Text style={styles.showNum} key={item.id}>
                                                {item.value}
                                            </Text>
                                        )
                                    }
                                </View>
                            </View>
                            
                            {/* 提示语 */}
                            <View style={[styles.flex,{height:'5%'}]}>
                                {
                                    this.state.lockStateIsShow ?
                                    <Text style={{fontSize:24,color:'#D54753'}}>{this.state.lockState}</Text>:
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
            </ImageBackground>
        )
    }


    // 输入密码和确定事件
    skip(e){
        if(e=='清除'){
            this.state.fakePwds = []
            this.setState({
                fakePwds:this.state.fakePwds
            })
            this.state.values = []
        }else if(e=='退格'){
            this.state.fakePwds.pop() // 删除替代密码的最后一位
            this.setState({
                fakePwds:this.state.fakePwds
            })
            this.state.values.pop() // 删除真实密码的最后一位
        }else{
            this.setState({
                num:this.state.num + 1
            })
            this.state.fakePwds.push({value:'*',id:this.state.num}) // 替代密码
            this.setState({
                fakePwds:this.state.fakePwds
            })
            this.state.values.push(e) // 真实密码
        }
    }


    // 返回
    back(){
        var that = this 
        // 读取订单信息
        AsyncStorage.getItem('order',(error,result)=>{
            if (!error) {
                that.state.orders = JSON.parse(result)
                console.log('订单数据',that.state.orders);
                if(that.state.orders != null){ // 有订单
                    if(that.state.page == 'cle'){ // 清洁页面返回
                        that.props.navigation.navigate('Clean',{par:'end',num:'12345678900'}) 
                    }else{ // 欢唱页面返回
                        that.props.navigation.navigate('Dispark')
                    }
                }else{  // 无订单
                    // 调用事件通知Welcome
                    DeviceEventEmitter.emit('back','parameter');
                    that.props.navigation.navigate('Welcome')
                }
            }
            // 关闭计时器
            clearTimeout(that.state.timer)
        })
    }


    // 确定
    sure(){
        // console.log('最终密码',this.state.values)
        var parameter = {}
        parameter.value = ''
        parameter.type = '2'
        if(this.state.res == null){
            parameter.cid= '0'
            parameter.sid = '0'
            parameter.rid = '0'
        }else{
            parameter.cid= this.state.res.data.cid
            parameter.sid = this.state.res.data.sid
            parameter.rid = this.state.res.data.rid
        }

        parameter.pwd = this.state.values.join('')
        this.ws(parameter)
    } 

    
    // 清空密码
    empty(){
        this.state.fakePwds = []
        this.setState({
            fakePwds:this.state.fakePwds
        })
        this.state.values = []
    }


    // 生命周期
    componentDidMount = () => {
        var that = this 

        // 读取门店信息
        this.read()
        
      
        let {page} = this.props.navigation.state.params
        console.log('从哪个页面跳转过来的-跳转接收参数',page)

        // 记录从哪个页面跳转过来的
        that.setState({
            page:page
        }) 

        if(page == 'wel'){
            this.state.timer = setTimeout(function(){
                // 调用事件通知Welcome组件
                DeviceEventEmitter.emit('back','parameter');
                that.props.navigation.navigate('Welcome')
            },40000)
        }

        if(page == 'dis'){ 
            this.state.timer = setTimeout(function(){
                that.props.navigation.navigate('Dispark')
            },40000)
        }

        if(page == 'cle'){
            that.state.timer = setTimeout(function(){
                that.props.navigation.navigate('Clean',{par:'end',num:'12345678900'}) 
            },40000)
        }

        this.listener = DeviceEventEmitter.addListener('receive',function(param){
            console.log('从哪个页面跳转过来的-监听接收参数',param)

            // 记录从哪个页面跳转过来的
            that.setState({
                page:param
            })

            if(param == 'cle'){
                that.state.timer = setTimeout(function(){
                    that.props.navigation.navigate('Clean',{par:'end',num:'12345678900'}) 
                },40000)
            }
        });
    }
    

    // 组件卸载
    componentWillUnmount(){
        // 移出监听
        this.listener.remove();

        // 关闭计时器
        clearTimeout(this.state.timer)
    }


    // 读取数据
    read(){
        AsyncStorage.getItem('object',(error,result)=>{
            if (!error) {
                this.state.res = JSON.parse(result)
                console.log('门店信息',this.state.res);
                if(this.state.res == null){
                    // 不执行操作
                }else{
                    this.setState({
                        room: this.state.res.data.code,
                    })
                }
            }
        })
    }


    // ws
    ws(e){
        // 定义地址
        var ws = new WebSocket('ws://47.108.69.204:2345');

        // 打开连接并发送消息
        ws.onopen = () => { 
            console.log('密码输入连接成功,参数',e) 
            ws.send(JSON.stringify(e)); 
        };
 
        // 接收消息
        ws.onmessage = (e) => {  
            var _this = this
            const res = JSON.parse(e.data)
            console.log('输入密码后返回的信息',res);
            if(res.code == 200 && res.data != null){
                // 关闭连接
                ws.onclose()

                if(res.data.flag == 1 ){ // 输入开门密码 正确 
                    // 异步储存订单信息
                    AsyncStorage.setItem('order',JSON.stringify(res.data),(error)=>{
                        if (error) {
                            console.log('存储订单数据失败')
                        } else  {
                            console.log('存储订单数据成功')
                            // 清空密码
                            _this.empty() 

                            // 跳转
                            _this.props.navigation.navigate('Dispark')
                        }
                    }); 

                    // 关闭计时器
                    clearTimeout(_this.state.timer)
                
                    // 存储订单ID
                    this.setState({ 
                        order_id:res.data.order_id
                    })

                    // 订单到时自动跳转至待清洁页面  
                    var nowTime = (new Date()).getTime();
                    console.log('开门时间-时间戳',new Date(),nowTime)
                    var t = Number ( res.data.end_time + '000' )
                    console.log('订单结束的时间戳',t)
                    var time = Number ( t - nowTime )
                    console.log('中间经历的毫秒数',time)
                    
                    var timer = setTimeout(function(){
                        AsyncStorage.getItem('order',(error,result)=>{
                            if (!error) {
                                var judge = JSON.parse(result)
                                if(judge != null){ // 没有提前结束欢唱并保洁
                                    // 通知后台将房间状态切换至待清洁状态
                                    _this.stateWs()
                                    
                                    setTimeout(function(){
                                        if(_this.state.isPush == 1) { // 由于网路原因没有推送成功3分钟后再次推送
                                            _this.stateWs()
                                        }
                                    },180000)
                                }
                            }
                        })
                        // 关闭计时器
                        clearTimeout(timer)
                    },time)
                }

                if(res.data.flag == 2 ){ // 输入保洁密码123456 正确 
                    // 存储保洁工号
                    this.setState({
                        phone:res.data.phone
                    })

                    // 异步存储保洁数据
                    AsyncStorage.setItem('clean',JSON.stringify(res.data),(error)=>{
                        if (error) {
                            console.log('保洁数据存储失败')
                        } else  {
                            console.log('保洁数据存储成功')
                            // 清空密码
                            _this.empty()
                            
                            DeviceEventEmitter.emit('cle','param');
                            // 跳转
                            _this.props.navigation.navigate('Clean',{par:'pwd',num:res.data.phone})
                        }
                    });   
                    
                    // 关闭计时器
                    clearTimeout(_this.state.timer)
                }

                if(res.data.flag == 3 ){ // 输入服务密码13455555555 正确
                    // 清空密码
                    this.empty()

                    // 关闭计时器
                    clearTimeout(_this.state.timer)

                    // 跳转
                    this.props.navigation.navigate('Select',{staff_id:res.data.id,page:this.state.page}) 
                }

                if(res.data.flag == 4){ // 输入设置密码12345678 正确
                    // 清空密码
                    this.empty()

                    // 关闭计时器
                    clearTimeout(_this.state.timer)
                    // 跳转
                    this.props.navigation.navigate('Setindex') 
                }
            }
            else{
                alert(res.msg)
                this.empty()
            }
        };

        // 发生错误
        ws.onerror = (e) => {  
           console.log('输入密码页面连接发生错误')
        };

        // 关闭连接
        ws.onclose = (e) => {
            console.log('关闭输入密码页面链接');
        };
    }


    // 订单结束通知后台切换房间状态
    stateWs(){
        const state_ws = new WebSocket('ws://47.108.69.204:2345');

        var data1 = {
            value:'',
            type:3,
            order_id:this.state.order_id
        }

        state_ws.onopen = () => {
            console.log('通知后台-链接成功,参数',data1)
            state_ws.send(JSON.stringify(data1)); 
        };

        state_ws.onmessage = (e) => {
            const res = JSON.parse(e.data)
            console.log('通知后台切换状态',res)
            if(res.code == 200){
                this.setState({
                    isPush:2,
                })

                // 跳转至待清洁页面
                this.props.navigation.navigate('Clean',{par:'end',num:'12345678900'})
            }
            // 关闭链接
            state_ws.onclose()
        };

        state_ws.onerror = (e) => { console.log('链接错误',e)};
        state_ws.onclose = (e) => { console.log('关闭通知后台链接',e)};
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
        // backgroundColor:'#000',
        backgroundColor:'rgba(0,0,0,.5)',
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
        height:'8%',
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
        marginTop:6,
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
        marginTop:28,
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


