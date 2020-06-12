/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
**/

import React, {Component} from 'react';
import { StatusBar,ImageBackground, StyleSheet,View, Text, Dimensions} from 'react-native';
let { width, height } = Dimensions.get('window')


export default class Await extends Component {
    //构造器
    constructor(props) {
        super(props)
        this.state = {
           
        }; 
    }

    
    
    //渲染
    render() {
        return(
            <ImageBackground style={{flex:1}} 
                source={require('../../assets/imgs/await.jpg')}>
                <StatusBar hidden={true} />
                <View style={styles.box}>
                    <Text style={{color:'#D54753',fontSize:24}}>WELCOME</Text>
                    <Text style={{color:'#fff',fontSize:80}}>Enjoy with your XowTime</Text>
                </View>
            </ImageBackground>
        )
    }

    // 组件加载完成
    componentDidMount = () => {
        setTimeout(()=>{
            this.props.navigation.navigate('Welcome')
        },8000)
    }
};


const styles = StyleSheet.create({
    test:{
        
    },
    box:{
        position:'absolute',
        left:80,
        bottom:300,
        width:'70%',
    }
});


