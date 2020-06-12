import React, {Component} from 'react';
import {TouchableOpacity,ImageBackground,StatusBar,View,Text,TouchableHighlight, StyleSheet,AsyncStorage,DeviceEventEmitter,Alert} from 'react-native';


export default class NoClean extends Component {
    //构造器
    constructor(props) {
        super(props)
        //初始化视频播放
        this.state = {
            lockState:'开放',
            room:'A00',
            roomState:'等待清洁',
            cleanFinshIsShow:false,
            num:12345678900, // 默认的保洁工号
            txt:'触摸屏幕任何地方输入密码', 
            rooms:{}, // 房间信息
            cleans:{}, // 保洁信息
            orders:{}, // 订单信息
        };    
    }


    render() {
        return (
            <ImageBackground style={{flex:1}} 
                source={require('../../assets/imgs/await.jpg')}>
                <StatusBar hidden={true} />
                    <TouchableOpacity activeOpacity={1} style={styles.box} onPress={this.skip.bind(this)}>
                    
                        {/* 上 */}
                        <View style={styles.up}>
                            <View style={styles.upUp}>
                                <Text style={{color:'#ccc',fontSize:24}}>门锁状态</Text>
                                <Text style={[styles.analogyBtn,{fontSize:24}]}>{this.state.lockState}</Text>
                            </View>

                            <View style={styles.upContent}>
                                <Text style={[styles.vip,{color:'#CE9A37'}]}>VIP</Text>
                                <Text style={[styles.room,{color:'#CE9A37'}]}>{this.state.room}</Text>
                            </View>
                        </View>

                        {/* 下 */}
                        <View style={styles.below}>
                            <View style={[styles.below1,styles.flex]}>
                                <Text style={{color:"#D54753",fontSize:80}}>{this.state.roomState}</Text>
                            </View>

                            <View style={styles.below2}>
                                {
                                    this.state.cleanFinshIsShow?
                                        <View style={styles.cleaning}>
                                            <Text style={{color:'#5B5E6D', fontSize:24}}>保洁工号:{this.state.num}</Text>

                                            <TouchableHighlight underlayColor={'#D54753'} style={[styles.cleanFinsh,styles.flex]}
                                                onPress={this.finsh.bind(this)}>
                                                <Text style={{color:'#fff', fontSize:36}}>清洁完成</Text>
                                            </TouchableHighlight>
                                        </View>:
                                        <Text></Text>
                                }
                                
                            </View>

                            <View style={[styles.below3,styles.flex]}>
                                <Text style={{color:"#5B5E6D",fontSize:36}}>{this.state.txt}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
            </ImageBackground>
        )
    }


    // 触摸屏幕任何地方输入密码
    skip(){
        if(this.state.cleanFinshIsShow){ // 清洁中(不能进行页面跳转)
            // 不执行操作
        }else{ // 等待清洁
            // 调用事件通知Pwd重新接收参数
            DeviceEventEmitter.emit('receive','cle');
            this.props.navigation.navigate('Pwd',{page:'cle'})
        }
    }


    // 清洁完成
    finsh(){
        var parameter = {}
        parameter.value = ''
        parameter.type = '2',
        parameter.status = '0',
        parameter.cid = this.state.rooms.data.cid
        parameter.sid = this.state.rooms.data.sid
        parameter.rid = this.state.rooms.data.rid
        parameter.pwd = this.state.cleans.password
        parameter.clear_log_id = this.state.cleans.clear_log_id
        if(this.state.orders != null){
            parameter.order_id = this.state.orders.order_id
            this.ws(parameter)
        }else{
            Alert.alert(
                '', //提示标题
                `该房间未预定,是否确定返回欢迎页面？`, //提示内容
                [ //按钮集合 
                    { 
                        text: '取消', 
                        onPress: () => console.log('点击取消') 
                    },
                    {
                        text: '确定', 
                        onPress:  () =>  {
                            console.log('点击确定')
                            // 调用事件通知Welcome组件
                            DeviceEventEmitter.emit('back','parameter');
                            this.props.navigation.navigate('Welcome')
                        }
                    }
                ] 
            )
        }
    } 


