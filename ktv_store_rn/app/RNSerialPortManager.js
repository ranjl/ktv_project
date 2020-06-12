/*
 * @Author: gongyonghui
 * @Date: 2019-05-21 09:40:21
 * @LastEditors: gongyonghui
 * @LastEditTime: 2019-09-09 13:38:30
 * @Description: file content
 */
import React, { Component } from 'react'
// 串口库
import RNSerialPort from 'react-native-serial-port';
import { DeviceEventEmitter, ToastAndroid } from 'react-native';
let instance = null

export default class RNSerialPortManager {
    constructor() {
        if (!instance) {
            instance = this;
            DeviceEventEmitter.addListener('onSerialPortRecevieData', this.onSerialPortRecevieData, this)
            //监听接收串口开关的状态
            DeviceEventEmitter.addListener('onSerialPortOpenStatus', this.onSerialPortOpenStatus, this)
            console.log("监听串口");
        }
        return instance;
    }

    /***
    * 类方法
    */
    static ShareInstance() {
        let singleton = new RNSerialPortManager();
        return singleton;
    }

    // 监听串口的状态
    onSerialPortOpenStatus(status) {
        console.log('串口状态',status);
    }

    // 监听串口回传数据
    onSerialPortRecevieData(receiveData) {
        console.log('串口回传数据',receiveData);
        return receiveData
    }

    // 获取设备列表
    getDeviceLsit() {
        return new Promise((resolve, reject) => {
            RNSerialPort.getAllDevicesPath((result) => {
                resolve(result) 
                // ToastAndroid.show("CallBack收到消息:" + result, ToastAndroid.SHORT);
            });
        })

    }

    // 打开虚拟串口
    openSerialPort(portStr, Baudrates) {
        RNSerialPort.openSerialPort(portStr, Baudrates);
    }

    // 发送数据
    writeByteData(data) {
        console.log('发送的数据',data)
        RNSerialPort.sendByteData(data);
    }
}

export const SerialPortManager = RNSerialPortManager.ShareInstance();