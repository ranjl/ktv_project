import React, {Component} from 'react';
import {View,Text,TouchableHighlight,TextInput, StyleSheet,DeviceEventEmitter,ImageBackground,StatusBar,AsyncStorage} from 'react-native';


export default class Setindex extends Component {
    //构造器
    constructor(props) {
        super(props)
        //初始化视频播放
        this.state = {
            cid:'000', // 默认的数据
            sid:'000',
            rid:'000',
            value:'', // 输入的数据
            type:'1', // 表示设置
        };    
    }


    render() {
        return (
            <ImageBackground style={{flex:1}} 
                source={require('../../assets/imgs/await.jpg')}>
                <StatusBar hidden={true} />
                    <View style={styles.box}>
                        {/* 上 */}
                        <View style={[styles.up,styles.flex]}>

                            <View style={styles.alone}>
                                <Text style={styles.colorFs}>城市ID</Text>
                                <TextInput style={styles.input} value = {this.state.cid}
                                    onChangeText={(cid) => this.setState({cid})}>
                                </TextInput>
                            </View>

                            <View style={styles.alone}>
                                <Text style={styles.colorFs}>门店ID</Text>
                                <TextInput style={styles.input} value = {this.state.sid}
                                    onChangeText={(sid) => this.setState({sid})}>
                                </TextInput>
                            </View>


                            <View style={styles.alone}>
                                <Text style={styles.colorFs}>包厢ID</Text>
                                <TextInput style={styles.input} value={this.state.rid} 
                                    onChangeText={(rid) => this.setState({rid})}>
                                </TextInput>
                            </View>
                        </View>

                        {/* 修改 */}
                        <View style={[styles.btnBox,styles.flex]}>
                            <TouchableHighlight underlayColor={'#D54753'} style={[styles.btn,styles.flex]} 
                                onPress={this.affirm.bind(this)}>
                                <Text style={{color:'#fff', fontSize:36}}> 确认 </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
            </ImageBackground>
        )
    }


    // 确认
    affirm(){
        this.ws(this.state)
    }


    // 页面加载完成
    componentDidMount = () => {
        // 读取数据
        this.read()
    }


    // 读取
    read(){
        AsyncStorage.getItem('object',(error,result)=>{
            if (!error) {
                const res = JSON.parse(result)
                console.log('读取门店信息',res);
                if(res == null){
                    this.setState({
                        rid:'000',
                        sid:'000',
                        cid:'000',
                    })
                }else{
                    this.setState({
                        rid:String(res.data.rid),
                        sid:String(res.data.sid),
                        cid:String(res.data.cid),
                    })
                }
            }
        })
    }


    // WebSocket连接
    ws(e){
        console.log('参数',e)

        // 定义地址
        var ws = new WebSocket('ws://47.108.69.204:2345');

        
        // 打开连接并发送消息
        ws.onopen = () => { 
            console.log('连接成功') 
            ws.send(JSON.stringify(e)); 
        };


        // 接收到了一个消息
        ws.onmessage = (e) => {  
            var res = JSON.parse(e.data)
            console.log('输入门店信息返回的结果',res);

            if(res.code == 200){ 
                // 再将新的门店数据储存到本地
                AsyncStorage.setItem('object',JSON.stringify(res),(error)=>{
                    if (error) {
                        console.log('新的门店数据存储失败')
                    } else  {
                        console.log('新的门店数据存储成功')

                        // 调用事件通知
                        DeviceEventEmitter.emit('refresh')
                        // 再进行页面跳转
                        this.props.navigation.navigate('Setindex')
                    }
                }); 
                  
            }else{
                // alert(res.msg)
                alert('没有该房间数据,请重新设置')
            }
        };

        // 发生了错误
        ws.onerror = (e) => {  
            console.log('连接错误',e);
        };

        // 关闭连接
        ws.onclose = (e) => {
            console.log('关闭连接');
        };
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
        // backgroundColor:'#000',
        backgroundColor:'rgba(0,0,0,.5)',
    },

    up:{
        height:'30%',
    },
    alone:{
        width:"80%",
        height:'20%',
        borderWidth:1,
        borderBottomColor:'#2D2F36',
        marginTop:30,
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    colorFs:{
        color:"#D54753",
        fontSize:36,
        fontWeight:'800',
    },
    input:{
        width:'60%',
        borderWidth:1,
        borderColor:'#D54753',
        color:"#D54753",
        fontSize:32,
        fontWeight:'800',
        borderRadius:8,
        paddingLeft:16,
    },

    btnBox:{
        height:'10%',
    },
    btn:{
        width:'40%',
        height:'60%',
        borderWidth:1,
        borderColor:'#D54753',
        borderRadius:4,
    }
    
})