    // 页面加载完成
    componentDidMount = () => {
        var that = this 
        // 读取数据
        this.read()

        // 接收参数
        let { par } = this.props.navigation.state.params
        let { num } = this.props.navigation.state.params
        console.log('路线1',par)

        // 判断
        if(par == 'pwd'){ // 保洁人员输入密码进入 (不可以再进入输入密码页面===页面不能点击)
            this.setState({
                roomState:'清洁中',
                cleanFinshIsShow:true,
                txt:'',
                num:num,
            })
        }else{ // 结束欢唱页面进入或者订单结束自动进入
            this.setState({
                roomState:'等待清洁',
                cleanFinshIsShow:false,
                txt:'触摸屏幕任何地方输入密码',
            })
        }


        // 监听
        this.listener = DeviceEventEmitter.addListener('cle',function(param){
            console.log('路线2',param)

            // 读取数据
            that.read()

            that.setState({
                roomState:'清洁中',
                cleanFinshIsShow:true,
                txt:'',
                num:num,
            })
        })
    }


    // 读取数据
    read(){
        var that = this 
        // 读取房间数据
        AsyncStorage.getItem('object',(error,result)=>{
            if (!error) {
                that.state.rooms = JSON.parse(result)
                console.log('房间数据', that.state.rooms.data);
                that.setState({
                    room: that.state.rooms.data.code,
                })
            }
        })

        // 读取清洁人员数据
        AsyncStorage.getItem('clean',(error,result)=>{
            if (!error) {
                that.state.cleans = JSON.parse(result)
                console.log('保洁信息',that.state.cleans);
            }
        })

        // 读取订单信息
        AsyncStorage.getItem('order',(error,result)=>{
            if (!error) {
                that.state.orders = JSON.parse(result)
                if(that.state.orders != null){
                    console.log('订单数据',that.state.orders);
                }
            }
        })
    }


    // 组件卸载
    componentWillUnmount(){
        // 移出监听
        this.listener.remove()
    }



    // ws
    ws(e){
        // 定义地址
        var ws = new WebSocket('ws://47.108.69.204:2345');

        // 打开连接并发送消息
        ws.onopen = () => { 
            console.log('清洁完成-连接成功-参数',e) 
            ws.send(JSON.stringify(e)); 
        };

        // 接收到了一个消息
        ws.onmessage = (e) => {  
            const res = JSON.parse(e.data)
            console.log('清洁完成返回的数据',res);
            if(res.code == 200){
                // 关闭连接
                ws.onclose()

                // 删除缓存的清洁信息和订单信息
                this.delete()

                // 调用事件通知Welcome组件
                DeviceEventEmitter.emit('back','parameter');
                this.props.navigation.navigate('Welcome')
            }else{
                alert(res.msg)             
            }
        };

        // 发生错误
        ws.onerror = (e) => {
            console.log('清洁完成页面链接发生错误');
        };

        // 关闭连接
        ws.onclose = (e) => {
            console.log('关闭清洁页面连接');
        };
    }


    // 删除缓存的信息
    delete(){
        AsyncStorage.removeItem('clean',(error)=>{
            if (error) {
                console.log('清洁信息删除失败');
            } else  {
                console.log('清洁信息删除成功');
            }
        });
        AsyncStorage.removeItem('order',(error)=>{
            if (error) {
                console.log('订单信息删除失败');
            } else  {
                console.log('订单信息删除成功');
            }
        });
    }
}



const styles = StyleSheet.create({
    flex:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        flex:1,
        backgroundColor:'rgba(0,0,0,.5)',
    },
    up: {
        height:'30%',
        borderWidth:1,
        borderBottomColor:'#2D2F36',
    },
    upUp: {
        height:'15%',
        display:'flex',
        flexDirection: 'row',
        justifyContent:'flex-end',
        paddingRight:80,
        alignItems: 'center',
    },
    analogyBtn: {
        backgroundColor:'linear-gradient(209deg,rgba(245,89,56,1) 0%,rgba(231,58,104,1) 100%)',
        color:'#fff',
        marginLeft:10,
        borderRadius: 8,
        paddingTop:3,
        paddingBottom:5,
        paddingLeft:15,
        paddingRight:15,
    },
    upContent:{
        height:'85%',
        display:'flex',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
    },
    vip: {
        fontSize:48,
        fontWeight:'bold',
        marginBottom:180,
    },
    room: {
        fontSize:220,
    },


    below: {
        height:'70%',
    },
    
    below1: {
        height:'20%',
    },
    below2: {
        height:'60%',
    },
    cleaning:{
        height:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',
    },
    cleanFinsh:{
        height:'10%',
        width:'50%',
        borderWidth:1,
        borderColor:'#D54753',
        borderRadius:4,
    },
    below3: {
        height:'20%',
    },
})

