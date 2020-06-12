/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow
**/

// 引入路由组件
import {StackNavigator} from 'react-navigation'
// 加载动画组件
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator.js'



// 加载贩卖机首页
import Index from './pages/Index.js'
// 加载商城主页
import Store from './pages/Store/Index.js'
// 加载订单页面
import Order from './pages/Order/Order.js'
// 加载支付页面
import Pay from './pages/Pay/Pay.js'
// 加载支付失败页面
import PayFail from './pages/Pay/Pay_fail.js'
// 加载商城补货清单页面
import Supplement from './pages/Supplement.js'
// 加载输入密码页面
import Password from './pages/Set/Password.js'
// 加载绑定账号页面
import BindNum from './pages/Set/BindNum.js'
// 加载货测试页面
import GoodsPathTest from './pages/Set/GoodsPathTest.js'

// 定义路由
const RootStack = StackNavigator(
    {   
        // 贩卖机首页
        Index: {  
            screen: Index,
        },
        // 商城主页
        Store:{
            screen: Store
        },
        // 订单
        Order:{
            screen: Order
        },
        // 支付
        Pay:{
            screen: Pay
        },
        // 支付失败
        PayFail:{
            screen: PayFail
        },
        // 商城补货清单
        Supplement:{
            screen: Supplement
        },
        // 输入密码
        Password: {  
            screen: Password,
        },
        // 绑定账号
        BindNum: {  
            screen: BindNum,
        },
        // 货道测试
        GoodsPathTest: {  
            screen: GoodsPathTest,
        },

    },

    //定义配置
    {
        initialRouteName: 'GoodsPathTest', 
        headerMode: 'none', // 头部导航样式
        // forHorizontal forVertical forFadeFromBottomAndroid forFade 页面切换效果
        transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forHorizontal }),
    }
);



// adb shell input keyevent 82 
// react-native log-android 



// 导出
export default RootStack


