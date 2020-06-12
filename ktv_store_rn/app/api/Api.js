import React,{Component} from 'react';

//这里引入了一个md5加密的库，Github https://github.com/kmend/react-native-md5
//引入方式很简单，npm install react-native-md5 --save
//然后打开项目的package.json 查看，发现此时多了一个依赖 
// import MD5 from "react-native-md5";


import {
    ToastAndroid,
} from 'react-native';


/**
 * 网络请求的工具类
*/
export default class NetUtils extends Component{
    //构造函数，默认的props，以及state 都可以在这里初始化了
    constructor(props){
        super(props); 
    }

    /**
     * 普通的get请求 
     * @param {*} url 地址
     * @param {*} params  参数
     * @param {*} callback  成功后的回调
    */
    static get(url,params,callback){
        fetch(url,{
            method:'GET',
            body:params
        })
        .then((response) => {
            if(response.ok){ // 如果响应码为200
                return response.json(); //将字符串转换为json对象
            }
        })
        .then((json) => {
            //根据接口规范在此判断是否成功，成功后则回调
            if(json.errmsg == '成功' ){
                callback(json);
            }else{
                //否则不正确，则进行消息提示
                //ToastAndroid 只针对安卓平台，并不跨平台
                ToastAndroid.show(json.resultDesc,ToastAndroid.SHORT);
            }
        })
        .catch(error => {
            // 抛出错误
            // ToastAndroid.show("netword error",ToastAndroid.SHORT);
            ToastAndroid.show("netword error",error);
        });
    };



    /**
     * post key-value 形式 hader为'Content-Type': 'application/x-www-form-urlencoded'
     * @param {*} url 
     * @param {*} service 
     * @param {*} params 
     * @param {*} callback 
    */
    static post(url,params,callback){
        // 添加公共参数
        // var newParams = this.getNewParams(service,params);//接口自身的规范，可以忽略

        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'//key-value形式
            },
            // body:newParams
            body:params
        })
        .then((response) => {
            if(response.ok){
               return response.json();
            }
        })
        .then((json) => {
            if(json.resultCode === "SUCCESS"){
                callback(json);
            }else{
                ToastAndroid.show(json.resultDesc,ToastAndroid.SHORT);
            }
        }).catch(error => {
            // alert(error);
            ToastAndroid.show("netword error",ToastAndroid.SHORT);
        });
    };



    /**
     * post json形式  header为'Content-Type': 'application/json'
     * @param {*} url 
     * @param {*} service 
     * @param {*} jsonObj 
     * @param {*} callback 
    */
    static postJson(url,jsonObj,callback){
        fetch(url,{
            method:'POST',
            headers:{
            'Content-Type': 'application/json;charset=UTF-8'
            },
            body:JSON.stringify(jsonObj),//json对象转换为string
        })
        .then((response) => {
            if(response.ok){
                return response.json();
            }
        })
        .then((json) => {
            if(json.resultCode === "SUCCESS"){
                callback(json);
            }else{
                ToastAndroid.show(json.resultDesc,ToastAndroid.SHORT);
            }
        }).catch(error => {
            ToastAndroid.show("netword error",ToastAndroid.SHORT);
        });
    };

}