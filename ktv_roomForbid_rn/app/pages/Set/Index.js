import React, {Component} from 'react';
import {ImageBackground,StatusBar,View,Text,TouchableHighlight, StyleSheet,DeviceEventEmitter,AsyncStorage} from 'react-native';


export default class Setindex extends Component {
    //构造器
    constructor(props) {
        super(props)
        //初始化数据
        this.state = {
            cid:'000',
            sid:'000',
            rid:'000',
            fish:false,
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
                                <Text style={styles.colorFs}>{this.state.cid}</Text>
                            </View>

                            
                            <View style={styles.alone}>
                                <Text style={styles.colorFs}>门店ID</Text>
                                <Text style={styles.colorFs}>{this.state.sid}</Text>
                            </View>

                            <View style={styles.alone}>
                                <Text style={styles.colorFs}>包厢ID</Text>
                                <Text style={styles.colorFs}>{this.state.rid}</Text>
                            </View>

                        </View>

                        {/* 修改 */}
                        <View style={[styles.btnBox,styles.flex]}>
                            <TouchableHighlight underlayColor={'#D54753'} style={[styles.btn,styles.flex]} 
                                onPress={this.amend.bind(this)}>
                                <Text style={{color:'#fff', fontSize:36}}> 修改 </Text>
                            </TouchableHighlight>
                        </View>


                        {/* 完成 */}
                        <View style={[styles.btnBox,styles.flex]}>
                            <TouchableHighlight underlayColor={'#D54753'} style={[styles.btn,styles.flex]} 
                                onPress={this.accomplish.bind(this)}>
                                <Text style={{color:'#fff', fontSize:36}}> 完成 </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
            </ImageBackground>
        )
    }

    // 修改
    amend(){
        this.props.navigation.navigate('Amend')
    }

    // 完成
    accomplish(){
        //调用事件通知
        DeviceEventEmitter.emit('test','param');
        this.props.navigation.navigate('Welcome')
    }


    // 页面加载完成
    componentDidMount = (options) => {
        // 读取数据
        this.read()

        // 注册监听事件
        this.listener = DeviceEventEmitter.addListener('refresh', (value)=>{
            this.read()
        });
    }


    // 控件卸载
    componentWillUnmount(){
        // 移出监听事件
        this.listener.remove();
    }

      
    // 读取门店信息
    read(){
        AsyncStorage.getItem('object',(error,result)=>{
            if (!error) {
                const res = JSON.parse(result)
                console.log('读取门店信息',res);
                if(res == null){
                    // 不执行操作
                }else{
                    this.setState({
                        rid:res.data.rid,
                        sid:res.data.sid,
                        cid:res.data.cid,
                        fish:true,
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

