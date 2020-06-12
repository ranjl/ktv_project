import React, {Component} from 'react';
import {TouchableOpacity,View,Text,Image, StyleSheet,AsyncStorage,ImageBackground,StatusBar,DeviceEventEmitter} from 'react-native';



export default class Dispark extends Component {
    //构造器
    constructor(props) {
        super(props)
        //初始化视频播放
        this.state = {
            lockState:'开放',
            room:'A00',
            start:'19:00',
            end:'01:00',
            status:'使用中',
            color:'#CE9A37',
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
                            <Text style={[styles.vip,{color:this.state.color}]}>VIP</Text>
                            <Text style={[styles.room,{color:this.state.color}]}>{this.state.room}</Text>
                        </View>
                    </View>

                    {/* 下 */}
                    <View style={styles.below}>
                        <View style={styles.time}>
                            <Image style={styles.img} source={require('../../assets/imgs/time1.jpg')}></Image>
                            <Text style={{color:'#fff', fontSize:60}}>{this.state.start} - {this.state.end}</Text>
                            <Text style={{color:'#5B5E6D',fontSize:24}}>派对时间/PARTY tIME</Text>
                        </View>
                        <View style={[styles.txt,styles.flex]}>
                            <Text style={{color:'#D54753',fontSize:80,fontWeight:'700'}}>{this.state.status}</Text>
                        </View>
                        <View style={[styles.skip,styles.flex]}>
                            <Text style={{color:'#5B5E6D',fontSize:36}}>触摸屏幕任何地方输入密码</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        )
    }


    // 触摸屏幕任何地方输入密码
    skip(){
        this.props.navigation.navigate('Pwd',{page:'dis'})
    }


    // 页面加载完成
    componentDidMount = () => {
        // 读取订单数据
        this.read()
    }


    // 读取数据
    read(){
        // 读取订单id
        AsyncStorage.getItem('order',(error,result)=>{
            if (!error) {
                var res = JSON.parse(result)
                console.log('订单数据',res);
                if(res == null ){
                    // 不执行操作
                }else{
                    this.setState({
                        room:res.code,
                        start:res.start,
                        end:res.end,
                    })
                }
            }
        })
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
    time: {
        height:'40%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    img: {
        width:120, 
        height:120, 
        marginBottom:20
    },  
    txt: {
        height:'40%',
    },
    skip: {
        height:'20%',
    },
})

